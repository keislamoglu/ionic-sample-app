import {CaseFile, CaseFileType, CompetentAuthority} from '../entity';
import {guid} from '../helpers';
import {COMPETENT_AUTHORITIES} from './competent-authority.data';

let i = 0;
export const CASE_FILES: CaseFile[] = [
    createCaseFile(`123/2017`, CaseFileType.Prosecution, COMPETENT_AUTHORITIES[i++]),
    createCaseFile(`249/2018`, CaseFileType.Prosecution, COMPETENT_AUTHORITIES[i++]),
    createCaseFile(`12784/2018`, CaseFileType.Prosecution, COMPETENT_AUTHORITIES[i++]),
];

function createCaseFile(fileNo: string, type: CaseFileType, authority: CompetentAuthority): CaseFile {
    return {
        id: guid(),
        fileNo: fileNo,
        chargeDate: new Date().toLocaleDateString(),
        conciliationStartDate: new Date().toLocaleDateString(),
        type: type,
        conciliationNo: 'Foo',
        competentAuthorityId: authority.id,
        parties: [],
        competentAuthority: void 0,
        extensionTimes: [],
        agreementReached: false
    };
}
