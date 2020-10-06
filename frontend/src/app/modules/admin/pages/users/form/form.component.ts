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

  imgPickerConfig = new ImgPickerConfig();
  nameTextInputConfig = new TextInputConfig();
  emailTextInputConfig = new TextInputConfig();
  passwordTextInputConfig = new TextInputConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileService: FileService,
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
        this.f.email.setValue(this.user.email);
        this.imgPickerConfig.imgs.push({name: this.user.img})
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
    this.submitted = true;
    this.nameTextInputConfig.formSubmitted = this.submitted;
    this.emailTextInputConfig.formSubmitted = this.submitted;
    this.passwordTextInputConfig.formSubmitted = this.submitted;
  }

  private initializeComponents(){
    let scope = this;

    this.nameTextInputConfig.fieldName = 'Name';
    this.nameTextInputConfig.required = true;
    this.nameTextInputConfig.placeholder = 'User Name';
    this.nameTextInputConfig.formSubmitted = this.submitted;
    
    this.emailTextInputConfig.fieldName = 'Email';
    this.emailTextInputConfig.required = true;
    this.emailTextInputConfig.placeholder = 'User Email';
    this.emailTextInputConfig.formSubmitted = this.submitted;
    
    this.passwordTextInputConfig.fieldName = 'Password';
    this.passwordTextInputConfig.required = true;
    this.passwordTextInputConfig.placeholder = 'User Password';
    this.passwordTextInputConfig.formSubmitted = this.submitted;

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
    this.router.navigate(['admin/users/list']);
  }

}
