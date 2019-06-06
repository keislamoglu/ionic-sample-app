import {TemplateDocument} from '../shared/entity';
import {SegbisGorusmeTalepQuestions} from './segbis-gorusme-talep';

export const TemplateQuestions = {
    [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalepQuestions,
    [TemplateDocument.Istinabe]: [],
    [TemplateDocument.UzlasmaGorusmesineDavet]: []
};
