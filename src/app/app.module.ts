import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CaseFilesModule} from './+case-files/case-files.module';
import {PersonsModule} from './+persons/persons.module';
import {PetitionsModule} from './+petitions/petitions.module';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {PartiesModule} from './+parties/parties.module';
import {ExtensionTimesModule} from './+extension-times/extension-times.module';
import {MenuModule} from './menu/menu.module';
import {LoginModule} from './+login/login.module';
import {RegisterModule} from './+register/register.module';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        IonicStorageModule.forRoot({
            name: 'uzlastrstorage',
            driverOrder: ['localstorage']
        }),
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        CaseFilesModule,
        PersonsModule,
        PetitionsModule,
        PartiesModule,
        ExtensionTimesModule,
        MenuModule,
        LoginModule,
        RegisterModule,
    ],
    providers: [
        File,
        FileOpener,
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
