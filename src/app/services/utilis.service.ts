import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilisService {

  constructor(private toastController: ToastController) { }


  async showToast(option: { header: any; message: any; position: any; duration: any; cssClass: any; }) {
    const toast = await this.toastController.create({
      header: option.header,
      message: option.message,
      position: option.position,
      duration: option.duration,
      cssClass: option.cssClass
    }).then((obj) => obj.present());
  }

}
