import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/core/http/user/user.service';
import { User } from 'src/app/shared/models/user';
import { TextInputConfig } from '../../../components/form/text-input/text-input.component';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  moduleName = 'users'; 

  title = 'New User';
  createForm: FormGroup;
  user = new User();
  submitted = false;
  state: any;
  id: any;

  nameTextInputConfig = new TextInputConfig();
  emailTextInputConfig = new TextInputConfig();
  passwordTextInputConfig = new TextInputConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");

      this.initializeComponents();
  }

  ngOnInit(): void {

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.nameTextInputConfig.formControl = this.createForm.get('name') as FormControl;
    this.emailTextInputConfig.formControl = this.createForm.get('email') as FormControl;
    this.passwordTextInputConfig.formControl = this.createForm.get('password') as FormControl;

    if (this.id) {
      this.title = 'Edit Discipline'

      this.userService.get(this.id).subscribe((res)=>{
        this.user = res.users;

        this.f.name.setValue(this.user.name);
        if (this.user.email) this.f.email.setValue(this.user.email);
        
        // if (res.users.password) this.f.password.setValue(this.user.password);
      });   
    }

  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.setSubmitted();

    if (this.createForm.invalid) {       
      return;
    }
    
    this.user.name = this.f.name.value;
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;
    
    
    if (! this.id) { 
      this.userService.create(this.user)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.userService.update(this.user)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.userService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  setSubmitted(){
    this.submitted = true;
    this.nameTextInputConfig.formSubmitted = this.submitted;
  }

  private initializeComponents(){
    let scope = this;

    this.nameTextInputConfig.fieldName = 'Name';
    this.nameTextInputConfig.required = true;
    this.nameTextInputConfig.placeholder = 'User Name';
    this.nameTextInputConfig.formSubmitted = this.submitted;
    
    this.emailTextInputConfig.fieldName = 'Email';
    this.emailTextInputConfig.required = false;
    this.emailTextInputConfig.placeholder = 'User Email';
    
    this.passwordTextInputConfig.fieldName = 'Password';
    this.passwordTextInputConfig.required = false;
    this.passwordTextInputConfig.placeholder = 'User Password';


    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;

  }

  goToList(){
    this.router.navigate(['admin/users/list']);
  }

}
