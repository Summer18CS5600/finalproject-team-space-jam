import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pid',
  templateUrl: './pid.component.html',
  styleUrls: ['./pid.component.css']
})
export class PidComponent implements OnInit {

  pid: String;
  gameid: String;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  enterGame() {
  }

}
