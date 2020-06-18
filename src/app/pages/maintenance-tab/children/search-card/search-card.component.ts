import { Component, OnInit } from '@angular/core';
import {Zone} from '../../../../models/zone';
import {Maintenance} from '../../../../models/maintenance';
import {Beacon} from '../../../../models/beacon';
import {MaintenanceService} from '../../../../services/maintenance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BLE} from '@ionic-native/ble/ngx';
import {UtilisService} from '../../../../services/utilis.service';
import {BleService} from '../../../../services/ble.service';
import {StorageService} from '../../../../services/storage.service';
import {ZoneService} from '../../../../services/zone.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
})
export class SearchCardComponent implements OnInit {

  title: string;
  subtitle: string;

  titleToolbar = 'Ricerca Beacon';

  found: boolean;
  result = {
    found: false,
    retry: false,
  };

  zoneList: Zone[];

  // @Output() showMenu: EventEmitter<boolean>;

  maintenance: Maintenance[];
  maintenanceLength: number;
  beacon: Beacon;

  constructor(private maintenanceService: MaintenanceService,
              private route: ActivatedRoute,
              private ble: BLE,
              private router: Router,
              private utils: UtilisService,
              private bleService: BleService,
              private storageService: StorageService,
              private zoneService: ZoneService) { }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    });
  }

  async getMaintenanceByStatusAndUser(id: string) {
    await this.maintenanceService.getMaintenanceByStatusAndUser('started', id)
        .subscribe(
            data => {
              console.log('Maintenance By Status And User: ', data);
              this.maintenance = data;
              this.maintenanceLength = data.length;

              this.getZoneByIdMachine(this.maintenance[0].id);

              if (this.maintenanceLength === 0) {
                this.title = 'Non hai Manutenzioni Attive';
                this.subtitle = 'Accedi alle liste Manutenzioni';
              } else {
                this.title = this.maintenance[0].name;
                this.subtitle = 'Avvicinati al Macchinario';
              }
            },
            err => {
              console.log(err);
              console.log(this.maintenance);
            });
  }

  async getZoneByIdMachine(id: number) {
    await this.zoneService.getAllZoneByMachineId(id).subscribe(data => {
      this.zoneList = data;
      this.beacon = this.zoneList[0].beacon;
      console.log('B', this.beacon);
      this.checkBeacon();
    });
  }

  async checkBeacon() {
    if (this.maintenanceLength !== 0) {
      console.log('Sto cercando questo');
      console.log(this.beacon);
      // tslint:disable-next-line:no-unused-expression
      this.result = await this.bleService.findBeacon(this.beacon.name, this.beacon.mac);
    }
  }

  goMaintenaceList() {
    this.router.navigate(['/tabs/maintenance-list-tab'], { relativeTo: this.route.parent });
  }
  goAvvia() {
    this.router.navigate(['/tabs/maintenance-tab/step-list'], { relativeTo: this.route.parent });
  }

  retrySearchBeacon() {
    this.result.retry = false;
    console.log('RETRY');
    this.checkBeacon();
  }
}
