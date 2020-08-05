import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AlertComponent } from "./components/alert/alert/alert.component";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AlertComponent,
  ],
  imports: [CommonModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, AlertComponent],
})
export class SharedModule {}
