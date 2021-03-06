import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {enumList, EnumList, fullName} from '../../shared/helpers';
import {Party, PartyType, Person} from '../../shared/entity';
import {AlertService} from '../../shared/services';
import {zip} from 'rxjs';
import {PartyService, PersonService} from '../../shared/repositories';

@Component({
    templateUrl: './party-edit-modal.component.html'
})
export class PartyEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() caseFileId: string;
    @Input() personId: string;

    party: Party | null = null;
    personDataset: Person[] = [];
    partyTypeDataset: EnumList<typeof PartyType> = enumList(PartyType);

    get relatedPersonTypes(): PartyType[] {
        return [
            PartyType.Translator,
            PartyType.Representative,
            PartyType.LegalDelegate,
            PartyType.Advocate,
        ];
    }

    get isRelatedPersonType() {
        return this.relatedPersonTypes.includes(this.party.type);
    }

    constructor(private _modalController: ModalController,
                private _partyService: PartyService,
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

    dismiss(removed: boolean = false) {
        this._modalController.dismiss({removed});
    }

    new() {
        this._personService.getAll().subscribe(persons => {
            this.personDataset = persons;
            this.party = new Party();
            this.party.caseFileId = this.caseFileId;
            if (this.personId) {
                this.party.personId = this.personId;
            }
        });
    }

    edit(id: string) {
        zip(
            this._personService.getAll(),
            this._partyService.get(id)
        ).subscribe(val => {
            [this.personDataset, this.party] = val;
        });
    }

    save() {
        if (this.id) {
            this._partyService.update(this.id, this.party).subscribe(() => this.dismiss());
            return;
        }

        this._partyService.add(this.party).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        const person = this.personDataset.find(t => t.id === this.party.personId);
        this._alertService.confirm({
            title: 'Taraf sil',
            message: `<strong>${this._personFullName(person)}</strong> isimli tarafı silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    private _remove() {
        this._partyService.remove(this.id)
            .subscribe(() => this.dismiss(true));
    }

    private _personFullName(person: Person) {
        return fullName(person);
    }
}
