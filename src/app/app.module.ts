import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MyCartComponent } from './my-cart/my-cart.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CheckoutComponent } from './checkout/checkout.component';
import { MatDialogModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MyCartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents:[CheckoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
