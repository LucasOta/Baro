import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from '../../shared/components/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', loadChildren: () => import(`./pages/categories/categories.module`).then(m => m.CategoriesModule) },
      { path: 'industries', loadChildren: () => import(`./pages/industries/industries.module`).then(m => m.IndustriesModule) },
      { path: 'disciplines', loadChildren: () => import(`./pages/disciplines/disciplines.module`).then(m => m.DisciplinesModule) },
      { path: 'clients', loadChildren: () => import(`./pages/clients/clients.module`).then(m => m.ClientsModule) },
      { path: 'users', loadChildren: () => import(`./pages/users/users.module`).then(m => m.UsersModule) },
      { path: 'posts', loadChildren: () => import(`./pages/posts/posts.module`).then(m => m.PostsModule) },
      { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
