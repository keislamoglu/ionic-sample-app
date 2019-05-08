import {Injectable} from '@angular/core';
import {BaseCrud} from './base-crud';
import {PetitionTemplate} from '../entity';
import {PETITION_TEMPLATES} from '../mock-data';
import {RepositoriesModule} from './repositories.module';
import {of} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class PetitionTemplateService extends BaseCrud<PetitionTemplate> {
    protected dataSetName = 'petition_templates';
    protected dataSet$ = of(PETITION_TEMPLATES);
}
