import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AddressService, CityService, ModalService, PersonService} from '../../shared/services';
import {Address, Person} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {PersonEditModalComponent} from '../edit/person-edit-modal.component';
import {switchMap} from 'rxjs/operators';
import {zip} from 'rxjs';

@Component({
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {
    id: string;
    caseFileId: string;
    person: Person;
    address: { address: Address, cityName: string } = this._emptyAddress();
    mernisAddress: { address: Address, cityName: string } = this._emptyAddress();

    constructor(private _route: ActivatedRoute,
                private _personService: PersonService,
                private _addressService: AddressService,
                private _cityService: CityService,
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

    getAddressInfo(address: { address: Address, cityName: string }) {
        if (!address.address || !address.cityName) {
            return;
        }
        return [
            address.address.street,
            address.address.district,
            address.cityName
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
                return zip(
                    this._cityService.get(address.cityId),
                    this._cityService.get(mernisAddress.cityId),
                );
            })
        )
            .subscribe(([city, mernisCity]) => {
                this.address.cityName = city.name;
                this.mernisAddress.cityName = mernisCity.name;
            });
    }

    private _fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }

    private _emptyAddress() {
        return {address: void 0, cityName: void 0};
    }
}
