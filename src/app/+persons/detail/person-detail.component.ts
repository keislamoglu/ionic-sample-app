import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ModalService} from '../../shared/services';
import {Address, Person} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {PersonEditModalComponent} from '../edit/person-edit-modal.component';
import {switchMap} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {AddressService, CountryService, PersonService} from '../../shared/repositories';
import {fullName} from '../../shared/helpers';

@Component({
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {
    id: string;
    caseFileId: string;
    person: Person;
    address: { address: Address, countryName: string } = this._emptyAddress();
    mernisAddress: { address: Address, countryName: string } = this._emptyAddress();

    constructor(private _route: ActivatedRoute,
                private _personService: PersonService,
                private _addressService: AddressService,
                private _countryService: CountryService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this.caseFileId = this._route.snapshot.paramMap.get('caseFileId');
        this._loadData();
    }

    async edit() {
        const modal = await this._modalService.present(PersonEditModalComponent, {id: this.id});
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
        this._loadData();
    }

    getAddressInfo(address: { address: Address, countryName: string }) {
        if (!address.address || !address.countryName) {
            return;
        }
        return [
            address.address.streetName,
            address.address.districtName,
            address.address.cityName,
            address.countryName
        ].filter(t => t).join(', ');
    }

    private _loadData() {
        this._personService.get(this.id).pipe(
            switchMap(person => {
                this.person = person;
                return zip(
                    this._addressService.get(person.addressId),
                    this._addressService.get(person.mernisAddressId)
                );
            }),
            switchMap(([address, mernisAddress]) => {
                this.address.address = address;
                this.mernisAddress.address = mernisAddress;
                return this._countryService.get(address.countryId);
            })
        ).subscribe((country) => {
            this.address.countryName = country.name;
        });
    }

    private _fullName(person: Person) {
        return fullName(person);
    }

    private _emptyAddress() {
        return {address: void 0, countryName: void 0};
    }
}
