import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { CameraPreview } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'preview-modal',
  templateUrl: 'build/components/preview-modal/preview-modal.html'
})
export class PreviewModal {
  private hasImage: boolean = false;

  constructor(public platform: Platform,
    public viewCtrl: ViewController) {}

  ngAfterViewInit() {
    this.init();
  }

  init(){
    var _this = this;
    cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result){
      var data;
      _this.toDataUrl(result[0], (result)=>{
         (<HTMLImageElement>document.getElementById('originalPicture')).src = result; //originalPicturePath;
      });
    });

    var tapEnabled = false; //enable tap take picture
    var dragEnabled = false; //enable preview box drag across the screen
    var toBack = false; //send preview box to the back of the webview
    var rect = {x: 0, y: 100, width: this.platform.width(), height:this.platform.width()};

    cordova.plugins.camerapreview.startCamera(rect, "back", tapEnabled, dragEnabled);

    cordova.plugins.camerapreview.show();
  }


  takePicture(){
    cordova.plugins.camerapreview.hide();
    cordova.plugins.camerapreview.takePicture({maxWidth: 1000, maxHeight: 1000});
    this.hasImage = true;
  }

  ionViewWillLeave(){
    cordova.plugins.camerapreview.hide();
    this.hasImage = true;
  }

  closeModal(){
    this.viewCtrl.dismiss((<HTMLImageElement>document.getElementById('originalPicture')).src);
  }

  //File Url을 가져와서 데이터 형태로 바꿈
  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }
}
