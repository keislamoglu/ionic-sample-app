import {PetitionTemplate, TemplateDocument} from '../shared/entity';
import {guid} from '../shared/helpers';

let i = 1;
export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {
        id: guid(),
        name: 'Görüşmeye Davet',
        slugName: TemplateDocument.UzlasmaGorusmesineDavet,
        petitions: []
    },
    createPetitionTemplate(),
    createPetitionTemplate(),
];

function createPetitionTemplate(): PetitionTemplate {
    const id = guid();
    return {
        id,
        name: `Şablon-${i++}`,
        slugName: TemplateDocument.Ornek,
        petitions: [],
    };
}
