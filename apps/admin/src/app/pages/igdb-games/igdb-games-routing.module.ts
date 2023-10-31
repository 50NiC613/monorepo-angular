import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IGDBGamesComponent } from './igdb-games.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'games', component: IGDBGamesComponent },
    // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
    //{ path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class IGDBGamesRoutingModule { }
