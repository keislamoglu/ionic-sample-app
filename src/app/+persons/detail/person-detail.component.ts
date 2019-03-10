import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ModalService, PersonService} from '../../shared/services';
import {Person} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {PersonEditModalComponent} from '../edit/person-edit-modal.component';
import {PetitionEditModalComponent} from '../../+petitions/edit/petition-edit-modal.component';

@Component({
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {
    id: string;
    caseFileId: string;
    person: Person;

    constructor(private _route: ActivatedRoute,
                private _personService: PersonService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this.caseFileId = this._route.snapshot.paramMap.get('caseFileId');
        this._loadData();
    }

    navToPetitions() {
        let url = this.caseFileId ? `/case-files/${this.caseFileId}` : '';
        url += `/persons/${this.person.id}/petitions`;

        this._navController.navigateForward(url);
    }

    newPetition() {
        this._modalService.present(PetitionEditModalComponent, {
            claimentId: this.id,
            caseFileId: this.caseFileId,
        });
    }

    async edit() {
        const modal = await this._modalService.present(PersonEditModalComponent, {id: this.id});
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
        this._loadData();
    }

    private _loadData() {
        this._personService.get(this.id)
            .subscribe(person => this.person = person);
    }

    private _fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
