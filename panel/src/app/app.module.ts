import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminHomeComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
