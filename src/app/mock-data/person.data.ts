import {Person} from '../shared/entity';
import {guid} from '../shared/helpers';

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
        address: 'Namık Kemal Mah. Topçu Sok. No:4/7',
        birthDate: new Date(),
        birthPlace: 'Lorem',
        fatherName: 'Foo',
        motherName: 'Bar',
        mernisAddress: 'Kemal Namık Mah.',
        parties: []
    };
}
