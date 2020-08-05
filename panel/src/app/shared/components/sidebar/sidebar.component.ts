import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication/authentication.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  currentUser = null;
  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {}
}
