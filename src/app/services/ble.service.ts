import {map, tap} from 'rxjs/operators';
import { Beacon } from '../models/beacon';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { UtilisService } from './utilis.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BleService {

  result = {
    found: false,
    retry: false,
  };

  constructor(private ble: BLE, private utils: UtilisService) { }

  findBeacon(name?: string, mac?: string) {

    const timer = setTimeout(() => {
      console.log('stopScan Tempo Scaduto');
      this.result.retry = true;
      this.ble.stopScan();
      this.utils.showToast({
        header: 'Beacon Non Trovato',
        message: 'Non è stato rilevato nessun beacon con quel nome, avvicinati al macchinario',
        duration: 5000,
        position: 'top',
        cssClass: 'toast-danger'
      });
    }, 10000);


    this.ble.startScan([]).subscribe(device => {
      console.log(device);
      if (device.name === name || device.id === mac) {
        if (device.rssi > -80) {
          this.result.found = true;
          console.log('Stop Trovato');
          this.utils.showToast({
            header: 'Beacon Trovato',
            message: device.name,
            duration: 5000,
            position: 'top',
            cssClass: 'toast-success'
          });
          this.ble.stopScan();
          clearTimeout(timer);
        }
      }
    });

    // tslint:disable-next-line:no-unused-expression
    return this.result;
  }

    stopScanBeacon() {
      return this.ble.stopScan();
  }
}
