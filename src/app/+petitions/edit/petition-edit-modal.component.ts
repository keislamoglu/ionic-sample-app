import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, PetitionExporterService} from '../../shared/services';
import {Petition, PetitionTemplate} from '../../shared/entity';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {guid} from '../../shared/helpers';
import {PetitionService, PetitionTemplateService} from '../../shared/repositories';
import {Question} from '../../dynamic-form-question/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TemplateQuestions} from '../../templates';

@Component({
    templateUrl: './petition-edit-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() partyId: string;
    petition: Petition = new Petition();
    templateModel: PetitionTemplate;
    templates: PetitionTemplate[];
    dynamicQuestions: Question[];
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
                private _alertService: AlertService,
                private _petitionExporterService: PetitionExporterService,
                private _fb: FormBuilder,
                private _changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.form = this._fb.group({
            template: [''],
            name: ['']
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
        this._getDataSets().subscribe(templates => {
            this.templates = templates;
            this.petition = new Petition();
            this.petition.partyId = this.partyId;
            this._markForCheck();
        });
    }

    edit(id: string) {
        this._getDataSets().pipe(
            switchMap(templates => {
                this.templates = templates;
                return this._petitionService.get(id);
            }),
            switchMap(petition => {
                this.petition = petition;
                return this._loadTemplate(petition.templateId);
            })
        ).subscribe(() => this._markForCheck());
    }

    save(): void {
        if (this.dynamicQuestionAnswers) {
            this.petition.extraData = JSON.stringify(this.dynamicQuestionAnswers);
        }
        this.petition.date = '' + new Date();
        this.petition.fileName = `${guid()}.docx`;

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
        this._petitionExporterService.export(id, extraData);
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

    private _loadTemplate(templateId: string): Observable<void> {
        return this._petitionTemplateService.get(templateId).pipe(
            map(template => {
                this.templateModel = template;
                this.petition.name = template.name;
                this.dynamicQuestions = TemplateQuestions[template.slugName];
            })
        );
    }

    private _getDataSets(): Observable<PetitionTemplate[]> {
        return this._petitionTemplateService.getAll();
    }

    private _remove() {
        this._petitionService.remove(this.petition.id)
            .subscribe(() => this.dismiss(true));
    }

    private _markForCheck() {
        this._changeDetector.markForCheck();
    }
}
