import {Observable, of, throwError} from 'rxjs';
import {clone, guid} from '../helpers';

export abstract class BaseCrud<T extends { id: string }> {
    protected abstract dataSet: T[];

    getAll(): Observable<T[]> {
        return of(this.dataSet);
    }

    get(id: string): Observable<T> {
        return of(this.dataSet.find(x => x.id === id));
    }

    add(data: T): Observable<void> {
        data.id = guid();
        this.dataSet.push(data);
        return of(void 0);
    }

    update(id: string, data: T): Observable<void> {
        const index = this.dataSet.findIndex(x => x.id === id);
        if (index === -1) {
            return throwError('Not found');
        }
        this.dataSet[index] = clone(data);
        return of(void 0);
    }

    remove(id: string): Observable<void> {
        const index = this.dataSet.findIndex(x => x.id === id);
        if (index === -1) {
            return this.notFound();
        }

        this.dataSet.splice(index, 1);
        return of(void 0);
    }

    protected notFound() {
        return throwError('Not found');
    }
}
