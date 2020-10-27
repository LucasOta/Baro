import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-work-preview',
  templateUrl: './work-preview.component.html',
  styleUrls: ['./work-preview.component.css']
})
export class WorkPreviewComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
