import {Component, OnInit} from '@angular/core';
import {PetitionEditModalComponent} from '../edit/petition-edit-modal.component';
import {Petition, PetitionTemplate} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {DocxFileService, ModalService, PetitionService, PetitionTemplateService} from '../../shared/services';
import {switchMap} from 'rxjs/operators';

@Component({
    templateUrl: './petition-detail.component.html'
})
export class PetitionDetailComponent implements OnInit {
    id: string;
    petition: Petition;
    template: PetitionTemplate;

    constructor(private _petitionService: PetitionService,
                private _petitionTemplateService: PetitionTemplateService,
                private _modalService: ModalService,
                private _route: ActivatedRoute,
                private _docxFileService: DocxFileService) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    openDocx() {
        this._docxFileService.open(this.petition.fileName);
    }

    async edit() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {id: this.id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._petitionService.get(this.id).pipe(
            switchMap(petition => {
                this.petition = petition;
                return this._petitionTemplateService.get(petition.templateId);
            })
        ).subscribe(template => this.template = template);
    }
}
