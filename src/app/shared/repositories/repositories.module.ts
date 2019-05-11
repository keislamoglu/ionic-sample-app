import {NgModule} from '@angular/core';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
    imports: [
        IonicStorageModule.forRoot({
            name: '__uzlastrdb',
            driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage'],
        })
    ]
})
export class RepositoriesModule {
}
