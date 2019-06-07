import {BaseTemplate} from './base';
import {CaseFile, ClientUser, CompetentAuthority, Party, Person} from '../shared/entity';
import {DropdownQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';

export interface KovusturmaUzlasmaTeklifProps {
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    person: Person;
    party: Party;
    user: ClientUser;
    extraData: {
        crimes: string,
        personType: string,
    };
}

const PERSON_TYPE_OPTIONS: { key: string, value: string }[] = [
    {key: 'sanik', value: 'Sanık'}
];

const getPersonType = (key: string) => PERSON_TYPE_OPTIONS.find(t => t.key === key).value;

export const KovusturmaUzlasmaTelifQuestions: Question[] = [
    new TextboxQuestion({
        label: 'Suçlar',
        key: 'crimes',
        required: true,
    }),
    new DropdownQuestion({
        label: 'Tip',
        options: PERSON_TYPE_OPTIONS,
        key: 'personType',
        required: true
    })
];

export class KovusturmaUzlasmaTeklif extends BaseTemplate<KovusturmaUzlasmaTeklifProps> {
    protected prepareDocument(props: KovusturmaUzlasmaTeklifProps) {
    }
}
