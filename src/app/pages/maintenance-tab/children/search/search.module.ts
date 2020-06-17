import { AppModule } from './../../../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { SharedComponentModule } from 'src/app/pages/shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [SearchPage, SearchCardComponent]
})
export class SearchPageModule { }
