import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';
@Injectable()

export class CacheSetService {

  baseUrl = environment.baseUrl;

  constructor(private http: Http) {
  }

  initializeCache(boardId) {
    const url = this.baseUrl + '/api/cache/' + boardId;
    return this.http.post(url, null).map((response: Response) => {
      return response.json();
    })


  }

  findCache(boardId) {
    const url = this.baseUrl + '/api/cache/' + boardId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });

  }


}

