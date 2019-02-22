import {Component, Input, OnInit} from '@angular/core';
import {PetitionService, PetitionTemplateService} from '../../shared/services';
import {switchMap} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {Person, Petition, UserInfo} from '../../shared/entity';
import {UserInfoService} from '../../shared/services/user-info.service';

@Component({
    selector: 'app-petition-preview',
    templateUrl: './petition-preview.component.html',
})
export class PetitionPreviewComponent implements OnInit {
    @Input() id: string;
    petition: Petition;
    userInfo: UserInfo;
    context: any;
    template: string;

    constructor(private _petitionService: PetitionService,
                private _userInfoService: UserInfoService,
                private _petitionTemplateService: PetitionTemplateService,
                private _modalController: ModalController) {
    }

    ngOnInit(): void {
        this._petitionService.get(this.id).pipe(
            switchMap(petition => {
                this.petition = petition;
                return this._petitionTemplateService.get(petition.petitionTemplateId);
            }),
            switchMap(template => {
                this.template = template.content;
                return this._userInfoService.getAll();
            })
        ).subscribe(userInfos => {
            this.userInfo = userInfos[0];
            this.createContext(JSON.parse(this.petition.fieldData));
        });
    }

    dismiss() {
        this._modalController.dismiss();
    }

    fullName(person: Person | UserInfo ) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }

    createContext(fieldData: any) {
        this.context = fieldData;
        this.context.userInfo = this.userInfo;
        this.context.fullName = this.fullName;
    }
}
