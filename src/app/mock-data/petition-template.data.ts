import {PetitionTemplate} from '../shared/entity';
import {guid, lorem} from '../shared/helpers';

export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {
        id: guid(),
        name: 'Sample Template',
        requiredFields: JSON.stringify(['claiment']),
        petitions: [],
        content: require('../../templates/template_1.html')
    },
    createPetitionTemplate(lorem(45)),
    createPetitionTemplate(lorem(35)),
    createPetitionTemplate(lorem(60)),
    createPetitionTemplate(lorem(75)),
    createPetitionTemplate(lorem(25), ['claiment']),
];

function createPetitionTemplate(content: string, requiredFieldList?: string[]): PetitionTemplate {
    if (!requiredFieldList) {
        requiredFieldList = ['claiment', 'defendant'];
    }
    const requiredFields = JSON.stringify(requiredFieldList);
    const id = guid();
    return {
        id,
        name: `Template-${id}`,
        content: content,
        petitions: [],
        requiredFields
    };
}
