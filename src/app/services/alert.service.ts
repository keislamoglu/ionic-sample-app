import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {AlertController} from '@ionic/angular';

interface ConfirmOptions {
    title: string;
    message: string;
    ok: {
        text: string;
        handler?: () => void
    };
    cancel: {
        text: string;
        handler?: () => void
    };
}

@Injectable({providedIn: ServicesModule})
export class AlertService {
    constructor(private alertController: AlertController) {
    }

    async confirm(opts: ConfirmOptions) {
        const alert = await this.alertController.create({
            header: opts.title,
            message: opts.message,
            buttons: [
                {
                    text: opts.cancel.text,
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: opts.cancel.handler
                }, {
                    text: opts.ok.text,
                    handler: opts.ok.handler
                }
            ]
        });

        await alert.present();
    }
}
