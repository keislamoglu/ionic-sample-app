import {Person} from '../entity/person';
import {guid, lorem} from '../helpers';

export const PERSONS = [
    createPerson('Kadir Emin', 'İslamoğlu'),
    createPerson('Hakan Emre', 'İslamoğlu'),
    createPerson('Gökhan', 'Keçeci'),
    createPerson('Recep', 'Altunsu'),
    createPerson('Ahmet', 'Taş'),
    createPerson('Burak', 'Mollaibrahim'),
    createPerson('Gökhan', 'Tınkır'),
    createPerson('Serkan', 'Elçiçek'),
];

function createPerson(name: string, lastname: string): Person {
    const person = new Person();
    person.givenName = name;
    person.lastname = lastname;
    person.id = guid();
    person.nId = '12345678901';
    person.phone = '05001234567';
    person.address = lorem(Math.floor(Math.random() * 25) + 25);

    return person;
}
