import {PetitionTemplate} from '../entity/petition-template';
import {guid, lorem} from '../helpers';

export const PETITION_TEMPLATES: PetitionTemplate[] = [
    createPetitionTemplate(lorem(45)),
    createPetitionTemplate(lorem(35)),
    createPetitionTemplate(lorem(60)),
    createPetitionTemplate(lorem(75)),
    createPetitionTemplate(lorem(25)),
    createPetitionTemplate(lorem(90)),
];

function createPetitionTemplate(content: string) {
    const template = new PetitionTemplate();
    template.id = guid();
    template.name = `Template-${template.id}`;
    template.content = content;
    return template;
}
