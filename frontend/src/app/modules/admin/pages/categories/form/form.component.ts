import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/shared/services/alert.service';
import { CategoryService } from 'src/app/core/http/category/category.service';
import { FileService } from 'src/app/core/http/file/file.service';
import { Category } from 'src/app/shared/models/category';

import { ImgPickerConfig } from "../../../components/form/image-picker/image-picker.component";
import { LanguageSelectorConfig } from '../../../../../shared/components/language-selector/language-selector.component';
import { MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';
import { Translation, createTranslationForm, setTranslationFormValue, getTranslationFormValue } from 'src/app/shared/models/translation';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  moduleName = 'categories';

  title = 'New Category';
  submitText = 'Create'
  createForm: FormGroup;
  category = new Category();
  categories: Category[] = [];
  submitted = false;
  state: any;
  id: any;

  imgPickerConfig = new ImgPickerConfig();
  nameMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private fileService: FileService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");
      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      name: createTranslationForm()
    });
    this.nameMultilanguageInputConfig.formGroup = this.createForm.get('name') as FormGroup;    

    if (this.id) {
      this.title = 'Edit Category'
      this.submitText = 'Edit'

      this.categoryService.get(true, this.id).subscribe((res)=>{
        // TODO: handle errors
        this.category = res.categories;
        setTranslationFormValue(this.createForm, 'name', this.category.name as Translation[]);        
        
        this.imgPickerConfig.imgs.push({name: this.category.img});
      });   
    }   
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.setSubmitted();

    if (this.createForm.invalid) return;
    
    this.category.name = getTranslationFormValue(this.createForm, 'name');
    
    if (!this.id) { 
      this.categoryService.create(this.category)
      .pipe(first())
      .subscribe(
        data => { if (data.ok) this.goToList(); }
      );      
    } else {
      // TODO: We should analize if this can be outside the if, only if the create backend changes
      if (this.imgPickerConfig.imgsChanged) {
        this.imgPickerConfig.imgs[0] ? this.category.img = this.imgPickerConfig.imgs[0].name : this.category.img = 'empty';
      }
      this.categoryService.update(this.category)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );
    }    
  }

  delete(){
    // TODO: show alert asking if sure
    this.categoryService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  setSubmitted(){
    this.submitted = true;
  }

  private initializeComponents(){
    this.imgPickerConfig.fieldName = 'Image';
    this.imgPickerConfig.moduleNameFrom = this.moduleName;
    this.imgPickerConfig.elementIdFrom = this.id;
    this.imgPickerConfig.maxImgs = 1;
    this.imgPickerConfig.note = `You can only select up to ${this.imgPickerConfig.maxImgs} image`;

    this.nameMultilanguageInputConfig.fieldName = 'Name';
    this.nameMultilanguageInputConfig.required = true;
    this.nameMultilanguageInputConfig.placeholder = 'Name';

    // var scope = this;
    // TODO: use cardfooterconfig
  }

  goToList(){
    this.imgPickerConfig.deleteTemps(this.fileService);
    this.router.navigate(['admin/categories/list']);
  }
}
