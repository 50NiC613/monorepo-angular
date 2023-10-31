import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { NewGameComponent } from './new-game.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: GamesComponent },
    { path: 'new', component: NewGameComponent },

    // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
    //{ path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
