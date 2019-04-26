import {Person} from '../shared/entity';
import {guid} from '../shared/helpers';
import {ADDRESSES} from './address.data';


class AddressIterator {
    private static _next = 0;
    private static _length = ADDRESSES.length;

    static get next() {
        if (this._next === this._length) {
            this._next = 0;
        }
        return ADDRESSES[this._next++];
    }
}

export const PERSONS = [
    createPerson('Kadir Emin', 'İslamoğlu'),
    createPerson('Hakan Emre', 'İslamoğlu'),
    createPerson('Gökhan', 'Keçeci'),
    createPerson('Recep', 'Altunsu'),
    createPerson('Ahmet', 'Taş'),
    createPerson('Burak', 'Mollaibrahimoğlu'),
    createPerson('Gökhan', 'Tınkır'),
    createPerson('Serkan', 'Elçiçek'),
];

function createPerson(name: string, lastname: string): Person {
    let middlename;
    [name, middlename] = name.split(' ');
    return {
        name,
        middlename,
        lastname,
        id: guid(),
        nId: '12345678901',
        phone: '05001234567',
        addressId: AddressIterator.next.id,
        mernisAddressId: AddressIterator.next.id,
        birthDate: new Date().toLocaleDateString(),
        birthPlace: 'Lorem',
        fatherName: 'Baba',
        motherName: 'Anne',
        parties: [],
        address: void 0,
        mernisAddress: void 0,
    };
}

