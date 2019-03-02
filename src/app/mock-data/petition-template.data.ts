import {PetitionTemplate, TemplateDocument} from '../shared/entity';
import {guid} from '../shared/helpers';

let i = 1;
export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {
        id: guid(),
        name: 'Görüşmeye Davet',
        slugName: TemplateDocument.UzlasmaGorusmesineDavet,
        requiredFields: JSON.stringify(['claiment', 'prosecution']),
        petitions: []
    },
    createPetitionTemplate(),
    createPetitionTemplate(),
    createPetitionTemplate(),
    createPetitionTemplate(),
    createPetitionTemplate(['claiment']),
];

function createPetitionTemplate(requiredFieldList?: string[]): PetitionTemplate {
    if (!requiredFieldList) {
        requiredFieldList = ['claiment', 'defendant'];
    }
    const requiredFields = JSON.stringify(requiredFieldList);
    const id = guid();
    return {
        id,
        name: `Şablon-${i++}`,
        slugName: TemplateDocument.Ornek,
        petitions: [],
        requiredFields
    };
}
