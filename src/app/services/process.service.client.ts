import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';
@Injectable()

export class ProcessService {

  baseUrl = environment.baseUrl;

  constructor(private http: Http) {}

  findProcessById(pid: string) {
    //console.log("IN FIND PROCESS BY ID CLIENT");
    const url = this.baseUrl + '/api/process/' + pid;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  createProcess(process: any) {
    const url = this.baseUrl + '/api/process';
    return this.http.post(url, process)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateProcess(pid: string, process: any) {
   // console.log("ARE WE GETTING TO UPDATE?!");
    const url = this.baseUrl + '/api/process/' + pid;
    return this.http.put(url, process)
      .map((response: Response) => {
        return response.json();
      });
  }

}
