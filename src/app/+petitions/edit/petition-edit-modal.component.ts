import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, PetitionExporterService, PetitionService, PetitionTemplateService} from '../../shared/services';
import {Petition, PetitionTemplate} from '../../shared/entity';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {guid} from '../../shared/helpers';

@Component({
    templateUrl: './petition-edit-modal.component.html',
})
export class PetitionEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() partyId: string;
    petition: Petition;
    template: PetitionTemplate;
    templates: PetitionTemplate[];

    constructor(private _modalController: ModalController,
                private _petitionService: PetitionService,
                private _petitionTemplateService: PetitionTemplateService,
                private _alertService: AlertService,
                private _petitionExporterService: PetitionExporterService) {
    }

    ngOnInit() {
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
        ).subscribe();
    }

    save(): void {
        this.petition.date = new Date();
        this.petition.fileName = `${guid()}.docx`;
        if (this.petition.id) {
            this._petitionService.update(this.petition.id, this.petition)
                .subscribe(() => {
                    this.exportDocx(this.petition.id);
                    this.dismiss();
                });
            return;
        }

        this._petitionService.add(this.petition).subscribe(petition => {
            this.exportDocx(petition.id);
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

    exportDocx(id: string) {
        this._petitionExporterService.export(id);
    }

    onTemplateChange(templateId: string) {
        this._loadTemplate(templateId).subscribe();
    }

    private _loadTemplate(templateId: string): Observable<void> {
        return this._petitionTemplateService.get(templateId).pipe(
            map(template => {
                this.template = template;
                this.petition.name = template.name;
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
}
