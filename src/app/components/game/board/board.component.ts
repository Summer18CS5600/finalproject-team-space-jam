import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../services/game.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameNumbers: number[];
  exampleBoard: any;
  constructor(private router: Router, private gs: GameService) {}

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
    this.gs.initializeBoard(gameId, this.exampleBoard).subscribe((game: any) => {
      console.log(game);
    });
  }
}
