import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { DisciplineService } from 'src/app/core/http/discipline/discipline.service';
import { IndustryService } from 'src/app/core/http/industry/industry.service';
import { Project } from 'src/app/shared/models/project';
import { Discipline } from 'src/app/shared/models/discipline';
import { Industry } from 'src/app/shared/models/industry';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})

export class WorkComponent implements OnInit {
  projects: Project[] = [];
  disciplines: Discipline[] = [];
  industries: Industry[] = [];
  filters = {
    discipline: {
      value: '',
      filters: []
    },
    industry: {
      value: '',
      filters: []
    }
  };

  constructor(
    private projectService: ProjectService,
    private disciplineService: DisciplineService,
    private industryService: IndustryService
    ) { }

  ngOnInit(): void {

    this.projectService.getAllWebsite(false, true).subscribe((res)=>{
      this.projects = res.projects;
      this.projects.forEach(p => p._show = true);
    });

    this.disciplineService.get().subscribe((res)=>{
      this.disciplines = res.disciplines;
    });

    this.industryService.get().subscribe((res)=>{
      this.industries = res.industries;
    });

  }

  refreshShow(){
    for (let i = 0; i < this.projects.length; i++) {
      let filterByDisc = this.filters.discipline.value != '';
      let filterByInd = this.filters.industry.value != '';
      let hasDisc;
      let hasInd;        
      
      filterByDisc ? hasDisc = this.hasSelectedDisc(this.projects[i]) : hasDisc = true;
      filterByInd ? hasInd = this.hasSelectedInd(this.projects[i]) : hasInd = true;

      this.projects[i]._show = hasDisc && hasInd;
    }
  }

  private hasSelectedDisc(p:Project){
    let has = false;
    p.disciplines.forEach(d => {
      if (!has) has = d.name[0].quote === this.filters.discipline.value;      
      if (has) return true;
    });
    return has;
  }

  private hasSelectedInd(p:Project){
    let has = false;
    p.industries.forEach(d => {
      if (!has) has = d.name[0].quote === this.filters.industry.value;      
      if (has) return true;
    });
    return has;
  }

  selectDiscFilter(p: any){
    this.filters.discipline.value = p.value;
    this.refreshShow();
  }
  
  selectIndFilter(p: any){
    this.filters.industry.value = p.value;
    this.refreshShow();
  }

}
