import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-home-work-preview',
  templateUrl: './home-work-preview.component.html',
  styleUrls: ['./home-work-preview.component.css']
})
export class HomeWorkPreviewComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
