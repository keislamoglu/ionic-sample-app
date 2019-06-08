import {TemplateDocument} from '../shared/entity';
import {SegbisGorusmeTalepQuestions} from './segbis-gorusme-talep';
import {KovusturmaUzlastirmaciGorusmeTutanagiQuestions} from './kovusturma-uzlastirmaci-gorusme-tutanagi';
import {KovusturmaUzlasmaTelifQuestions} from './kovusturma-uzlasma-teklif';

export const TemplateQuestions = {
    [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalepQuestions,
    [TemplateDocument.Istinabe]: [],
    [TemplateDocument.UzlasmaGorusmesineDavet]: [],
    [TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi]: KovusturmaUzlastirmaciGorusmeTutanagiQuestions,
    [TemplateDocument.KovusturmaUzlasmaTeklif]: KovusturmaUzlasmaTelifQuestions
};
