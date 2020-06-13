import { map } from 'rxjs/operators';
import { Beacon } from './../models/beacon';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { UtilisService } from './utilis.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BleService {

  found: Beacon;
  constructor(private ble: BLE, private utils: UtilisService) { }

  findBeacon(name?: string, mac?: string): Observable<Beacon> {

    const timer = setTimeout(() => {
      console.log('stopScan');
      this.ble.stopScan();
      this.utils.showToast({
        header: 'Beacon Non Trovato',
        message: 'Non è stato rilevato nessun beacon con quel nome, avvicinati al macchinario',
        duration: 5000,
        position: 'top',
        cssClass: 'toast-danger'
      });
    }, 5000);

    return this.ble.startScan([]).pipe(
      map(device => {
        if (device.name === name || device.id === mac) {
          if (device.rssi > -80) {
            this.ble.stopScan();
            clearTimeout(timer);
            return device;
          }
        }
      })
    );


  }
}
