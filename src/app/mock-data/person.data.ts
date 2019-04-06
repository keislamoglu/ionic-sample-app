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
    createPerson('Kadir Emin', 'İslamoğlu', AddressIterator.next.id),
    createPerson('Hakan Emre', 'İslamoğlu', AddressIterator.next.id),
    createPerson('Gökhan', 'Keçeci', AddressIterator.next.id),
    createPerson('Recep', 'Altunsu', AddressIterator.next.id),
    createPerson('Ahmet', 'Taş', AddressIterator.next.id),
    createPerson('Burak', 'Mollaibrahimoğlu', AddressIterator.next.id),
    createPerson('Gökhan', 'Tınkır', AddressIterator.next.id),
    createPerson('Serkan', 'Elçiçek', AddressIterator.next.id),
];

function createPerson(name: string, lastname: string, addressId: string): Person {
    let middlename;
    [name, middlename] = name.split(' ');
    return {
        name,
        middlename,
        lastname,
        id: guid(),
        nId: '12345678901',
        phone: '05001234567',
        addressId: addressId,
        mernisAddressId: addressId,
        birthDate: new Date(),
        birthPlace: 'Lorem',
        fatherName: 'Baba',
        motherName: 'Anne',
        parties: [],
        address: void 0,
        mernisAddress: void 0,
    };
}

