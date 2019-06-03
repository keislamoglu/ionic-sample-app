import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
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
