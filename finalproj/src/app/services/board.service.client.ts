import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';
@Injectable()

export class BoardService {

  baseUrl = environment.baseUrl;

  constructor(private http: Http) {
  }


  getGameBoard(gameId) {
    const url = this.baseUrl + '/api/game/' + gameId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  initializeBoard(gameId, exampleBoard) {
    const url = this.baseUrl + '/api/game/' + gameId;
    return this.http.post(url, exampleBoard).map((response: Response) => {
      return response.json();
    });
  }
}

