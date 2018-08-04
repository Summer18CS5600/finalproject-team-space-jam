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
      if (cacheCounter > 3) {
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

  /**
   * Find the number who's position equals the given parameter.
   * @param position
   * @returns {any}
   */
  findThisNumber(position) {
    console.log("entering find This number");
    for (var i = 0; i < this.gameNumbers.length; i++) {
      if (this.gameNumbers[i]['position'] == position) {
        return this.gameNumbers[i]['value'];
      }
    }
  }

  ///// THIS WASN'T WORKING BEING CALLED INSIDE TILECLICK()
  // /**
  //  * Given a number, find the matching number and retrieve it's cache line. This is a helper function so we can
  //  * find other numbers in the same cache line for highlighting.
  //  * @param num represents the selected number from the board.
  //  */
  // findThisNumbersCacheLine(num) {
  //   console.log("entering find a cache line");
  //   for (var i = 0; i < this.gameNumbers.length; i++) {
  //     if (this.gameNumbers[i]['value'] == num) {
  //       return this.gameNumbers[i]['cacheLine'];
  //     }
  //   }
  //
  //
  // }

  /**
   * Creates (HTML-wise) and Renders the table to the screen.
   */
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

   /**
   * Represents what happens when we click a tile. Currenty used to highlight the tile by changing the background color.
   * @param e represents the mouse event.
   */
  tileClick(e) {
    e.target.style.backgroundColor = 'white';
    console.log("You clicked on " + e.target.textContent);
    var currentNum = e.target.textContent;
     //var currentCacheLine = this.findThisNumbersCacheLine(currentNum);
     var currentCacheLine = null;

     console.log("entering find a cache line");
     for (var i = 0; i < 100; i++) {
       console.log("Hi Why won't this work below here anymore? I wonder if there's something special about the scope" +
         "of being insdie a function");
       console.log(this);
       console.log(gameNumbers);
       console.log(this.gameNumbers[5]);
       if (this.gameNumbers[i]['value'] == currentNum) {
         currentCacheLine = this.gameNumbers[i]['cacheLine'];
       }
     }
    console.log("The Cache Line is: " + currentCacheLine);
    for (var i = 0; i < 100; i++) {
      if (this.gameNumbers[i]['cacheLine']) {
        console.log("We should highlight " + this.gameNumbers[i]['value']);
      }
    }


  }




}
