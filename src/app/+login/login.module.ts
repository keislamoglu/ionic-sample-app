import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent,
        LoginRoutingModule
    ]
})
export class LoginModule {
}
