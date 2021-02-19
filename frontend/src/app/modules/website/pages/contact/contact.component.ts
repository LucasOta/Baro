import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // form={
  //   name: '',
  //   name: '',
  //   name: '',
  //   name: '',
  //   name: '',
  // };
  model = new Contact();

  submitted = false;
  // Seguir desde acá
  // https://angular.io/guide/forms
  
  constructor() { }

  ngOnInit(): void {}

  onSubmit() { 
    this.submitted = true;

    if(this.model.name && this.model.email && this.model.message){
      // Send form
      console.log(this.model);
    }
    
  }



  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
