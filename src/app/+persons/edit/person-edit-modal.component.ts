import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, PersonService} from '../../shared/services';
import {Person} from '../../shared/entity';

@Component({
    templateUrl: './person-edit-modal.component.html',
})
export class PersonEditModalComponent implements OnInit {
    @Input() id: string;
    person: Person | null = null;

    get birthDate(): string {
        return this.person.birthDate
            ? this.person.birthDate.toISOString()
            : void 0;
    }

    set birthDate(value: string) {
        this.person.birthDate = new Date(value);
    }

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

    dismiss(opts?: { cancelled?: boolean, removed?: boolean, id?: string }) {
        this._modalController.dismiss(opts || {});
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
        this._personService.add(this.person).subscribe(person => this.dismiss({id: person.id}));
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
            .subscribe(() => this.dismiss({removed: true}));
    }

    private _fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
