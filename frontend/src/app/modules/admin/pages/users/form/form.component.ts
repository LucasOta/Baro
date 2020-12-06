import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/core/http/user/user.service';
import { User } from 'src/app/shared/models/user';
import { TextInputConfig } from '../../../components/form/text-input/text-input.component';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';
import { ImgPickerConfig } from '../../../components/form/image-picker/image-picker.component';
import { FileService } from 'src/app/core/http/file/file.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { set, reset } from "src/app/shared/actions/formSubmitted.actions";

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
  state: any;
  id: any;

  imgPickerConfig = new ImgPickerConfig();
  nameTextInputConfig = new TextInputConfig();
  emailTextInputConfig = new TextInputConfig();
  passwordTextInputConfig = new TextInputConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileService: FileService,
    private store: Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");

      this.initializeComponents();
  }

  ngOnInit(): void {

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    
    this.nameTextInputConfig.formControl = this.createForm.get('name') as FormControl;
    this.emailTextInputConfig.formControl = this.createForm.get('email') as FormControl;

    if (this.id) {
      this.title = 'Edit Discipline'

      this.userService.get(this.id).subscribe((res)=>{
        this.user = res.users;

        this.f.name.setValue(this.user.name);
        this.f.email.setValue(this.user.email);
        this.imgPickerConfig.imgs.push({name: this.user.img})
      });   
    } else {
      this.createForm.addControl('password', new FormControl('', Validators.required));
      this.passwordTextInputConfig.formControl = this.createForm.get('password') as FormControl;
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
    
    if (! this.id) { 
      this.user.password = this.f.password.value;

      this.userService.create(this.user)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.user._id = this.id;

      if (this.imgPickerConfig.imgsChanged) {
        this.imgPickerConfig.imgs[0] ? this.user.img = this.imgPickerConfig.imgs[0].name : this.user.img = 'empty';
      }
      
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
    this.store.dispatch(set());
  }

  private initializeComponents(){
    let scope = this;

    this.nameTextInputConfig.fieldName = 'Name';
    this.nameTextInputConfig.required = true;
    this.nameTextInputConfig.placeholder = 'User Name';
    
    this.emailTextInputConfig.fieldName = 'Email';
    this.emailTextInputConfig.required = true;
    this.emailTextInputConfig.placeholder = 'User Email';
    
    if (!this.id) {
      this.passwordTextInputConfig.fieldName = 'Password';
      this.passwordTextInputConfig.required = true;
      this.passwordTextInputConfig.placeholder = 'User Password';
    }

    this.imgPickerConfig.fieldName = 'Image';
    this.imgPickerConfig.moduleNameFrom = this.moduleName;
    this.imgPickerConfig.elementIdFrom = this.id;
    this.imgPickerConfig.maxImgs = 1;
    this.imgPickerConfig.note = `You can only select up to ${this.imgPickerConfig.maxImgs} image`;


    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;

  }

  goToList(){
    this.imgPickerConfig.deleteTemps(this.fileService);
    this.store.dispatch(reset());
    this.router.navigate(['admin/users/list']);    
  }

}
