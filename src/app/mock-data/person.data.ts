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
    let middlename;
    [name, middlename] = name.split(' ', 1);
    const person = new Person();
    if (middlename) {
        person.middlename = middlename;
    }
    person.name = name;
    person.lastname = lastname;
    person.id = guid();
    person.nId = '12345678901';
    person.phone = '05001234567';
    person.address = lorem(Math.floor(Math.random() * 25) + 25);
    return person;
}
