import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddressService, AlertService, CityService, PersonService} from '../../shared/services';
import {Address, City, Person} from '../../shared/entity';
import {switchMap, tap} from 'rxjs/operators';
import {zip} from 'rxjs';

@Component({
    templateUrl: './person-edit-modal.component.html',
})
export class PersonEditModalComponent implements OnInit {
    @Input() id: string;
    person: Person | null = null;
    address: Address | null = null;
    mernisAddress: Address | null = null;
    cities: City[] = [];

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
                private _cityService: CityService,
                private _addressService: AddressService,
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
        this._loadData().subscribe(() => {
            this.address = new Address();
            this.mernisAddress = new Address();
            this.person = new Person();
        });
    }

    edit(id: string) {
        this._loadData().pipe(
            switchMap(() => this._personService.get(id)),
            switchMap(person => {
                this.person = person;
                return zip(
                    this._addressService.get(person.addressId),
                    this._addressService.get(person.mernisAddressId)
                );
            })
        ).subscribe(val => [this.address, this.mernisAddress] = val);
    }

    save() {
        if (this.person.id) {
            this._personService.update(this.person.id, this.person).pipe(
                switchMap(() => this._addressService.update(this.address.id, this.address)),
                switchMap(() => this._addressService.update(this.mernisAddress.id, this.mernisAddress))
            ).subscribe(() => this.dismiss());
            return;
        }
        // Firstly add addresses to db, then assign address ids to person's relevant fields.
        zip(
            this._addressService.add(this.address),
            this._addressService.add(this.mernisAddress)
        ).pipe(
            switchMap(([address, mernisAddress]) => {
                this.person.addressId = address.id;
                this.person.mernisAddressId = mernisAddress.id;
                return this._personService.add(this.person);
            })
        ).subscribe(person => this.dismiss({id: person.id}));
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Kişi sil',
            message: `<strong>${this._fullName(this.person)} (${this.person.nId})</strong> kişisini silme istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    private _loadData() {
        return this._cityService.getAll().pipe(
            tap(cities => this.cities = cities)
        );
    }

    private _remove() {
        this._personService.remove(this.person.id)
            .subscribe(() => this.dismiss({removed: true}));
    }

    private _fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
