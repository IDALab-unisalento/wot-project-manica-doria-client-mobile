import { map } from 'rxjs/operators';
import { Beacon } from '../models/beacon';
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

  findBeacon() {

    /*setTimeout(() => {
      console.log('stopScan From Timeout');
    }, 10000);
     */

    return this.ble.startScan([]);
      /*
          console.log('device');
          if (device.name === name || device.id === mac) {
            if (device.rssi > -80) {
              console.log('Stopped perchè trovato');
              //this.ble.stopScan();
              //return device;
            }
          }
        })
    );*/
  }

  stopScanBeacon() {
      return this.ble.stopScan();
  }
}
