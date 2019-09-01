import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './main-app-component/app.component';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RoutingState} from './routing-stage';
import {SpinerService} from './spiner.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { ProductPickerComponent } from './product-picker/product-picker.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PrizeService} from './product-picker/prize-service';
import {TokenInterceptor} from './token.interceptor';
import {AuthenticationService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductPickerComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
    AppRoutingModule,
      MatStepperModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      CardModule,
    ButtonModule
  ],
  providers: [
       {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
      RoutingState,SpinerService,PrizeService,AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
