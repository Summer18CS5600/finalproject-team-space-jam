import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';
@Injectable()

export class CacheSetService {

  baseUrl = environment.baseUrl;

  constructor(private http: Http) {
  }



}

