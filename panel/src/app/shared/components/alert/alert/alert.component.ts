import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AlertService } from "../../../../services/alert/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  baseCssClasses = "custom_alert alert animate__animated";

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case "success":
          message.cssClass = `${this.baseCssClasses} alert-success animate__fadeInDown`;
          break;
        case "error":
          message.cssClass = `${this.baseCssClasses} alert-danger animate__fadeInDown`;
          break;
      }

      setTimeout(() => {
        switch (message && message.type) {
          case "success":
            message.cssClass = `${this.baseCssClasses} alert-success animate__fadeOutUp`;
            break;
          case "error":
            message.cssClass = `${this.baseCssClasses} alert-danger animate__fadeOutUp`;
            break;
        }
      }, 1500);

      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
