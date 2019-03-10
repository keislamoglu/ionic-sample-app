import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, CaseFileService, CompetentAuthorityService, PersonService} from '../../shared/services';
import {CaseFile, CaseFileType, CompetentAuthority, CompetentAuthorityType} from '../../shared/entity';
import {EnumList, enumList} from '../../shared/helpers';
import {switchMap} from 'rxjs/operators';

@Component({
    templateUrl: './case-file-edit-modal.component.html'
})
export class CaseFileEditModalComponent implements OnInit {
    @Input() id: string;
    caseFile: CaseFile | null = null;
    // Data sets
    caseFileTypeDataset: EnumList<typeof CaseFileType> = enumList(CaseFileType);
    competentAuthorities: CompetentAuthority[] = [];

    get conciliationStartDate(): string {
        return this.caseFile.conciliationStartDate
            ? this.caseFile.conciliationStartDate.toISOString()
            : void 0;
    }

    set conciliationStartDate(value: string) {
        this.caseFile.conciliationStartDate = new Date(value);
    }

    get chargeDate(): string {
        return this.caseFile.chargeDate
            ? this.caseFile.chargeDate.toISOString()
            : void 0;
    }

    set chargeDate(value: string) {
        this.caseFile.chargeDate = new Date(value);
    }

    constructor(private _modalController: ModalController,
                private _caseFileService: CaseFileService,
                private _personService: PersonService,
                private _competentAuthorityService: CompetentAuthorityService,
                private _alertService: AlertService) {
    }

    ngOnInit(): void {
        if (this.id) {
            this.edit(this.id);
            return;
        }
        this.new();
    }

    dismiss() {
        this._modalController.dismiss();
    }

    new() {
        this.caseFile = new CaseFile();
    }

    edit(id: string) {
        this._caseFileService.get(id).pipe(
            switchMap(caseFile => {
                this.caseFile = caseFile;
                return this._loadCompetentAuthorities(caseFile.type);
            })
        ).subscribe(competentAuthorities => {
            this.competentAuthorities = competentAuthorities;
        });
    }

    save() {
        if (this.id) {
            this._caseFileService.update(this.id, this.caseFile).subscribe(() => this.dismiss());
            return;
        }
        this._caseFileService.add(this.caseFile).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        // TODO: remove related parties too
        this._alertService.confirm({
            title: 'Dava dosyası sil',
            message: `<strong>${this.caseFile.fileNo}</strong> dosyasını silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    private _remove() {
        this._caseFileService.remove(this.caseFile.id)
            .subscribe(() => this.dismiss());
    }

    private _loadCompetentAuthorities(caseFileType: CaseFileType) {
        const cType = caseFileType === CaseFileType.Investigation
            ? CompetentAuthorityType.CourtHouse
            : CompetentAuthorityType.ProsecutionOffice;
        return this._competentAuthorityService.getByType(cType);
    }

    onTypeChange(type: CaseFileType) {
        this.caseFile.competentAuthorityId = void 0;
        this._loadCompetentAuthorities(type)
            .subscribe(competentAuthorities => this.competentAuthorities = competentAuthorities);
    }
}
