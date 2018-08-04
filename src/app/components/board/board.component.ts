import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {BoardService} from '../../services/board.service.client';
import {Observable, Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
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

  constructor(private router: Router, private boardService: BoardService) {}

  /* Refresh the gameBoard every 1 second*/
  ngOnInit() {
    this.startedRefresh = false;
    this.body = document.getElementsByTagName('body')[0];
    this.time = 0;
    // this.refresh();
    // console.log(this.boardId);

    // this.gs.getGameBoard(30).subscribe((numbers: any) => {
    //   this.gameNumbers = numbers;
    // });
  }

  startRefresh() {
    this.startedRefresh = true;
    if(this.boardId != null) {
      console.log("INSIDE: ", this.boardId);
      this.refresh();
      this.interval = setInterval(() => {
        this.refresh();
      }, 5000);
    }
  }

  /* Refresh the page, calling the findBoard function so that all players have updated gameBoards */
  refresh() {
    console.log("REFRESHING: ", this.time);
    this.time = this.time + 5;
    this.boardService.findBoard(this.boardId)
      .subscribe((board : any) => {
        // console.log("ARE WE GETTING A BOARD?!");
        this.gameNumbers = board.numbers;
        this.tbl.remove();
        // this.body.removeChild(this.tbl);
        this.renderTable();
      });
    //this.subscribeToData();
    // this.subscription.add(this.boardService.findBoard(this.boardId)
    //   .subscribe(data => {
    //       this.data = data;
    //       this.subscribeToData();
    //   }));
  }

  // subscribeToData() {
  //   this.subscription.add(
  //       Observable.timer(1000)
  //         .subscribe(() => this.refresh())
  //   );
  // }
  /**
   * Initializes a Game Board. Currently this is needed to be done before we can hit render for the first time.
   * @param boardId
   */
  initializeBoard(boardId) {
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
    // Send the board to the client api
    this.boardService.initializeBoard(boardId, this.exampleBoard).subscribe((game: any) => {
      console.log(game);
      this.gameNumbers = game.numbers; // This should get removed once we put in boardId (probably)
      console.log(this.gameNumbers);
    });
  }

  /**
   * Find the number who's position equals the given parameter.
   * @param position
   * @returns the Value and Hidden Flag, may later expand to have it also include the cacheLine
   */
  findThisNumber(position) {
    console.log("entering find This number");
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
    if (this.startedRefresh == false) {
      this.startRefresh();
    }
    this.tbl = document.createElement('table');
    this.tbl.style.width = '50%';
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
          td.style.webkitTextFillColor = '#000000';
          td.addEventListener("click", this.tileClick);
          td.addEventListener("click", (e) => {
            this.accessMemory(e);
          });
          tr.appendChild(td);
        }
      }
      tbdy.appendChild(tr);
    }
    this.tbl.appendChild(tbdy);
    this.body.appendChild(this.tbl);
  }

   /**
   * Represents what happens when we click a tile. Currently used to highlight the tile by changing the background color.
   * @param e represents the mouse event.
   */
  tileClick(e) {
    e.target.style.backgroundColor = 'white';
    console.log("You clicked on " + e.target.textContent);
    var currentNum = e.target.textContent;
     //var currentCacheLine = this.findThisNumbersCacheLine(currentNum);
     var currentCacheLine = null;
  }


  accessMemory(e) {
    var value = {value: e.target.textContent};
    console.log("umm.." + value.value);

    this.boardService.accessMemory(this.boardId, value).subscribe((board: any) => {
      this.gameNumbers = board.numbers; // This should get removed once we put in boardId (probably)
      console.log(this.gameNumbers)
    })

  }




}
