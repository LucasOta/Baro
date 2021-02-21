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
    discipline: '',
    industry: ''
  };
  panelOpen = {
    disc: false,
    ind: false
  };
  indCombinationChecker = [
    {industry: '', combinations: []}
  ];
  discCombinationChecker = [
    {discipline: '', combinations: []}
  ];

  constructor(
    private projectService: ProjectService,
    private disciplineService: DisciplineService,
    private industryService: IndustryService
    ) { }

  ngOnInit(): void {

    this.projectService.getAllWebsite(false, true).subscribe((res)=>{
      this.projects = res.projects;
      this.projects.forEach(p => p._show = true);
      this.setCombinations();
    });

    this.disciplineService.get().subscribe((res)=>{
      this.disciplines = res.disciplines;
      this.setCombinations();
    });

    this.industryService.get().subscribe((res)=>{
      this.industries = res.industries;
      this.setCombinations();
    });

  }

  refreshShow(){
    for (let i = 0; i < this.projects.length; i++) {
      let filterByDisc = this.filters.discipline != '';
      let filterByInd = this.filters.industry != '';
      let hasDisc;
      let hasInd;        
      
      filterByDisc ? hasDisc = this.hasSelectedDisc(this.projects[i]) : hasDisc = true;
      filterByInd ? hasInd = this.hasSelectedInd(this.projects[i]) : hasInd = true;

      this.projects[i]._show = hasDisc && hasInd;
    }
    this.refreshOptionsStatus();
  }

  panelToggled(e: any, disc: boolean){
    disc ? this.panelOpen.disc = e : this.panelOpen.ind = e;
  }

  private hasSelectedDisc(p:Project){
    let has = false;
    p.disciplines.forEach(d => {
      if (!has) has = d.name[0].quote === this.filters.discipline;      
      if (has) return true;
    });
    return has;
  }

  private hasSelectedInd(p:Project){
    let has = false;
    p.industries.forEach(d => {
      if (!has) has = d.name[0].quote === this.filters.industry;      
      if (has) return true;
    });
    return has;
  }

  private setCombinations(){
    if (this.projects.length > 0 && this.industries.length > 0 && this.disciplines.length > 0){
      this.indCombinationChecker = [];
      this.discCombinationChecker = [];
      this.setIndCombinations();
      this.setDiscCombinations();
      this.refreshOptionsStatus();
    }
  }

  private setIndCombinations(){
    this.indCombinationChecker = [];
    this.industries.forEach(i => {
      let disciplines = [];
      let disciplinesNames = [];
      this.projects.forEach(p => {
        p.industries.forEach(pi => {
          if (pi.name[0].quote === i.name[0].quote) {
            disciplines = disciplines.concat(p.disciplines);
          }
        });
      });
      
      disciplines.forEach(d => disciplinesNames.push(d.name[0].quote) );
      disciplinesNames = [... new Set(disciplinesNames)]; //Filter repeated elements

      this.indCombinationChecker.push({industry: i.name[0].quote, combinations: disciplinesNames})
    });
  }

  private setDiscCombinations(){
    this.discCombinationChecker = [];

    this.disciplines.forEach(d => {
      let industries = [];
      let industriesNames = [];
      this.projects.forEach(p => {
        p.disciplines.forEach(pi => {
          if (pi.name[0].quote === d.name[0].quote) {
            industries = industries.concat(p.industries);
          }
        });
      });

      industries.forEach(d => industriesNames.push(d.name[0].quote) );
      industriesNames = [... new Set(industriesNames)]; //Filter repeated elements

      this.discCombinationChecker.push({discipline: d.name[0].quote, combinations: industriesNames})
    });
  }

  private refreshOptionsStatus(){
    this.industries.forEach(i => {
      if(this.filters.discipline){
        let comb = this.indCombinationChecker.find(iCC => iCC.industry === i.name[0].quote);      
        const hasComb = comb.combinations.find(c => c === this.filters.discipline); 
        i.hasCombinations = hasComb != null;
      } else {
        i.hasCombinations = true;
      }
    });
    
    this.disciplines.forEach(d => {
      if(this.filters.industry){
        let comb = this.discCombinationChecker.find(dCC => dCC.discipline === d.name[0].quote);        
        const hasComb = comb.combinations.find(c => c === this.filters.industry); 
        d.hasCombinations = hasComb != null;
      } else {
        d.hasCombinations = true;
      }
      });
  }

  selectDiscFilter(p: any){
    this.filters.discipline = p.value;
    this.refreshShow();
  }
  
  selectIndFilter(p: any){
    this.filters.industry = p.value;
    this.refreshShow();
  }

}
