import {Component, OnInit, ViewChild} from '@angular/core';

import {Router} from '@angular/router';
import {BoardService} from '../../services/board.service.client';
import {Observable, Subscription} from 'rxjs/Rx';
import {NgForm} from '@angular/forms';
import {isUndefined} from 'util';
import {ProcessService} from '../../services/process.service.client';
import {CacheSetService} from '../../services/cacheset.service.client';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChild('f') boardInputForm: NgForm;
  private subscription: Subscription = new Subscription();
  boardId: any;
  gameNumbers: number[];
  exampleBoard: any;
  interval: any;
  time: number;
  tbl: any;
  body: any;
  startedRefresh: boolean;
  bNum: number;
  pid: string;
  processCache: [{}];
  errorFlag: boolean;
  errorMessage: string;
  initializedOnce: boolean;
  policy: string;
  setOfCacheLines: [{}];
  //tilesInCache: any[];
  history: any[];
  fullhistory: [{}];

  constructor(private router: Router, private boardService: BoardService, private processService: ProcessService, private cacheService: CacheSetService) {
  }

  /* Refresh the gameBoard every 1 second*/
  ngOnInit() {
    this.startedRefresh = false;
    this.body = document.getElementsByTagName('body')[1];
    this.time = 0;
    this.initializedOnce = false;
    this.getPid('' + Math.random() * 300);
  }

  /* Get user input for board number and use that to initialize and render the table */
  boardInput(num: number) {
    this.bNum = num;
    this.boardId = num;
    this.initializeBoard(this.bNum);
    this.initializedOnce = true;
  }

  getPid(num: string) {
    this.pid = num;
    this.processService.findProcessById(this.pid)
      .subscribe((process: any) => {
        this.processCache = process.processCache;
      });
  }

  /* Being the refresh for the page */
  startRefresh() {
    this.startedRefresh = true;
    if (this.boardId != null) {
      this.interval = setInterval(() => {
        this.refresh();
      }, 1000);
    }
  }

  /* Refresh the page, calling the findBoard function so that all players have updated gameBoards */
  refresh() {
    this.time = this.time + 5;
    this.boardService.findBoard(this.boardId)
      .subscribe((board: any) => {
        this.gameNumbers = board.numbers;
        this.tbl.remove();
        // this.body.removeChild(this.tbl);
        this.renderTable();
      });
    this.refreshCache();
    this.refreshHistory();
  }

  /**
   * Initializes a Game Board. Currently this is needed to be done before we can hit render for the first time.
   * @param boardId
   */
  initializeBoard(boardId) {
    if (this.initializedOnce) {
      this.tbl.remove();
    }
    this.boardId = boardId;
    // Make a board.
    const nums = [];
    let i = 0;
    let cacheLine = 0;
    let cacheCounter = 0;
    for (i = 0; i < 100; i++) {
      if (cacheCounter > 3) {
        cacheLine += 1;
        cacheCounter = 0;
      }
      nums.push({position: 99 - i, value: i, cacheLine: cacheLine, hidden: true, locked: false});
      cacheCounter += 1;
    }
    this.exampleBoard = {
      id: boardId,
      numbers: nums
    };


    // Initialize the board in the database/server.
    this.boardService.initializeBoard(boardId, this.exampleBoard).subscribe((game: any) => {
      this.gameNumbers = game.numbers; // This should get removed once we put in boardId (probably)
      this.renderTable();
    });

    // Initialize the cache in the database/server.
    // Update the cache lines for visualizion.
    this.cacheService.initializeCache(boardId).subscribe((cache: any) => {

      this.setOfCacheLines = cache.setOfCacheLines;
      this.policy = cache.policy;
      this.fullhistory = cache.cacheHistory;
      this.history = cache.cacheHistory;
    });


  }

  /**
   * Find the number who's position equals the given parameter.
   * @param position
   * @returns the Value and Hidden Flag, may later expand to have it also include the cacheLine
   */
  findThisNumber(position) {
    for (var i = 0; i < this.gameNumbers.length; i++) {
      if (this.gameNumbers[i]['position'] === position) {
        return {value: this.gameNumbers[i]['value'], hidden: this.gameNumbers[i]['hidden']};
      }
    }
  }

  /**
   * Creates (HTML-wise) and Renders the table to the screen.
   *
   * Note: In the future, I'm thinking we should give this a boardId as a parameter, so it can
   * fetch the board from the db to render.
   */

  renderTable() {
    this.tbl = document.createElement('table');
    this.tbl.style.width = '400px';
    this.tbl.style.height = '400px';
    this.tbl.setAttribute('border', '1');
    this.tbl.setAttribute('align', 'center');

    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 10; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 10; j++) {
        if (i === 10 && j === 10) {
          break;
        } else {
          var td = document.createElement('td');
          var pos = null;
          if (i === 0) {
            pos = j;
          } else {
            pos = i * 10 + j;
          }

          // Currently a dict with {value: x, hidden: bool}
          var data = this.findThisNumber(pos);
          td.appendChild(document.createTextNode(data['value']));
          // Change the background color based on hidden bool
          if (data['hidden']) {
            td.style.backgroundColor = '#000000';
          } else {
            td.style.backgroundColor = 'white';
          }
          td.style.textAlign = 'center';
          td.style.webkitTextFillColor = '#000000';
          td.addEventListener('click', (e) => {
            this.accessMemory(e);
            // var process = {};
            // for (let i = 0; i < this.processCache.length; ++i) {
            //   if(this.processCache[i]['value'] === e.target.valueOf()) {
            //     process = {value: this.processCache[i]['value'], found: 1};
            //     this.processCache.splice(i, 1, process);
            //     //this.processCache[i] = process;
            //   }
            // }
          });
          tr.appendChild(td);
        }
      }
      tbdy.appendChild(tr);
    }
    this.tbl.appendChild(tbdy);
    this.body.appendChild(this.tbl);
    if (this.startedRefresh == false) {
      this.startRefresh();
    }
  }


  /**
   * Refreshes the cache set visuals.
   */
  refreshCache() {
    this.cacheService.findCache(this.boardId)
      .subscribe((cache: any) => {
        this.fullhistory = cache.cacheHistory;
        this.fullhistory.splice(0, Math.max(this.fullhistory.length - 10, 0));
        this.history = this.fullhistory.reverse();
        this.setOfCacheLines = cache.setOfCacheLines;
        this.policy = cache.policy;
      });
  }

  /**
   * Updates the policy for the cacheset.
   * @param policy the policy used. e.g. LRU or RAN
   */
  updatePolicy(policy) {
    this.policy = policy;
    if (this.initializedOnce) {
      this.cacheService.updatePolicy(this.boardId, policy).subscribe((response: any) => {
        // Intentionally left blank.
      });
    }
  }

  /**
   * Accessing a piece of memory. Executed when a tile is clicked.
   * @param e
   */
  accessMemory(e) {
    var value = {value: e.target.textContent};
    var process = {};
    this.errorFlag = false;
    for (let i = 0; i < 10; i++) {
      if (this.processCache[i]['value'] == e.target.textContent) {
        if (i != 0) {
          if (this.processCache[i - 1]['found'] != 1) {
            this.errorFlag = true;
            this.errorMessage = 'You must finish your cache line in order!';
          }
        }
        if (!this.errorFlag) {
          process = {value: this.processCache[i]['value'], found: 1};
          this.processService.updateProcess(this.pid, process)
            .subscribe((status: any) => {
              this.processService.findProcessById(this.pid)
                .subscribe((process1: any) => {
                  this.processCache = process1.processCache;
                });
            });
          //this.processCache.splice(i, 1, process);
          //this.processCache[i] = process;
        }
      }
    }

    this.boardService.accessMemory(this.boardId, value).subscribe((board: any) => {
      this.refreshHistory();
    });

  }

  refreshHistory() {
    this.cacheService.findCache(this.boardId).subscribe((cache: any) => {
      this.setOfCacheLines = cache.setOfCacheLines;
      this.fullhistory = cache.cacheHistory;
      this.fullhistory.splice(0, Math.max(this.fullhistory.length - 10, 0));
      this.history = this.fullhistory.reverse();
    });
  }

  // resetProcess() {
  //   var processToUpdate = {};
  //   var count1 = 0;
  //   var count2 = 0;
  //   for (let i = 0; i < this.processCache.length; i++) {
  //     if (this.processCache[i]['found'] == 1) {
  //       count1++;
  //       processToUpdate = {value: this.processCache[i]['value'], found: 0};
  //       this.processService.updateProcess(this.pid, processToUpdate)
  //         .subscribe((status: any) => {
  //           count2++;
  //           // if(status) {
  //           //   count++;
  //           // }
  //           if(count1 == count2) {
  //             this.processService.findProcessById(this.pid)
  //               .subscribe((process: any) => {
  //                 this.processCache = process.processCache;
  //               });
  //           }
  //         });
  //     }
  //   }
  //   //waits(5000);
  //
  //   // if(count >= 10) {
  //   //   this.processService.findProcessById(this.pid)
  //   //     .subscribe((process: any) => {
  //   //       this.processCache = process.processCache;
  //   //       //componentRefresh();
  //   //       //this.startRefresh();
  //   //     });
  //   // }
  // }


}
