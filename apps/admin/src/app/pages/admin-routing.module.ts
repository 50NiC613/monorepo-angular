import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
    { path: 'igdb', loadChildren: () => import('./igdb-games/igdb-games.module').then(m => m.IGDBGamesModule) },

    // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
    //{ path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
