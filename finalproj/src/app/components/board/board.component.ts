import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {BoardService} from '../../services/board.service.client';

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
    this.exampleBoard = {id: gameId,
      numbers: [
        {0: 6, hidden: true, locked: false},
        {1: 7, hidden: true, locked: false},
        {2: 8, hidden: true, locked: false},
        {3: 9, hidden: true, locked: false},
        {4: 10, hidden: true, locked: false},
        {5: 11, hidden: true, locked: false}
      ]};

    // Send the board to the client api
    this.boardService.initializeBoard(gameId, this.exampleBoard).subscribe((game: any) => {
      console.log(game);
    });
  }
}
