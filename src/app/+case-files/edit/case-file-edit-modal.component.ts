import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService} from '../../shared/services';
import {CaseFileService, CompetentAuthorityService, PersonService} from '../../shared/repositories';
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

    dismiss(removed: boolean = false) {
        this._modalController.dismiss({removed});
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

    onTypeChange(type: CaseFileType) {
        this.caseFile.competentAuthorityId = void 0;
        this._loadCompetentAuthorities(type)
            .subscribe(competentAuthorities => this.competentAuthorities = competentAuthorities);
    }

    getCompetentAuthorityLabel(type: CaseFileType) {
        return type === CaseFileType.Investigation
            ? 'Cumhuriyet Başs.'
            : 'Mahkeme';
    }

    private _remove() {
        this._caseFileService.remove(this.caseFile.id)
            .subscribe(() => this.dismiss(true));
    }

    private _loadCompetentAuthorities(caseFileType: CaseFileType) {
        const cType = caseFileType === CaseFileType.Investigation
            ? CompetentAuthorityType.AttorneyGeneralship
            : CompetentAuthorityType.CourtHouse;
        return this._competentAuthorityService.getByType(cType);
    }
}
