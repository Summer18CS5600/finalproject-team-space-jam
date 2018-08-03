import {Routing} from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {BoardService} from './services/board.service.client';
import {BoardComponent} from './components/board/board.component';

// add client side services to providers

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    BoardService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
