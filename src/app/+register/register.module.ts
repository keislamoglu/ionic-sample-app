import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        FormsModule,
        RegisterRoutingModule,
    ],
    declarations: [
        RegisterComponent
    ],
    exports: [
        RegisterComponent,
        RegisterRoutingModule
    ]
})
export class RegisterModule {
}
