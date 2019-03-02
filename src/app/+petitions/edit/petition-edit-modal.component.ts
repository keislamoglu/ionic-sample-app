import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {
    AlertService,
    CaseFileService,
    DocxFileService,
    PersonService,
    PetitionService,
    PetitionTemplateService,
    ProsecutionOfficeService,
    UserInfoService
} from '../../shared/services';
import {CaseFile, Person, Petition, PetitionTemplate, ProsecutionOffice, TemplateDocument, UserInfo} from '../../shared/entity';
import {map, switchMap} from 'rxjs/operators';
import {Observable, zip} from 'rxjs';
import {UzlasmayaDavet, UzlasmayaDavetProps} from '../../../templates';

@Component({
    templateUrl: './petition-edit-modal.component.html',
})
export class PetitionEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() claimentId: string;
    petition: Petition;
    template: PetitionTemplate;
    templates: PetitionTemplate[];
    persons: Person[] = [];
    prosecutionOffices: ProsecutionOffice[] = [];
    caseFiles: CaseFile[];
    userInfo: UserInfo;
    private _requiredFields: string[] = [];

    constructor(private _modalController: ModalController,
                private _petitionService: PetitionService,
                private _caseFileService: CaseFileService,
                private _petitionTemplateService: PetitionTemplateService,
                private _personService: PersonService,
                private _prosecutionOfficeService: ProsecutionOfficeService,
                private _userInfoService: UserInfoService,
                private _alertService: AlertService,
                private _docxFileService: DocxFileService) {
    }

    ngOnInit() {
        if (this.id) {
            this.edit(this.id);
            return;
        }
        this.new();
        this._userInfoService.getAll().subscribe(userInfos => this.userInfo = userInfos[0]);
    }

    dismiss() {
        this._reset();
        this._modalController.dismiss();
    }

    new() {
        this._getDataSets().subscribe(val => {
            [this.templates, this.persons, this.prosecutionOffices, this.caseFiles] = val;
            this.petition = new Petition();
            if (this.claimentId) {
                this.petition.claimentId = this.claimentId;
            }
        });
    }

    edit(id: string) {
        this._getDataSets().pipe(
            switchMap(val => {
                [this.templates, this.persons, this.prosecutionOffices, this.caseFiles] = val;
                return this._petitionService.get(id);
            }),
            switchMap(petition => {
                this.petition = petition;
                return this._loadTemplate(petition.petitionTemplateId);
            })
        ).subscribe();
    }

    save(): void {
        this.petition.date = new Date();
        this.petition.fileName = 'uzlasma-gorusmesine-davet.docx'; // TODO: auto generate
        const fieldData = {
            fileName: this.petition.fileName,
            claiment: this.persons.find(x => x.id === this.petition.claimentId),
            defendant: this.persons.find(x => x.id === this.petition.defendantId),
            caseFile: this.caseFiles.find(x => x.id === this.petition.caseFileId),
            prosecutionOffice: this.prosecutionOffices.find(x => x.id === this.petition.prosecutionOfficeId),
            userInfo: this.userInfo,
            date: this.petition.date,
        };

        this.petition.fieldData = JSON.stringify(fieldData);
        if (this.petition.id) {
            this._petitionService.update(this.petition.id, this.petition)
                .subscribe(() => {
                    this.exportDocx(fieldData);
                    this.dismiss();
                });
            return;
        }

        this._petitionService.add(this.petition).subscribe(() => {
            this.exportDocx(fieldData);
            this.dismiss();
        });
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Dilekçe sil',
            message: `<strong>${this.petition.name}</strong> dilekçesini silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    exportDocx(data: any) {
        switch (this.template.slugName) {
            case TemplateDocument.UzlasmaGorusmesineDavet:
                this._docxFileService.export({
                    fileName: this.petition.fileName,
                    docxTemplate: UzlasmayaDavet as any,
                    props: {
                        claiment: data.claiment,
                        defendant: data.defendant,
                        date: data.date,
                        userInfo: data.userInfo,
                        prosecutionOffice: data.prosecutionOffice
                    } as UzlasmayaDavetProps
                });
                break;
        }
    }

    onTemplateChange(id: string) {
        this._loadTemplate(id).subscribe();
    }

    isRequiredField(name: string): boolean {
        return this.requiredFields.some(x => x === name);
    }

    set requiredFields(fields: string[]) {
        this._requiredFields = fields;
    }

    get requiredFields() {
        if (this.template) {
            return this._requiredFields;
        }
    }

    private _loadTemplate(id: string): Observable<void> {
        return this._petitionTemplateService.get(id).pipe(
            map(template => {
                this.template = template;
                if (!this.petition.name) {
                    this.petition.name = template.name;
                }

                this.requiredFields = JSON.parse(this.template.requiredFields);
            })
        );
    }

    private _getDataSets(): Observable<[PetitionTemplate[], Person[], ProsecutionOffice[], CaseFile[]]> {
        return zip(
            this._petitionTemplateService.getAll(),
            this._personService.getAll(),
            this._prosecutionOfficeService.getAll(),
            this._caseFileService.getAll(),
        );
    }

    private _reset() {
        this.petition = null;
    }

    private _remove() {
        this._petitionService.remove(this.petition.id)
            .subscribe(() => this.dismiss());
    }

    private _personFullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
