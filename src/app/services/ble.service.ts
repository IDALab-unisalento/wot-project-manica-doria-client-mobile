import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { UtilisService } from './utilis.service';

@Injectable({
  providedIn: 'root'
})
export class BleService {

  result = {
    found: false,
    retry: false,
  };

  resultForever = {
    found: false,
    retry: false,
  };

  resultCheck: boolean;

  constructor(private ble: BLE, private utils: UtilisService) { }

  async findBeacon(name?: string, mac?: string) {

    setTimeout(() => {
      if (!this.result.found) {
        console.log('stopScan Tempo Scaduto');
        this.result.retry = true;
        this.result.found = false;
        this.ble.stopScan();
        this.utils.showToast({
          header: 'Beacon Non Trovato',
          message: 'Non è stato rilevato nessun beacon con quel nome, avvicinati al macchinario',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-danger'
        });
      } else {
        this.utils.showToast({
          header: 'Beacon Trovato',
          message: name,
          duration: 3000,
          position: 'top',
          cssClass: 'toast-success'
        });
      }
    }, 5000);


    await this.ble.startScan([]).subscribe(device => {
      console.log(device);
      if (device.name === name || device.id === mac) {
        if (device.rssi > -80) {
          this.result.found = true;
          this.result.retry = false;
          console.log('Stop Trovato');
          this.ble.stopScan();
        }
      }
    });

    return this.result;
  }

  async findBeaconForever(name?: string, mac?: string) {

    await this.ble.startScan([]).subscribe(device => {
      console.log(device);
      if (device.name === name || device.id === mac) {
        if (device.rssi > -80) {
          this.resultForever.found = true;
          this.resultForever.retry = false;
          console.log('Stop Trovato');
          this.utils.showToast({
            header: 'Beacon Trovato',
            message: device.name,
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success'
          });
          this.ble.stopScan();
          return this.resultForever;
        }
      }
    });

    return this.resultForever;
  }

  async findBeaconCheck(name?: string, mac?: string) {

    setTimeout(() => {
      if (!this.resultCheck) {
        console.log('stopScan Tempo Scaduto');
        this.resultCheck = false;
        this.ble.stopScan();
        this.utils.showToast({
          header: 'Beacon Non Trovato',
          message: 'Non è stato rilevato nessun beacon con quel nome, avvicinati al macchinario',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-danger'
        });
      }
    }, 1000);


    await this.ble.startScan([]).subscribe(device => {
      console.log(device);
      this.resultCheck = false;
      if (device.name === name || device.id === mac) {
        if (device.rssi > -80) {
          this.resultCheck = true;
          console.log('Stop Trovato Check');
          this.ble.stopScan();
        }
      }
    });

    return this.resultCheck;
  }

  stopScanBeacon() {
    return this.ble.stopScan();
  }
}
