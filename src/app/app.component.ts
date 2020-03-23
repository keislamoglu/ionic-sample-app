import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Storage} from '@ionic/storage';
import {ClientUser} from './shared/entity';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // TODO: remove below statement
            const user: ClientUser = {
                id: '900928a1-49e8-4cc3-b56a-296d44cad2aa',
                identificationNo: '123123123',
                name: 'FirstName',
                lastName: 'Lastname',
                email: 'user@domain.com',
                phone: '05001234567',
                address: 'Istanbul',
                registrationNo: '78903245',
                subscriptionStatus: 1,
                subscriptionDate: 'Thu May 16 2019 22:14:15 GMT+0300 (GMT+03:00)'
            };
            this.storage.set('user', user);
        });
    }
}
