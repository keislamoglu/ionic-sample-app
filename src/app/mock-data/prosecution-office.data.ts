import {ProsecutionOffice} from '../entity/prosecution-office';
import {guid, lorem} from '../helpers';

export const PROSECUTION_OFFICES: ProsecutionOffice[] = [
    prosecutionOffice(lorem(10), 'Foo'),
    prosecutionOffice(lorem(15), 'Bar'),
    prosecutionOffice(lorem(8), 'Baz'),
    prosecutionOffice(lorem(12), 'Qux'),
];

function prosecutionOffice(address, name) {
    const office = new ProsecutionOffice();
    office.id = guid();
    office.address = address;
    office.name = name;
    return office;
}
