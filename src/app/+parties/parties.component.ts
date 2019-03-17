import {Component, OnInit} from '@angular/core';
import {ModalService, PartyService} from '../shared/services';
import {Party} from '../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, NavController} from '@ionic/angular';
import {PartyEditModalComponent} from './edit/party-edit-modal.component';
import {PersonEditModalComponent} from '../+persons/edit/person-edit-modal.component';

@Component({
    templateUrl: './parties.component.html'
})
export class PartiesComponent implements OnInit {
    caseFileId: string;
    parties: Party[] = [];

    constructor(private _route: ActivatedRoute,
                private _modalService: ModalService,
                private _partyService: PartyService,
                private _actionSheetController: ActionSheetController,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.caseFileId = this._route.snapshot.paramMap.get('caseFileId');
        this._loadData();
    }

    async create() {
        const actionSheet = await this._actionSheetController.create({
            header: 'Taraf Ekle',
            buttons: [
                {
                    text: 'Varolan kişiyle',
                    handler: () => {
                        this.createUsingExistingPerson();
                    }
                },
                {
                    text: 'Yeni kişi oluşturarak',
                    handler: () => {
                        this.createWithNewPerson();
                    }
                },
                {
                    text: 'Vazgeç',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    async createWithNewPerson() {
        const modal = await this._modalService.present(PersonEditModalComponent);
        const res = await modal.onWillDismiss();
        if (!res.data.cancelled && res.data.id) {
            this.createUsingExistingPerson(res.data.id);
        }
    }

    async createUsingExistingPerson(personId?: string) {
        const modal = await this._modalService.present(PartyEditModalComponent, {
            caseFileId: this.caseFileId,
            personId: personId
        });
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._partyService.getByCaseFile(this.caseFileId)
            .subscribe(parties => this.parties = parties);
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/parties/${id}`);
    }
}
