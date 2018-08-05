import {Component, OnInit, ViewChild} from '@angular/core';

import {Router} from '@angular/router';
import {BoardService} from '../../services/board.service.client';
import {Observable, Subscription} from "rxjs/Rx";
import {NgForm} from "@angular/forms";
import {isUndefined} from "util";
import {ProcessService} from "../../services/process.service.client";
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
  data: any;
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

  constructor(private router: Router, private boardService: BoardService, private processService: ProcessService, private cacheService: CacheSetService) {}

  /* Refresh the gameBoard every 1 second*/
  ngOnInit() {
    this.startedRefresh = false;
    this.body = document.getElementsByTagName('body')[1];
    this.time = 0;
    this.initializedOnce = false;
  }

  /* Get user input for board number and use that to initialize and render the table */
  boardInput(num: number) {
    this.bNum = num;
    this.boardId = num;
    console.log("NUM: ", num);
    console.log("bNUm: ", this.bNum);
    this.initializeBoard(this.bNum);
    this.initializedOnce = true;
  }

  getPid(num: string) {
    this.pid = num;
    console.log("PID ", this.pid);
    this.processService.findProcessById(this.pid)
      .subscribe((process: any) => {
        this.processCache = process.processCache;
        // console.log("INSIDE THE SUBSCRIBE ", process);
        // console.log("PROCESS CACHE: ", this.processCache);
      });
  }

  /* Being the refresh for the page */
  startRefresh() {
    this.startedRefresh = true;
    if(this.boardId != null) {
      console.log("INSIDE: ", this.boardId);
      this.interval = setInterval(() => {
        this.refresh();
      }, 1000);
    }
  }

  /* Refresh the page, calling the findBoard function so that all players have updated gameBoards */
  refresh() {
    //console.log("REFRESHING: ", this.time);
    this.time = this.time + 5;
    this.boardService.findBoard(this.boardId)
      .subscribe((board : any) => {
        // console.log("ARE WE GETTING A BOARD?!");
        this.gameNumbers = board.numbers;
        this.tbl.remove();
        // this.body.removeChild(this.tbl);
        this.renderTable();
      });
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
    console.log('initializing');
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
      nums.push({position: 99-i, value: i, cacheLine: cacheLine, hidden: true, locked: false});
      cacheCounter += 1;
    }
    this.exampleBoard = {id: boardId,
      numbers: nums
    };


    // Initialize the board in the database/server.
    this.boardService.initializeBoard(boardId, this.exampleBoard).subscribe((game: any) => {
      //console.log(game);
      this.gameNumbers = game.numbers; // This should get removed once we put in boardId (probably)
      console.log(this.gameNumbers);
      this.renderTable();
    });

    //Initialize the cache in the database/server.
    console.log("running initialize cache call from component");
    this.cacheService.initializeCache(boardId).subscribe((cache: any) => {
      console.log("cache should be initalized. in the board component");
      console.log(cache);
    });


  }

  /**
   * Find the number who's position equals the given parameter.
   * @param position
   * @returns the Value and Hidden Flag, may later expand to have it also include the cacheLine
   */
  findThisNumber(position) {
    //console.log("entering find This number");
    for (var i = 0; i < this.gameNumbers.length; i++) {
      if (this.gameNumbers[i]['position'] === position) {
        return {value: this.gameNumbers[i]['value'], hidden: this.gameNumbers[i]['hidden']};
      }
    }
  }

  findBoard(boardId) {
    this.boardId = boardId;
    console.log("looking for a board");
    this.boardService.findBoard(boardId).subscribe((board: any) => {
      this.gameNumbers = board.numbers;
    });
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
    this.tbl.style.height= '400px';
    this.tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 10; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 10; j++) {
        // console.log('J is now: ' + j);
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
          // console.log('the pos ' + pos);
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
          // td.style.height = '40x';
          // td.style.width = '40px';
          td.style.webkitTextFillColor = '#000000';
          td.addEventListener("click", this.tileClick);
          td.addEventListener("click", (e) => {
            //console.log("WHAT IS e", e.target.toString());
            this.accessMemory(e);
            // var process = {};
            // for (let i = 0; i < this.processCache.length; ++i) {
            //   console.log("INSIDE FOR LOOP");
            //   if(this.processCache[i]['value'] === e.target.valueOf()) {
            //     process = {value: this.processCache[i]['value'], found: 1};
            //     this.processCache.splice(i, 1, process);
            //     //this.processCache[i] = process;
            //   }
            // }
            // console.log(this.processCache);
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
   * Represents what happens when we click a tile. Currently used to highlight the tile by changing the background color.
   * @param e represents the mouse event.
   */
  tileClick(e) {
    // e.target.style.backgroundColor = 'white'; This shouldn't be necessary once we implement rendering every 'x' seconds.
    console.log("You clicked on " + e.target.textContent);
    var currentNum = e.target.textContent;
     //var currentCacheLine = this.findThisNumbersCacheLine(currentNum);
     var currentCacheLine = null;
  }


  updatePolicy() {
    if (this.initializedOnce) {
      this.cacheService.updatePolicy(this.boardId, this.policy).subscribe((cache: any) => {
        // Intentionally left blank.
      })
    }
  }

  accessMemory(e) {
    var value = {value: e.target.textContent};
    console.log("umm.." + value.value);
    var process = {};
    this.errorFlag = false;
    for (let i = 0; i < 10; i++) {
      //console.log("INSIDE FOR LOOP", this.processCache[i]['value'] == e.target.textContent);
      if(this.processCache[i]['value'] == e.target.textContent) {
        if (i != 0) {
          if (this.processCache[i - 1]['found'] != 1) {
            this.errorFlag = true;
            this.errorMessage = "You must finish your cache line in order!";
          }
        }
        if (!this.errorFlag) {
          process = {value: this.processCache[i]['value'], found: 1};
          //console.log(process);
          this.processService.updateProcess(this.pid, process)
            .subscribe((status: any) => {
              //console.log(status);
              this.processService.findProcessById(this.pid)
                .subscribe((process1: any) => {
                  //console.log("RETURNED PROCESS ", process1);
                  this.processCache = process1.processCache;
                  //console.log(this.processCache);
                });
            });
          //this.processCache.splice(i, 1, process);
          //this.processCache[i] = process;
        }
      }
    }
    //console.log(this.processCache);
    this.boardService.accessMemory(this.boardId, value).subscribe((board: any) => {
      this.gameNumbers = board.numbers; // This should get removed once we put in boardId (probably)
      //console.log(this.gameNumbers)
    })

  }

  // resetProcess() {
  //   var processToUpdate = {};
  //   var count1 = 0;
  //   var count2 = 0;
  //   console.log('PROCESS LIST LEN', this.processCache.length);
  //   for (let i = 0; i < this.processCache.length; i++) {
  //     if (this.processCache[i]['found'] == 1) {
  //       count1++;
  //       processToUpdate = {value: this.processCache[i]['value'], found: 0};
  //       console.log(processToUpdate);
  //       this.processService.updateProcess(this.pid, processToUpdate)
  //         .subscribe((status: any) => {
  //           count2++;
  //           console.log("HOW MANY TIMES", i);
  //           console.log("STATUS", status);
  //           // if(status) {
  //           //   count++;
  //           //   console.log("IN STATUS", count);
  //           // }
  //           console.log(count1);
  //           console.log(count2);
  //           if(count1 == count2) {
  //             console.log(count1);
  //             console.log(count2);
  //             console.log("FINAL I", i);
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
  //   //       console.log(this.processCache);
  //   //     });
  //   // }
  //   //console.log(this.processCache);
  // }






}
