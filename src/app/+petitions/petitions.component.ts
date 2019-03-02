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
    personId: string;
    petitions: Petition[] = [];

    constructor(private _route: ActivatedRoute,
                private _petitionService: PetitionService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.personId = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`petitions/${id}`);
    }

    async create() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {claimentId: this.personId});
        await modal.onWillDismiss();
        this._loadData();
    }

    async edit(id: string) {
        const modal = await this._modalService.present(PetitionEditModalComponent, {id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._petitionService.getByPerson(this.personId)
            .subscribe(petitions => this.petitions = petitions);
    }
}
