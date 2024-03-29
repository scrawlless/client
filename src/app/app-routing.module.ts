import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './_services/guard/guard.service';

const routes: Routes = [
  { path: '*', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./_components/pages/index/index.module').then(m => m.IndexModule), canActivate: [GuardService] },
  { path: 'dash', loadChildren: () => import('./_components/pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [GuardService] },
  { path: 'workspace', loadChildren: () => import('./_components/pages/workspace/workspace.module').then(m => m.WorkspaceModule), canActivate: [GuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
