import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CacheSetService} from "../../services/cacheset.service.client";

@Component({
  selector: 'app-cacheset',
  templateUrl: './cacheset.component.html',
  styleUrls: ['./cacheset.component.css']
})
export class CachesetComponent implements OnInit {


  constructor(private router: Router, private cacheSetService: CacheSetService) {}

  ngOnInit() {


  }

}
