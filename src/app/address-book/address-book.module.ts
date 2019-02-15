import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddressBookRoutingModule, RouteComponents } from './address-book.routing';

@NgModule({
  imports: [
    AddressBookRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [RouteComponents]
})
export class AddressBookPageModule { }
