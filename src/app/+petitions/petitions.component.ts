import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalOptions} from '@ionic/core';
import {Petition} from '../entity/petition';
import {PetitionService} from '../services';
import {PetitionModalComponent} from './petition/petition-modal.component';

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
        this.presentModal();
    }

    edit(id: string) {
        this.presentModal(id);
    }

    private async presentModal(id?: string) {
        const opts: ModalOptions = {
            component: PetitionModalComponent,
            componentProps: id ? {id} : void 0,
        };
        const modal = await this._modalController.create(opts);
        return await modal.present();
    }
}
