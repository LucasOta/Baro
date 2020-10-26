import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FileService } from 'src/app/core/http/file/file.service';
import { Image } from 'src/app/shared/models/image';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {
  @Input() imgPickerConfig: ImgPickerConfig;
  @ViewChild('inputFile') inputFile: ElementRef;

  private maxImgs = 0;

  constructor( private fileService: FileService ) { }

  ngOnInit(): void {
  }

  onSelectFile(e){
    const tempImg = new Image();
    this.imgPickerConfig.imgsChanged = true;

    if (e.target.files) {      
      tempImg.name = e.target.files[0].name; 
      tempImg.type = e.target.files[0].type; 
      tempImg.size = this.readableBytes(e.target.files[0].size).toString();
      tempImg.justUploaded = true;

      this.fileService.uploadFile(e.target.files[0], this.imgPickerConfig.prefix).subscribe(res=>{
        tempImg.name = res.file.name; 
        
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          tempImg.url = event.target.result;
          
          this.imgPickerConfig.imgs.push(tempImg);
          
        }

      })
    }
  }

  // TODO: not allow to upload the same img name twice
  trackByFn(index, item) {    
    return item.name; // unique id corresponding to the item
  }

  uploadFile(){
    this.inputFile.nativeElement.click();
  }

  deleteImg(img: Image){
    this.imgPickerConfig.imgsChanged = true;

    this.imgPickerConfig.imgs = this.imgPickerConfig.imgs.filter(i => i.name != img.name );
    if (img.justUploaded) {
      this.fileService.deleteTemp(img.name).subscribe(res=>{});
    } else {
      // We must not delete the image now in case the user wants to discard the changes,
      // the backend will delete the imgs when the class is updated.    
    }
  }

  readableBytes(bytes: number) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    // @ts-ignore
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
  }  

}

export class ImgPickerConfig extends FormModuleConfig{
  maxImgs: number = -1;
  moduleNameFrom:string;
  elementIdFrom: string;
  prefix: string = '';
  imgs: Image[] = [];
  imgsChanged = false;
   
  deleteTemps = function (fileService: FileService){
    this.imgs.forEach(img => {
      if (img.justUploaded) {
        fileService.deleteTemp(img.name).subscribe(res=>{});
      }     
    });
  }
  
}
