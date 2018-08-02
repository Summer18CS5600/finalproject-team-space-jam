import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
@Injectable()

export class GameService {

  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }


  getGameBoard(gameId) {
    const url = this.baseUrl + '/api/game/' + gameId;
    const gameBoard = [3, 1, 3];
    return gameBoard;
  }
}

