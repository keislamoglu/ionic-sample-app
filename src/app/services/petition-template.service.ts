import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {BaseCrud} from './base-crud';
import {PetitionTemplate} from '../entity/petition-template';
import {PETITION_TEMPLATES} from '../mock-data/petition-template.data';

@Injectable({providedIn: ServicesModule})
export class PetitionTemplateService extends BaseCrud<PetitionTemplate> {
    protected dataSet: PetitionTemplate[] = PETITION_TEMPLATES;
}
