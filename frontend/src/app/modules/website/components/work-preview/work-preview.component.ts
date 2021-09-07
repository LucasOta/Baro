import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-work-preview',
  templateUrl: './work-preview.component.html',
  styleUrls: ['./work-preview.component.css'],
})
export class WorkPreviewComponent {
  @Input() project: Project;

  constructor(private router: Router) {}

  view() {
    this.router.navigate(['/view', this.project._id]);
  }
}
