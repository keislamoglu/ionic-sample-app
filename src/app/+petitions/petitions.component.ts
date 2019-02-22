import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalOptions} from '@ionic/core';
import {PetitionModalComponent} from './petition/petition-modal.component';
import {Petition} from '../shared/entity';
import {PetitionService} from '../shared/services';
import {PetitionPreviewComponent} from "./preview/petition-preview.component";

@Component({
    templateUrl: './petitions.component.html',
    styleUrls: ['./petitions.component.scss']
})
export class PetitionsComponent implements OnInit {
    petitions: Petition[] = [];

    constructor(private _petitionService: PetitionService,
                private _modalController: ModalController) {
    }

    ngOnInit(): void {
        this._petitionService.getAll()
            .subscribe(petitions => this.petitions = petitions);
    }

    create() {
        this.presentModal(PetitionModalComponent);
    }

    edit(id: string) {
        this.presentModal(PetitionModalComponent, {id});
    }

    preview(id: string) {
        this.presentModal(PetitionPreviewComponent, {id});
    }

    private async presentModal(component: any, props?: any) {
        const opts: ModalOptions = {
            component,
            componentProps: props,
        };
        const modal = await this._modalController.create(opts);
        return await modal.present();
    }
}
