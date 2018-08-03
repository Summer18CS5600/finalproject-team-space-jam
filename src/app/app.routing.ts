// Import components
import {Routes, RouterModule} from '@angular/router';
import {BoardComponent} from './components/board/board.component';
import {ModuleWithProviders} from '@angular/core';

const APP_ROUTES: Routes = [
  {path: '', component : BoardComponent},
  {path: 'board', component : BoardComponent}

];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
