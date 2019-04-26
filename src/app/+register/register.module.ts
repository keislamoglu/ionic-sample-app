import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';

@NgModule({
    imports: [
        IonicModule.forRoot(),
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
