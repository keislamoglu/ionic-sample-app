import {Component, OnInit} from '@angular/core';
import {PetitionEditModalComponent} from './edit/petition-edit-modal.component';
import {Petition} from '../shared/entity';
import {PetitionService} from '../shared/services';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../shared/services/modal.service';
import {NavController} from '@ionic/angular';

@Component({
    templateUrl: './petitions.component.html',
})
export class PetitionsComponent implements OnInit {
    partyId: string;
    petitions: Petition[] = [];

    constructor(private _route: ActivatedRoute,
                private _modalService: ModalService,
                private _petitionService: PetitionService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.partyId = this._route.snapshot.paramMap.get('partyId');
        this._loadData();
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/petitions/${id}`);
    }

    async create() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {
            partyId: this.partyId,
        });
        await modal.onWillDismiss();
        this._loadData();
    }

    async edit(id: string) {
        const modal = await this._modalService.present(PetitionEditModalComponent, {id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._petitionService.getByParty(this.partyId)
            .subscribe(petitions => this.petitions = petitions);
    }
}
