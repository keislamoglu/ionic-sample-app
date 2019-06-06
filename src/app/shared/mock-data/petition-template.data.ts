import {PetitionTemplate, TemplateDocument} from '../entity';

export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {
        id: 'cebf733d-14ae-4244-bd97-abf224023bd9',
        name: 'Görüşmeye Davet',
        slugName: TemplateDocument.UzlasmaGorusmesineDavet,
        petitions: []
    },
    {
        id: '68c0e11e-8292-4c95-bde5-de7d732aaea8',
        name: 'İstinabe',
        slugName: TemplateDocument.Istinabe,
        petitions: []
    },
    {
        id: '18572edd-3f4d-463c-826d-8c7806c97fc7',
        name: 'SEGBİS Görüşme Talebi',
        slugName: TemplateDocument.SegbisGorusmeTalep,
        petitions: []
    }
];
