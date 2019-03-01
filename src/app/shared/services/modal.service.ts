import {ModalController} from '@ionic/angular';
import {ModalOptions} from '@ionic/core';
import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';

@Injectable({providedIn: ServicesModule})
export class ModalService {
    constructor(private _modalController: ModalController) {
    }

    async present(component: any, props?: any): Promise<HTMLIonModalElement> {
        const opts: ModalOptions = {
            component: component,
            componentProps: props,
        };
        const modal = await this._modalController.create(opts);
        modal.present();
        return modal;
    }
}
