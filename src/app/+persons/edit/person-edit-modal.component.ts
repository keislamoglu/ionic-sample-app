import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService} from '../../shared/services';
import {Address, City, Person} from '../../shared/entity';
import {switchMap, tap} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {AddressService, CityService, PersonService} from '../../shared/repositories';

@Component({
    templateUrl: './person-edit-modal.component.html',
})
export class PersonEditModalComponent implements OnInit {
    @Input() id: string;
    person: Person = new Person();
    address: Address = new Address();
    mernisAddress: Address = new Address();
    cities: City[] = [];

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
        this._loadData().subscribe();
    }

    edit(id: string) {
        this._loadData().pipe(
            switchMap(() => this._personService.get(id)),
            switchMap(person => {
                this.person = person;
                const hasMernisAddress = !!person.mernisAddressId;
                return zip(
                    this._addressService.get(person.addressId),
                    hasMernisAddress ? this._addressService.get(person.mernisAddressId) : of(new Address())
                );
            })
        ).subscribe(val => [this.address, this.mernisAddress] = val);
    }

    save() {
        const hasMernisAddress = !!this.mernisAddress.cityId;

        if (this.person.id) {
            this._personService.update(this.person.id, this.person).pipe(
                switchMap(() => {
                    return this._addressService.update(this.address.id, this.address);
                }),
                switchMap(() => {
                    if (hasMernisAddress) {
                        return this._addressService.update(this.mernisAddress.id, this.mernisAddress);
                    } else {
                        return of(void 0);
                    }
                })
            ).subscribe(() => this.dismiss());
            return;
        }
        // Firstly add addresses to db, then assign address ids to person's relevant fields.
        zip(
            this._addressService.add(this.address),
            hasMernisAddress ? this._addressService.add(this.mernisAddress) : of(void 0)
        ).pipe(
            switchMap(([address, mernisAddress]) => {
                this.person.addressId = address.id;
                if (mernisAddress) {
                    this.person.mernisAddressId = mernisAddress.id;
                }
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
        return PersonService.FullName(person);
    }
}
