import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/pages/not-found/not-found.component';
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import(`./modules/admin/admin.module`).then(m => m.AdminModule) },
  { path: 'site', loadChildren: () => import(`./modules/website/website.module`).then(m => m.WebsiteModule) },
  { path: 'login', loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule) },
  { path: '', redirectTo: 'site', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
