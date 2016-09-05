import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PreviewModal } from '../../components/preview-modal/preview-modal';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  imgData: string = 'img/icon.png';

  constructor(public modalCtrl: ModalController) {
  }

  openModal() {
    let modal = this.modalCtrl.create(PreviewModal);
    modal.onDidDismiss(data => {
      this.imgData = data;
    });
    modal.present();
  }

}
