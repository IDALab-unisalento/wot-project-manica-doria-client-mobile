import { Beacon } from './../../../../models/beacon';
import { Component, OnInit, Input } from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  title: string;
  subtitle: string;

  // @Output() showMenu: EventEmitter<boolean>;

  maintenance: Maintenance[];
  maintenanceLength: number;
  beacon = {
    id: 1,
    name: 'BlueUp-01-014565',
    mac: '0EF84234-21FB-D572-2A00-410563C6A219'
  };

  constructor(private maintenanceService: MaintenanceService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    });
  }

  getMaintenanceByStatusAndUser(id: string) {
    this.maintenanceService.getMaintenanceByStatusAndUser('started', id)
      .subscribe(
        data => {
          console.log('Maintenance By Status And User: ', data);
          this.maintenance = data;
          this.maintenanceLength = data.length;

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

}
