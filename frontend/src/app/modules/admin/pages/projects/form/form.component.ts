import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { Project } from 'src/app/shared/models/project';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';
import { MultilanguageTextInputComponent, MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild(MultilanguageTextInputComponent, {static: true}) titleMultilanguageForm: MultilanguageTextInputComponent;
  @ViewChild(MultilanguageTextInputComponent, {static: true}) descMultilanguageForm: MultilanguageTextInputComponent;

  moduleName = 'projects'; 

  title = 'New Project';
  createForm: FormGroup;
  project = new Project();
  projects: Project[] = [];
  submitted = false;
  state: any;
  id: any;

  titleMultilanguageInputConfig = new MultilanguageTextInputConfig();
  descMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");

      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      title: this.titleMultilanguageForm.getGroup(),
      description: this.descMultilanguageForm.getGroup()
    });
    

    if (this.id) {
      this.title = 'Edit Project'

      this.projectService.get(true, this.id).subscribe((res)=>{
        this.project = res.projects;
        this.titleMultilanguageForm.setValue(this.project.title);
        this.descMultilanguageForm.setValue(this.project.description);
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
    
    this.project.title = this.titleMultilanguageForm.getValue();
    this.project.description = this.descMultilanguageForm.getValue();
    
    if (! this.id) { 
      this.projectService.create(this.project)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.projectService.update(this.project)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.projectService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  setSubmitted(){
    this.submitted = true;
    this.titleMultilanguageForm.setSubmitted(true);
    this.descMultilanguageForm.setSubmitted(true);
  }

  private initializeComponents(){
    let scope = this;

    this.titleMultilanguageInputConfig.fieldName = 'Title';
    this.titleMultilanguageInputConfig.required = true;
    this.titleMultilanguageInputConfig.placeholder = 'Title';
    this.titleMultilanguageInputConfig.selectedLanguage = this.languageSelectorConfig.selectedLanguage.value;
    
    this.descMultilanguageInputConfig.fieldName = 'Description';
    this.descMultilanguageInputConfig.required = true;
    this.descMultilanguageInputConfig.placeholder = 'Description';
    this.descMultilanguageInputConfig.selectedLanguage = this.languageSelectorConfig.selectedLanguage.value;

    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;

    this.languageSelectorConfig.onChange= function(value){
      scope.changeDetectorRef.detectChanges();
      scope.titleMultilanguageInputConfig.selectedLanguage = value.value;
      scope.descMultilanguageInputConfig.selectedLanguage = value.value;
    }
  }

  goToList(){
    this.router.navigate(['admin/projects/list']);
  }
}
