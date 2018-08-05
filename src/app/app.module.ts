import {Routing} from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {BoardService} from './services/board.service.client';
import {BoardComponent} from './components/board/board.component';
import {CacheSetService} from "./services/cacheset.service.client";
import {CachesetComponent} from "./components/cacheset/cacheset.component";
import {ProcessService} from "./services/process.service.client";

// add client side services to providers

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CachesetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    BoardService,
    CacheSetService,
    ProcessService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
