import {TemplateDocument} from '../shared/constants';
import {UzlasmaTeklifFormuQuestions, UzlastirmaRaporuQuestions,} from './pdf';

export const TemplateQuestions = {
    [TemplateDocument.UzlasmaTeklifFormu]: UzlasmaTeklifFormuQuestions,
    [TemplateDocument.UzlastirmaRaporu]: UzlastirmaRaporuQuestions,
};
