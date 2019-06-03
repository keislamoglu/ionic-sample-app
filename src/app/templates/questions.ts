import {TemplateDocument} from '../shared/entity';
import {SegbisGorusmeDavetQuestions} from './segbis-gorusme-davet';

export const TemplateQuestions = {
    [TemplateDocument.SegbisGorusmeDavet]: SegbisGorusmeDavetQuestions,
    [TemplateDocument.Istinabe]: [],
    [TemplateDocument.UzlasmaGorusmesineDavet]: []
};
