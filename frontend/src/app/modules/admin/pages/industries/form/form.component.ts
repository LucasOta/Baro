import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IndustryService } from 'src/app/core/http/industry/industry.service';
import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { Industry } from 'src/app/shared/models/industry';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MultilanguageTextInputComponent, MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild(MultilanguageTextInputComponent, {static: true}) nameMultilanguageForm: MultilanguageTextInputComponent;

  moduleName = 'industries';

  title = 'New Industry';
  submitText = 'Create'
  createForm: FormGroup;
  industry = new Industry();
  industries: Industry[] = [];
  submitted = false;
  state: any;
  id: any;

  nameMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private industryService: IndustryService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");

      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      name: this.nameMultilanguageForm.getGroup()
    });
    

    if (this.id) {
      this.title = 'Edit Industry'
      this.submitText = 'Edit'

      this.industryService.get(true, this.id).subscribe((res)=>{
        this.industry = res.industries;
        this.nameMultilanguageForm.setValue(this.industry.name);
      });   
    }
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.setSubmitted();

    if (this.createForm.invalid) {       
      return;
    }
    
    this.industry.name = this.nameMultilanguageForm.getValue();
    
    if (! this.id) { 
      this.industryService.create(this.industry)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.industryService.update(this.industry)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  delete(){
    // TODO: show alert asking if sure
    this.industryService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  setSubmitted(){
    this.submitted = true;
    this.nameMultilanguageForm.setSubmitted(true);
  }

  private initializeComponents(){

    this.nameMultilanguageInputConfig.fieldName = 'Name';
    this.nameMultilanguageInputConfig.required = true;
    this.nameMultilanguageInputConfig.placeholder = 'Name';
    this.nameMultilanguageInputConfig.selectedLanguage = this.languageSelectorConfig.selectedLanguage.value;

    var scope = this
    this.languageSelectorConfig.onChange= function(value){
      scope.changeDetectorRef.detectChanges();
      scope.nameMultilanguageInputConfig.selectedLanguage = value.value;
    }
  }

  goToList(){
    this.router.navigate(['admin/industries/list']);
  }
}
