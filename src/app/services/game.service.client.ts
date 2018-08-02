import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
@Injectable()

export class GameService {

  baseUrl = environment.baseUrl;

  constructor(private http: Http) {
  }


  getGameBoard(gameId) {
    const url = this.baseUrl + '/api/game/' + gameId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
    // const gameBoard = [3, 1, 3];
    // return gameBoard;
  }
}

