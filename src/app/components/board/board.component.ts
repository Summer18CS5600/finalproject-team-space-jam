import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {BoardService} from '../../services/board.service.client';
import {$} from "protractor";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameNumbers: number[];
  exampleBoard: any;
  constructor(private router: Router, private boardService: BoardService) {}

  ngOnInit() {
    // this.gs.getGameBoard(30).subscribe((numbers: any) => {
    //   this.gameNumbers = numbers;
    // });
  }

  initializeBoard(gameId) {
    console.log('initializing');
    // Make a board.
    const nums = [];
    let i = 0;
    let cacheLine = 0;
    let cacheCounter = 0;
    for (i = 0; i < 100; i++) {
      if (cacheCounter > 24) {
        cacheLine += 1;
        cacheCounter = 0;
      }
      nums.push({position: 99-i, value: i, cacheLine: cacheLine, hidden: true, locked: false});
      cacheCounter += 1;
    }
    this.exampleBoard = {id: gameId,
      numbers: nums
    };

    // Send the board to the client api
    this.boardService.initializeBoard(gameId, this.exampleBoard).subscribe((game: any) => {
      console.log(game);
      this.gameNumbers = game.numbers;
      console.log(this.gameNumbers)
    });
  }

  findThisNumber(position) {
    console.log("entering find This number");
    for (var i = 0; i < this.gameNumbers.length; i++) {
      if (this.gameNumbers[i]['position'] == position) {
        return this.gameNumbers[i]['value'];
      }
    }
  }

  findBoard(boardId) {
    console.log("looking for a board");
    this.boardService.findBoard(boardId).subscribe((board: any) => {
      this.gameNumbers = board.numbers;
    });
  }

  createTable() {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '50%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 10; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 10; j++) {
        // console.log('J is now: ' + j);
        if (i == 10 && j == 10) {
          break
        } else {
          var td = document.createElement('td');
          var pos = null;
          if (i == 0) {
            pos = j;
          } else {
            pos = i*10 + j;
          }
          console.log('the pos ' + pos);
          var data = this.findThisNumber(pos);
          td.appendChild(document.createTextNode(data));
          td.style.backgroundColor = '#000000';
          td.style.textAlign = 'center';
          td.style.webkitTextFillColor = '#000000';
          td.addEventListener("click", this.tileClick);
          tr.appendChild(td)
        }
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  }

  tileClick(e) {
    e.target.style.backgroundColor = 'white';
    console.log("You clicked on " + e);


  }



}
