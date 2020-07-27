import { WsService } from './../../../../services/ws.service';
import { DataSharingService } from './../../../../services/data-sharing.service';
import { Component, OnInit } from '@angular/core';
import { Zone } from '../../../../models/zone';
import { Beacon } from '../../../../models/beacon';
import { ActivatedRoute, Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';
import { UtilisService } from '../../../../services/utilis.service';
import { BleService } from '../../../../services/ble.service';
import { StorageService } from '../../../../services/storage.service';
import { ZoneService } from '../../../../services/zone.service';
import { UserMaintenance } from '../../../../models/user-maintenance';
import { UserMaintenanceService } from '../../../../services/user-maintenance.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
})
export class SearchCardComponent implements OnInit {

  title: string;
  subtitle: string;

  titleToolbar = 'Ricerca Beacon';

  result = {
    found: false,
    retry: false,
  };

  resultCheck = {
    found: false,
    retry: false,
  };

  check: boolean;

  zoneList: Zone[];

  // @Output() showMenu: EventEmitter<boolean>;

  userMaintenance: UserMaintenance[];
  userMaintenanceLength: number;
  beacon: Beacon;

  constructor(
    private userMaintenanceService: UserMaintenanceService,
    private route: ActivatedRoute,
    private ble: BLE,
    private router: Router,
    private utils: UtilisService,
    private bleService: BleService,
    private storageService: StorageService,
    private zoneService: ZoneService,
    private dataSharing: DataSharingService,
    private ws: WsService
  ) {

    route.params.subscribe(val => {

      this.result = {
        found: false,
        retry: false,
      };

      this.storageService.getId().then(data => {
        this.getMaintenanceByStatusAndUser(data);
      });
    });
  }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    }).then(() => {
      this.ws.connect(this.userMaintenance[0].maintenance.id);
    });

  }

  getMaintenanceByStatusAndUser(id: string) {
    this.userMaintenanceService.getMaintenanceByStatusAndUser('in-progress', id)
      .subscribe(
        data => {
          this.userMaintenance = data;
          this.userMaintenanceLength = data.length;
          this.dataSharing.setCurrentMaintenance(this.userMaintenance[0]);

          if (this.userMaintenanceLength === 0) {
            this.title = 'Non hai Manutenzioni Attive';
            this.subtitle = 'Accedi alle liste Manutenzioni';
          } else {
            this.title = this.userMaintenance[0].maintenance.name;
            this.subtitle = 'Avvicinati al Macchinario';
          }
          // console.log('MMMMM', this.userMaintenance[0].id);
          this.getZoneByIdMachine(this.userMaintenance[0].maintenance.machine.id);
        },
        err => {
          // console.log(err);
          // console.log(this.userMaintenance);
        });
  }

  getZoneByIdMachine(id: number) {
    this.zoneService.getAllZoneByMachineId(id).subscribe(data => {
      this.zoneList = data;
      // console.log('ZONAAAAAA', this.zoneList);
      this.beacon = this.zoneList[0].beacon;
      // console.log('B', this.beacon);
      this.checkBeacon();
      // console.log('dopo dopo', this.result.found);
    });
  }

  async checkBeacon() {
    if (this.userMaintenanceLength !== 0) {
      // console.log('Sto cercando questo');
      // console.log(this.beacon);
      // console.log('prima', this.result.found);
      this.bleService.findBeacon(this.beacon.name, this.beacon.mac).subscribe(
        data => { this.result = data; }
      );
      // console.log('dopo', this.result.found);
    }
  }

  goMaintenaceList() {
    this.router.navigate(['/tabs/maintenance-list-tab'], { relativeTo: this.route.parent });
  }

  goAvvia() {
    this.bleService.findBeaconCheck(this.beacon.name, this.beacon.mac).subscribe(
      data => {
        this.check = data;
        // console.log('DENTRO PROMISE', this.check);
        if (this.check) {
          this.router.navigate(['/tabs/maintenance-tab/step-list'], { relativeTo: this.route.parent });
        }
      });
  }

  async retrySearchBeacon() {
    this.result.retry = false;
    // console.log('RETRY');
    await this.checkBeacon();
  }
}
