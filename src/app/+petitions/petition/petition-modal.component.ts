import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PersonService} from '../../services';
import {Person} from '../../entity/person';

@Component({
    templateUrl: './petition-modal.component.html',
    styleUrls: ['./petition-modal.component.scss']
})
export class PetitionModalComponent implements OnInit {
    persons: Person[] = [];

    constructor(private _modalController: ModalController,
                private _personService: PersonService) {
    }

    ngOnInit(): void {
        this._personService.getAll()
            .subscribe(persons => this.persons = persons);
    }

    dismiss(): void {
        this._modalController.dismiss();
    }
}
