import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';
@Injectable()

export class BoardService {

  baseUrl = environment.baseUrl;

  constructor(private http: Http) {
  }


  findBoard(boardId) {
    const url = this.baseUrl + '/api/game/' + boardId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  initializeBoard(boardId, exampleBoard) {
    const url = this.baseUrl + '/api/game/' + boardId;
    return this.http.post(url, exampleBoard).map((response: Response) => {
      return response.json();
    });
  }

  accessMemory(boardId, val) {
    console.log("in client service. value is : " + val.value);
    const url = this.baseUrl + '/api/game/' + boardId + '/accessMemory';
    return this.http.post(url, val).map((response: Response) => {
      return response.json();
    });
  }
}

