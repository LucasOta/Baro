import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DisciplineService } from 'src/app/core/http/discipline/discipline.service';
import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { Discipline } from 'src/app/shared/models/discipline';
import { MultilanguageTextInputComponent, MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild(MultilanguageTextInputComponent, {static: true}) nameMultilanguageForm: MultilanguageTextInputComponent;

  moduleName = 'disciplines'; 

  title = 'New Discipline';
  createForm: FormGroup;
  discipline = new Discipline();
  disciplines: Discipline[] = [];
  submitted = false;
  state: any;
  id: any;

  nameMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private disciplineService: DisciplineService,
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
      this.title = 'Edit Discipline'

      this.disciplineService.get(true, this.id).subscribe((res)=>{
        this.discipline = res.disciplines;
        this.nameMultilanguageForm.setValue(this.discipline.name);
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
    
    this.discipline.name = this.nameMultilanguageForm.getValue();
    
    if (! this.id) { 
      this.disciplineService.create(this.discipline)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.disciplineService.update(this.discipline)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.disciplineService.delete(this.id)
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
    let scope = this;

    this.nameMultilanguageInputConfig.fieldName = 'Name';
    this.nameMultilanguageInputConfig.required = true;
    this.nameMultilanguageInputConfig.placeholder = 'Name';
    this.nameMultilanguageInputConfig.selectedLanguage = this.languageSelectorConfig.selectedLanguage.value;

    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;

    this.languageSelectorConfig.onChange= function(value){
      scope.changeDetectorRef.detectChanges();
      scope.nameMultilanguageInputConfig.selectedLanguage = value.value;
    }
  }

  goToList(){
    this.router.navigate(['admin/disciplines/list']);
  }
}
