import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ProjectService } from 'src/app/core/http/project/project.service';
import { ClientService } from 'src/app/core/http/client/client.service';
import { IndustryService } from 'src/app/core/http/industry/industry.service';
import { DisciplineService } from 'src/app/core/http/discipline/discipline.service';

import { Project } from 'src/app/shared/models/project';

import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';
import { MultilanguageTextInputComponent, MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';
import { DropDownListInputConfig } from '../../../components/form/drop-down-list/drop-down-list.component';
import { CheckboxConfig } from '../../../components/form/checkbox/checkbox.component';
import { ImgPickerConfig } from '../../../components/form/image-picker/image-picker.component';
import { FileService } from 'src/app/core/http/file/file.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('title', {static: true}) titleMultilanguageForm: MultilanguageTextInputComponent;
  @ViewChild('desc', {static: true}) descMultilanguageForm: MultilanguageTextInputComponent;

  moduleName = 'projects'; 

  pageTitle = 'New Project';
  createForm: FormGroup;
  project = new Project();
  projects: Project[] = [];
  submitted = false;
  state: any;
  id: any;

  titleMultilanguageInputConfig = new MultilanguageTextInputConfig();
  descMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();

  playgroundCheckboxConfig = new CheckboxConfig();
  featuredCheckboxConfig = new CheckboxConfig();
  clientsDropDownListInputConfig = new DropDownListInputConfig();
  industriesDropDownListInputConfig = new DropDownListInputConfig();
  disciplinesDropDownListInputConfig = new DropDownListInputConfig();
  
  coverImgPickerConfig = new ImgPickerConfig();
  thumbImgPickerConfig = new ImgPickerConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private clientService: ClientService,
    private industryService: IndustryService,
    private disciplineService: DisciplineService,
    private changeDetectorRef: ChangeDetectorRef,
    private fileService: FileService,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");

      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      title: this.titleMultilanguageForm.getGroup(),
      description: this.descMultilanguageForm.getGroup(),
      playground: [false],
      featured: [false],
      clients: ['', Validators.required],
      industries: ['', Validators.required],
      disciplines: ['', Validators.required],
      blocks: this.formBuilder.array([]),
    });
    this.playgroundCheckboxConfig.formControl = this.createForm.get('playground') as FormControl;
    this.featuredCheckboxConfig.formControl = this.createForm.get('featured') as FormControl;
    this.clientsDropDownListInputConfig.formControl = this.createForm.get('clients') as FormControl;
    this.industriesDropDownListInputConfig.formControl = this.createForm.get('industries') as FormControl;
    this.disciplinesDropDownListInputConfig.formControl = this.createForm.get('disciplines') as FormControl;
    

    if (this.id) this.setProject();
    
  }

  setProject(){
    this.pageTitle = 'Edit Project'

    this.projectService.get(true, this.id).subscribe((res)=>{
      this.project = res.projects;

      this.titleMultilanguageForm.setValue(this.project.title);
      this.descMultilanguageForm.setValue(this.project.description);

      this.f.playground.setValue(this.project.playground);
      this.f.featured.setValue(this.project.featured);
      this.f.clients.setValue(this.getIdArray(this.project.clients));
      this.f.industries.setValue(this.getIdArray(this.project.industries));
      this.f.disciplines.setValue(this.getIdArray(this.project.disciplines));
      
      this.setBlocks();      
      
      this.coverImgPickerConfig.imgs.push({name: this.project.coverImg})
      this.thumbImgPickerConfig.imgs.push({name: this.project.thumbnail})
    }); 
  }

  setBlocks(){
    const blocks = this.formBuilder.array([]);
    this.project.blocks.forEach(block => {
      blocks.push(new FormGroup({
        bgColor: new FormControl(block.bgColor),
        fontColor: new FormControl(block.fontColor),
        items: this.setItems(block.items)
      }));
    });
    this.f.blocks = blocks;
  }

  setItems(items: any[]){
    const itemsForm = this.formBuilder.array([]);
    items.forEach(item => {
      itemsForm.push(new FormGroup({
        typeOfItem: new FormControl(item.typeOfItem),
        timestamp: new FormControl(item.timestamp),
        title: new FormControl(item.title || ''),
        subtitle: new FormControl(item.subtitle || ''),
        description: new FormControl(item.description || ''),
        video: new FormControl(item.video || ''),
        img: new FormControl(item.img || ''),
        fullWidth: new FormControl(item.fullWidth || false),
        testimonial: new FormControl(item.testimonial || ''),
      }));
    });
    return itemsForm;
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  getIdArray(obj: any[]){
    let ids = [];
    obj.forEach(o => ids.push(o._id) );
    
    return ids;
  }

  onSubmit() {
    this.setSubmitted();
    if (this.createForm.invalid) {     
      return;
    }
    this.project.title = this.titleMultilanguageForm.getValue();
    this.project.description = this.descMultilanguageForm.getValue();

    this.project.playground = this.f.playground.value;
    this.project.featured = this.f.featured.value;

    this.project.clients = this.f.clients.value;
    this.project.industries = this.f.industries.value;
    this.project.disciplines = this.f.disciplines.value;    

    // TODO: erase this harcorded code
    this.project.blocks = this.f.blocks.value;
    
    if (! this.id) { 
      this.projectService.create(this.project)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      
      if (this.coverImgPickerConfig.imgsChanged) {
        this.coverImgPickerConfig.imgs[0] ? this.project.coverImg = this.coverImgPickerConfig.imgs[0].name : this.project.coverImg = 'empty';
      }
      
      if (this.thumbImgPickerConfig.imgsChanged) {
        this.thumbImgPickerConfig.imgs[0] ? this.project.thumbnail = this.thumbImgPickerConfig.imgs[0].name : this.project.thumbnail = 'empty';
      }

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

    this.clientsDropDownListInputConfig.submitted = true;
    this.industriesDropDownListInputConfig.submitted = true;
    this.disciplinesDropDownListInputConfig.submitted = true;
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
    

    this.playgroundCheckboxConfig.fieldName = 'Playground';
    this.featuredCheckboxConfig.fieldName = 'Featured';

    this.clientsDropDownListInputConfig.fieldName = 'Clients';
    this.clientsDropDownListInputConfig.required = true;
    this.clientsDropDownListInputConfig.options = [];
    this.clientService.get().subscribe((res)=>{
      res.clients.forEach(c => {
        this.clientsDropDownListInputConfig.options.push({key: c.name, value: c._id});
      });
    });

    this.industriesDropDownListInputConfig.fieldName = 'Industries';
    this.industriesDropDownListInputConfig.required = true;
    this.industriesDropDownListInputConfig.options = [];
    this.industryService.get().subscribe((res)=>{
      res.industries.forEach(i => {
        this.industriesDropDownListInputConfig.options.push({key: i.name[0].quote, value: i._id});
      });
    });

    this.disciplinesDropDownListInputConfig.fieldName = 'Disciplines';
    this.disciplinesDropDownListInputConfig.required = true;
    this.disciplinesDropDownListInputConfig.options = [];
    this.disciplineService.get().subscribe((res)=>{
      res.disciplines.forEach(d => {
        this.disciplinesDropDownListInputConfig.options.push({key: d.name[0].quote, value: d._id});
      });
    });


    this.coverImgPickerConfig.fieldName = 'Cover';
    this.coverImgPickerConfig.prefix = 'cover';
    this.coverImgPickerConfig.moduleNameFrom = this.moduleName;
    this.coverImgPickerConfig.elementIdFrom = this.id;
    this.coverImgPickerConfig.maxImgs = 1;
    this.coverImgPickerConfig.note = `You can only select up to ${this.coverImgPickerConfig.maxImgs} image`;
    
    this.thumbImgPickerConfig.fieldName = 'Thumbnail';
    this.thumbImgPickerConfig.prefix = 'thumb';
    this.thumbImgPickerConfig.moduleNameFrom = this.moduleName;
    this.thumbImgPickerConfig.elementIdFrom = this.id;
    this.thumbImgPickerConfig.maxImgs = 1;
    this.thumbImgPickerConfig.note = `You can only select up to ${this.thumbImgPickerConfig.maxImgs} image`;



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
    this.coverImgPickerConfig.deleteTemps(this.fileService);
    this.thumbImgPickerConfig.deleteTemps(this.fileService);
    this.router.navigate(['admin/projects/list']);
  }
}
