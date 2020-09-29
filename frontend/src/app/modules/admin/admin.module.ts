import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostsComponent } from './pages/posts/posts.component';
import { UsersComponent } from './pages/users/users.component';
import { ComponentsModule } from "../../shared/components/components.module";

import { SharedModule } from "../../shared/shared.module";
import { IndustriesComponent } from './pages/industries/industries.component';

@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    PostsComponent,
    UsersComponent,
    IndustriesComponent    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
