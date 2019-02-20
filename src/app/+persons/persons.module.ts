import {NgModule} from '@angular/core';
import {PersonsComponent} from './persons.component';
import {PersonModalComponent} from './person/person-modal.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../shared/services';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        PersonsComponent,
        PersonModalComponent
    ],
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
    ],
    exports: [PersonsComponent],
    entryComponents: [PersonModalComponent]
})
export class PersonsModule {
}
