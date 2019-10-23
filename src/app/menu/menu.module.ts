import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {MenuComponent} from './menu.component';

@NgModule({
    imports: [IonicModule],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})
export class MenuModule {
}
