import {Component, OnInit} from '@angular/core';
import {PersonEditModalComponent} from './edit/person-edit-modal.component';
import {Person} from '../shared/entity';
import {ModalService} from '../shared/services';
import {NavController} from '@ionic/angular';
import {PersonService} from '../shared/repositories';
import {fullName} from '../shared/helpers/person';

@Component({
    templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit {
    persons: Person[] = [];

    constructor(private _personService: PersonService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this._loadData();
    }

    async create() {
        const modal = await this._modalService.present(PersonEditModalComponent);
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData(refreshEvent?) {
        this._personService.getAll()
            .subscribe(persons => {
                this.persons = persons;
                if (refreshEvent) {
                    refreshEvent.target.complete();
                }
            });
    }

    private _fullName(person: Person) {
        return fullName(person);
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/persons/${id}`);
    }
}
