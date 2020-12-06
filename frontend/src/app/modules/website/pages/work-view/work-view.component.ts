import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.css']
})
export class WorkViewComponent implements OnInit {
  id: any;
  project: Project;
  otherProjects: Project[];

  constructor( private projectService: ProjectService, private route: ActivatedRoute ) {
    this.id= this.route.snapshot.paramMap.get("id");
   }

  //  TODO: re-render on click on another project

  ngOnInit(): void {
    this.projectService.get(false, this.id).subscribe((res)=>{
      this.project = res.projects;
    });
    this.projectService.get().subscribe((res)=>{
      this.otherProjects = res.projects;
    });
  }

}
