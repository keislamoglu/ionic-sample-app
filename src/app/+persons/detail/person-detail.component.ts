import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {PersonService} from '../../shared/services';
import {Person} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {PersonEditModalComponent} from '../edit/person-edit-modal.component';
import {ModalService} from '../../shared/services/modal.service';
import {PetitionEditModalComponent} from '../../+petitions/edit/petition-edit-modal.component';

@Component({
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {
    id: string;
    person: Person;

    constructor(private _route: ActivatedRoute,
                private _personService: PersonService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    navToPetitions() {
        this._navController.navigateForward(`/persons/${this.person.id}/petitions`);
    }

    newPetition() {
        this._modalService.present(PetitionEditModalComponent, {claimentId: this.person.id});
    }

    async edit() {
        const modal = await this._modalService.present(PersonEditModalComponent, {id: this.id});
        await modal.onWillDismiss();
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
