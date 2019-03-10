import {CaseFileType} from './case-file-type';
import {ExtensionTime} from './extension-time';
import {CompetentAuthority} from './competent-authority';
import {Party} from './party';

export class CaseFile {
    id: string;
    fileNo: string; // Soruşturma veya kovuşturma dosya numarası
    conciliationNo: string; // Uzlaştırma no
    conciliationStartDate: Date; // Discount from 30 days
    extensionTimes: ExtensionTime[]; // Ek süre
    chargeDate: Date; // Görevlendirme tarihi
    parties: Party[]; // Taraflar
    type: CaseFileType; // Dosya tipi (soruşturma veya kovuşturma)
    competentAuthorityId: string;
    competentAuthority: CompetentAuthority; // Yetkili merci (adliye veya savcılık)
}
