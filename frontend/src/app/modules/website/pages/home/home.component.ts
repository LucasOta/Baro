import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  brandingForOptions = [
    'getting the right customers',
    'outperforming your competition',
    'growing in the right direction',
    'making your future clearer',
    'finding your company’s voice',
    'getting results',
    'inspiring your team',
  ];

  constructor(
    private projectService: ProjectService,
    private translate: TranslateService
  ) {}

  get isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }

  ngOnInit(): void {
    this.projectService.getAllWebsite(true).subscribe((res) => {
      this.projects = res.projects;
    });
  }
}
