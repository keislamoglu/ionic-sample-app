import {Component, OnInit} from '@angular/core';
import {ModalService} from '../shared/services/modal.service';
import {Party} from '../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {PartyService} from '../shared/services';
import {NavController} from '@ionic/angular';
import {PartyEditModalComponent} from './edit/party-edit-modal.component';

@Component({
    templateUrl: './parties.component.html'
})
export class PartiesComponent implements OnInit {
    caseFileId: string;
    parties: Party[] = [];

    constructor(private _route: ActivatedRoute,
                private _modalService: ModalService,
                private _partyService: PartyService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.caseFileId = this._route.snapshot.paramMap.get('caseFileId');
        this._loadData();
    }

    async create() {
        const modal = await this._modalService.present(PartyEditModalComponent, {
            caseFileId: this.caseFileId
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
