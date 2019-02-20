import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalOptions} from '@ionic/core';
import {PersonModalComponent} from './person/person-modal.component';
import {Person} from '../shared/entity';
import {PersonService} from '../shared/services';

@Component({
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
    persons: Person[] = [];

    constructor(private _personService: PersonService,
                private _modalController: ModalController) {
    }

    ngOnInit(): void {
        this._personService.getAll()
            .subscribe(persons => this.persons = persons);
    }

    create() {
        this.presentModal();
    }

    edit(id: string) {
        this.presentModal(id);
    }

    private async presentModal(id?: string) {
        const opts: ModalOptions = {
            component: PersonModalComponent,
            componentProps: id ? {id} : void 0,
        };
        const modal = await this._modalController.create(opts);
        return await modal.present();
    }

    private _fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
