import {Component, OnInit} from '@angular/core';
import {PersonEditModalComponent} from './edit/person-edit-modal.component';
import {Person} from '../shared/entity';
import {ModalService, PersonService} from '../shared/services';
import {NavController} from '@ionic/angular';

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

    private _loadData() {
        this._personService.getAll()
            .subscribe(persons => this.persons = persons);
    }

    private _fullName(person: Person) {
        return PersonService.FullName(person);
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/persons/${id}`);
    }
}
