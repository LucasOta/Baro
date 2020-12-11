import { Component, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-website',
  template:
    `<app-navbar></app-navbar>

    <div class="dk-main">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer>`,
    
    styleUrls: ['./website.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WebsiteComponent implements OnInit {
  scripts = [
    'vendor/jquery-form/dist/jquery.form.min.js',
    'vendor/object-fit-images/dist/ofi.min.js',
    'vendor/popper.js/dist/umd/popper.min.js',
    'vendor/tether/dist/js/tether.min.js',
    'vendor/bootstrap/dist/js/bootstrap.min.js',
    'vendor/sticky-kit/dist/sticky-kit.min.js',
    'vendor/jarallax/dist/jarallax.min.js',
    'vendor/jarallax/dist/jarallax-video.min.js',
    'vendor/isotope-layout/dist/isotope.pkgd.min.js',
    'vendor/imagesloaded/imagesloaded.pkgd.min.js',
    'vendor/lightgallery/dist/js/lightgallery.min.js',
    'vendor/lg-fullscreen/dist/lg-fullscreen.min.js',
    'vendor/lg-video/dist/lg-video.min.js',
    'vendor/swiper/dist/js/swiper.min.js',
    'js/mimilism.js',
    'js/mimilism-init.js',
  ]
  constructor(
    private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit(): void {
    this.scripts.forEach(route => {      
      let scriptElt = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptElt, 'type', 'text/javascript');
      this.renderer.setAttribute(scriptElt, 'src', `assets/mimilism/${route}`);
      this.renderer.appendChild(this.document.body, scriptElt);
    });
  }

}
