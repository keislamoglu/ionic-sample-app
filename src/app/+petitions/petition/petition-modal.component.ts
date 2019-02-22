import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {
    AlertService,
    PersonService,
    PetitionService,
    PetitionTemplateService,
    ProsecutionOfficeService
} from '../../shared/services';
import {Person, Petition, PetitionTemplate, ProsecutionOffice} from '../../shared/entity';
import {map, switchMap} from 'rxjs/operators';
import {Observable, zip} from 'rxjs';

@Component({
    templateUrl: './petition-modal.component.html',
    styleUrls: ['./petition-modal.component.scss'],
})
export class PetitionModalComponent implements OnInit {
    @Input() id: string;
    petition: Petition;
    template: PetitionTemplate;
    templates: PetitionTemplate[];
    persons: Person[] = [];
    prosecutions: ProsecutionOffice[] = [];
    private _requiredFields: string[] = [];

    constructor(private _modalController: ModalController,
                private _petitionService: PetitionService,
                private _petitionTemplateService: PetitionTemplateService,
                private _personService: PersonService,
                private _prosecutionOfficeService: ProsecutionOfficeService,
                private _alertService: AlertService) {
    }

    ngOnInit() {
        if (this.id) {
            this.edit(this.id);
            return;
        }
        this.new();
    }

    dismiss() {
        this._reset();
        this._modalController.dismiss();
    }

    new() {
        this._getDataSets().subscribe(val => {
            [this.templates, this.persons, this.prosecutions] = val;
            this.petition = new Petition();
        });
    }

    edit(id: string) {
        this._getDataSets().pipe(
            switchMap(val => {
                [this.templates, this.persons, this.prosecutions] = val;
                return this._petitionService.get(id);
            }),
            switchMap(petition => {
                this.petition = petition;
                return this._loadTemplate(petition.petitionTemplateId);
            })
        ).subscribe();
    }

    save(): void {
        const fieldData = {
            claiment: this.persons.find(x => x.id === this.petition.claimentId),
            defendant: this.persons.find(x => x.id === this.petition.defendantId),
        };

        this.petition.fieldData = JSON.stringify(fieldData);

        if (this.petition.id) {
            this._petitionService.update(this.petition.id, this.petition)
                .subscribe(() => this.dismiss());
            return;
        }
        this._petitionService.add(this.petition).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Dilekçe sil',
            message: `<strong>${this.petition.name}</strong> dilekçesini silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    export() {
        // TODO: implement to export petition as pdf file
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

    private _getDataSets(): Observable<[PetitionTemplate[], Person[], ProsecutionOffice[]]> {
        return zip(
            this._petitionTemplateService.getAll(),
            this._personService.getAll(),
            this._prosecutionOfficeService.getAll()
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
