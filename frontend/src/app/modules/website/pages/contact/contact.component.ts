import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model = new Contact();
  status = {
    submitted: false,
    sending: false,
    sent: false
  }
  
  constructor() { }

  ngOnInit(): void {}

  onSubmit() {
    this.status.submitted = true;

    if(this.model.name && this.model.email && this.model.message){
      // Send form
      this.status.sending = true;
      setTimeout(() => {
        this.status.sending = false;
        this.status.sent = true;
      }, 1000);
      console.log(this.model);
    }    
  }
}
