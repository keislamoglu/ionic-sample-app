import {ClientUser, Person} from '../entity';

export function fullName(person: Person | ClientUser) {
    const {name, lastName} = person;
    return name + ' ' + lastName;
}
