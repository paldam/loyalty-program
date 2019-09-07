import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {ModuleWithProviders} from '@angular/core';
import {ProductPickerComponent} from './product-picker/product-picker.component';


const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '', component: ProductPickerComponent, canActivate: [AuthGuard]}


];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});


