import {NgModule} from '@angular/core';
import {CardBodyComponent} from './card-body';
import {CardHeaderComponent} from './card-header';
import {CardComponent} from './card.component';
import {CardTitleComponent} from './card-title';
import {CardSubtitleComponent} from './card-subtitle';

@NgModule({
    declarations: [
        CardBodyComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardComponent,
    ],
    exports: [
        CardComponent,
        CardBodyComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardHeaderComponent,
    ]
})
export class CardModule {
}
