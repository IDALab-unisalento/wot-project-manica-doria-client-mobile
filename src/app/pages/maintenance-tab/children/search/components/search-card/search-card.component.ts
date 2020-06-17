import { Beacon } from './../../../../../../models/beacon';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';
import { UtilisService } from 'src/app/services/utilis.service';
import { DataSharingService } from '../../../../../../services/data-sharing.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
})
export class SearchCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() maintenanceLength: number;
  @Input() beacon: Beacon;

  found: boolean;
  enable: boolean;

  constructor(private utils: UtilisService,
              private bleService: BleService,
              private router: Router,
              private route: ActivatedRoute,
              private dataSharing: DataSharingService) { }

  ngOnInit() {
    /*if (this.maintenanceLength !== 0) {
      this.bleService.findBeacon(this.beacon.name, this.beacon.mac).subscribe(
        device => {
          this.utils.showToast({
            header: 'Beacon Trovato',
            message: device.name,
            duration: 5000,
            position: 'top',
            cssClass: 'toast-success'
          });
          this.enable = true;
        });
    }*/
  }

  goMaintenaceList() {
    this.router.navigate(['/tabs/maintenance-list-tab'], { relativeTo: this.route.parent });
  }
  goAvvia() {
    this.router.navigate(['step-list'], { relativeTo: this.route.parent.parent });
  }

}
