import {ProsecutionOffice} from '../entity/prosecution-office';
import {guid, lorem} from '../helpers';

export const PROSECUTION_OFFICES: ProsecutionOffice[] = [
    {id: guid(), address: lorem(10), name: 'Foo'},
    {id: guid(), address: lorem(15), name: 'Bar'},
    {id: guid(), address: lorem(8), name: 'Baz'},
    {id: guid(), address: lorem(12), name: 'Qux'},
];
