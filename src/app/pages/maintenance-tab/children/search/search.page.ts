import { Beacon } from '../../../../models/beacon';
import {Component, OnInit} from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { StorageService } from '../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisService} from '../../../../services/utilis.service';
import {BleService} from '../../../../services/ble.service';
import {ZoneService} from '../../../../services/zone.service';
import {Zone} from '../../../../models/zone';
import {BLE} from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    title: string;
    subtitle: string;

    titleToolbar = 'Ricerca Beacon';

    found: boolean;
    enable = false;

    zoneList: Zone[];

    // @Output() showMenu: EventEmitter<boolean>;

    maintenance: Maintenance[];
    maintenanceLength: number;
    beacon: Beacon;

    constructor(private maintenanceService: MaintenanceService,
                private route: ActivatedRoute,
                private ble: BLE,
                private router: Router,
                private utils: UtilisService, private bleService: BleService,
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
        console.log('Enable prima', this.enable);
        if (this.maintenanceLength !== 0) {
            console.log('Sto cercando questo');
            console.log(this.beacon);
            /*await this.bleService.findBeacon().subscribe(device => {
                if (device.name === this.beacon.name || device.id === this.beacon.mac) {
                    if (device.rssi > -80) {
                        console.log('Stopped perchè trovato');
                        this.stopScanCheck().then(data => {
                            console.log('DATA:', data);
                        });
                        //return device;
                    }
                }
            });*/
        }
        console.log('Enable dopo', this.enable);
    }

    async stopScanCheck() {
        await this.bleService.stopScanBeacon().then(deviceFound => {
            console.log('BLE', deviceFound);
            this.enable = true;
        });
    }

    goMaintenaceList() {
        this.router.navigate(['/tabs/maintenance-list-tab'], { relativeTo: this.route.parent });
    }
    goAvvia() {
        this.router.navigate(['step-list'], { relativeTo: this.route.parent.parent });
    }



}
