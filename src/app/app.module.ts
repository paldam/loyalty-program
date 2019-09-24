import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from './main-app-component/app.component';
import {
    ErrorStateMatcher,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    ShowOnDirtyErrorStateMatcher
} from '@angular/material';
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
import {SliderModule} from 'primeng/slider';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {routing} from './app.routing';
import {DialogModule, MessageService, OverlayPanelModule, PanelModule, ProgressSpinnerModule, SpinnerModule} from 'primeng/primeng';
import {MessageServiceExt} from './messages/messageServiceExt';
import {ToastModule} from 'primeng/toast';
import {MainmanuComponent} from './mainmanu/mainmanu.component';



@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
    ProductPickerComponent,
      MainmanuComponent
  ],
  imports: [
      routing,
    BrowserModule,
      HttpClientModule,
      MatStepperModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      CardModule,
      SliderModule,
    ButtonModule,
      ProgressSpinnerModule,
      OverlayPanelModule,
      DialogModule,
      PanelModule,
      ToastModule,
      SpinnerModule

  ],
  providers: [
       {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
      {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
      RoutingState,SpinerService,PrizeService,AuthenticationService,AuthGuard,MessageServiceExt,MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
