import {Observable, of, throwError} from 'rxjs';
import {guid} from '../helpers';

export abstract class BaseCrud<T extends { id: string }> {
    protected abstract dataSet: T[];

    getAll(): Observable<T[]> {
        return of(this.dataSet);
    }

    get(id: string): Observable<T> {
        return of(this.dataSet.find(x => x.id === id));
    }

    add(data: T): Observable<T> {
        data.id = guid();
        this.dataSet.push(data);
        return of(data);
    }

    update(id: string, data: T): Observable<void> {
        const index = this.dataSet.findIndex(x => x.id === id);
        if (index === -1) {
            return throwError('Not found');
        }
        this.dataSet[index] = data;
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
