import {Component, OnInit} from '@angular/core';
import {PetitionEditModalComponent} from '../edit/petition-edit-modal.component';
import {Petition, PetitionTemplate} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {DocxFileService, ModalService} from '../../shared/services';
import {switchMap} from 'rxjs/operators';
import {NavController} from '@ionic/angular';
import {PetitionService, PetitionTemplateService} from '../../shared/repositories';

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
                private _navController: NavController,
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
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
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
