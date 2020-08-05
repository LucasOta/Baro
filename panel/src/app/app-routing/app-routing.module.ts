import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { AdminHomeComponent } from "../admin-home/admin-home.component";
import { CreateComponent } from "../post/create/create.component";
import { AuthGuard } from "../helpers/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "post/create",
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
