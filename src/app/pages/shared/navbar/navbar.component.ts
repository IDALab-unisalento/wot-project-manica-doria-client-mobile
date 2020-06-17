import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }

}
