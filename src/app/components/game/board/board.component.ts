import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../services/game.service.client';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameNumbers: number[];

  constructor(private gs: GameService) {}

  ngOnInit() {
    this.gameNumbers = this.gs.getGameBoard(20);
  }
}
