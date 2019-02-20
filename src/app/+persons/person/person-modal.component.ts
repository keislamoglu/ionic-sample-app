import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, PersonService} from '../../shared/services';
import {Person} from '../../shared/entity';

@Component({
    templateUrl: './person-modal.component.html',
    styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent implements OnInit {
    @Input() id: string;
    person: Person | null = null;

    constructor(private _modalController: ModalController,
                private _personService: PersonService,
                private _alertService: AlertService) {
    }


    ngOnInit(): void {
        if (this.id) {
            this.edit(this.id);
            return;
        }
        this.new();
    }

    dismiss() {
        this._reset();
        this._modalController.dismiss();
    }

    new() {
        this.person = new Person();
    }

    edit(id: string) {
        this._personService.get(id)
            .subscribe(person => this.person = person);
    }

    save() {
        if (this.person.id) {
            this._personService.update(this.person.id, this.person)
                .subscribe(() => this.dismiss());
            return;
        }
        this._personService.add(this.person).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Kişi sil',
            message: `<strong>${this._fullName(this.person)} (${this.person.nId})</strong> kişisini silme istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    private _remove() {
        this._personService.remove(this.person.id)
            .subscribe(() => this.dismiss());
    }

    private _reset() {
        this.person = null;
    }

    private _fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
