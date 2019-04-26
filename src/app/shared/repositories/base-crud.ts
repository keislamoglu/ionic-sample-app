import {Storage} from '@ionic/storage';
import {Observable, of, throwError} from 'rxjs';
import {guid} from '../helpers';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export abstract class BaseCrud<T extends { id: string }> {
    protected abstract dataSetName: string;
    protected dataSet$: Observable<T[]> | null = null;

    constructor(protected storage: Storage) {
    }

    getAll(): Observable<T[]> {
        if (!this.dataSet$) {
            this.dataSet$ = fromPromise(this.storage.get(this.dataSetName)).pipe(
                map(dataSet => dataSet === null ? [] : dataSet)
            );
        }
        return this.dataSet$;
    }

    get(id: string): Observable<T> {
        return this.getAll().pipe(
            map(items => items.find(x => x.id === id))
        );
    }

    add(data: T): Observable<T> {
        return this.getAll().pipe(
            map(dataSet => {
                data.id = guid();
                dataSet.push(data);
                this.save(dataSet);
                return data;
            })
        );
    }

    update(id: string, data: T): Observable<void> {
        return this.getAll().pipe(
            switchMap(dataSet => {
                const index = dataSet.findIndex(x => x.id === id);
                if (index === -1) {
                    return throwError('Not found');
                }
                dataSet[index] = data;
                this.save(dataSet);
                return of(void 0);
            })
        );
    }

    remove(id: string): Observable<void> {
        return this.getAll().pipe(
            switchMap(dataSet => {
                const index = dataSet.findIndex(x => x.id === id);

                if (index === -1) {
                    return this.notFound();
                }

                dataSet.splice(index, 1);

                this.save(dataSet);

                return of(void 0);
            })
        );
    }

    protected save(dataSet: T[]): Observable<any> {
        this.dataSet$ = fromPromise(this.storage.set(this.dataSetName, dataSet)).pipe(
            switchMap(() => this.storage.get(this.dataSetName)),
        );

        return this.dataSet$;
    }

    protected notFound() {
        return throwError('Not found');
    }
}
