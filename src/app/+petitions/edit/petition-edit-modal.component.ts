import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, PetitionExporterService} from '../../shared/services';
import {Party, Petition, PetitionTemplate} from '../../shared/entity';
import {map, switchMap} from 'rxjs/operators';
import {forkJoin, Observable, zip} from 'rxjs';
import {guid} from '../../shared/helpers';
import {PartyService, PetitionService, PetitionTemplateService} from '../../shared/repositories';
import {Question} from '../../dynamic-form-question/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TemplateQuestions} from '../../templates';
import {InstantiatorService} from '../../shared/services/instantiator.service';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    templateUrl: './petition-edit-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() caseFileId: string;

    petition: Petition = new Petition();
    parties: Party[] = [];
    dynamicQuestions: Question[];
    petitionTemplate: PetitionTemplate;
    allTemplates: PetitionTemplate[];
    form: FormGroup;

    get dynamicQuestionAnswers() {
        return this.form.value['dynamic'];
    }

    set dynamicQuestionAnswers(value) {
        this.form.patchValue({dynamic: value});
    }

    constructor(private _modalController: ModalController,
                private _petitionService: PetitionService,
                private _petitionTemplateService: PetitionTemplateService,
                private _partyService: PartyService,
                private _alertService: AlertService,
                private _petitionExporterService: PetitionExporterService,
                private _instantiator: InstantiatorService,
                private _fb: FormBuilder,
                private _changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.form = this._fb.group({
            template: [''],
            name: [''],
            parties: ['']
        });

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
        this._getDataSets().subscribe(([templates, parties]) => {
            this.allTemplates = templates;
            this.parties = parties;
            this.petition = new Petition();
            this.petition.caseFileId = this.caseFileId;
            this._markForCheck();
        });
    }

    edit(id: string) {
        this._getDataSets().pipe(
            switchMap(([templates, parties]) => {
                this.allTemplates = templates;
                this.parties = parties;
                return this._petitionService.get(id);
            }),
            switchMap(petition => {
                this.petition = petition;
                return this._loadTemplate(petition.templateId);
            }),
        ).subscribe(() => {
            const {name, templateId: template, partyIds: parties} = this.petition;
            this.form.patchValue({template, name, parties});
            this._markForCheck();
        });
    }

    save(): void {
        const {name, template: templateId, parties} = this.form.value;

        this.petition.templateId = templateId;
        this.petition.name = name;
        this.petition.partyIds = parties;
        this.petition.date = '' + new Date();
        this.petition.fileName = `${guid()}.docx`;

        if (this.dynamicQuestionAnswers) {
            this.petition.extraData = JSON.stringify(this.dynamicQuestionAnswers);
        }

        if (this.petition.id) {
            // Existing Petition
            this._petitionService.update(this.petition.id, this.petition)
                .subscribe(() => {
                    this.exportDocx(this.petition.id, this.dynamicQuestionAnswers);
                    this.dismiss();
                });
        } else {
            // New Petition
            this._petitionService.add(this.petition)
                .subscribe(petition => {
                    this.exportDocx(petition.id, this.dynamicQuestionAnswers);
                    this.dismiss();
                });
        }
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Dilekçe sil',
            message: `<strong>${this.petition.name}</strong> dilekçesini silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    exportDocx(id: string, extraData: any) {
        try {
            this._petitionExporterService.export(id, extraData).then(() => {
                console.log('success');
            }, (e) => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
    }

    onTemplateChange(templateId: string) {
        if (templateId) {
            this._loadTemplate(templateId).subscribe(() => this._markForCheck());
        }
    }

    onDynamicFormUpdated() {
        if (this.petition.extraData) {
            this.dynamicQuestionAnswers = JSON.parse(this.petition.extraData);
        }
    }

    async getPersonNameByParty(partyId: string) {
        return await this._partyService.getPersonName(partyId).toPromise();
    }

    private _loadTemplate(templateId: string): Observable<void> {
        return this._petitionTemplateService.get(templateId).pipe(
            map(template => {
                this.petitionTemplate = template;
                this.form.patchValue({name: template.name});
                this.dynamicQuestions = TemplateQuestions[template.slugName];
            })
        );
    }

    private _getDataSets(): Observable<[PetitionTemplate[], Party[]]> {
        return zip(
            this._petitionTemplateService.getAll(),
            this._partyService.getByCaseFile(this.caseFileId).pipe(
                switchMap(parties => {
                    const partyIds = parties.map(party => party.id);
                    return forkJoin(partyIds.map(partyId => fromPromise(this._instantiator.instantiateParty(partyId))));
                })
            )
        );
    }

    private _remove() {
        this._petitionService.remove(this.petition.id)
            .subscribe(() => this.dismiss(true));
    }

    private _markForCheck() {
        this._changeDetector.markForCheck();
    }
}
