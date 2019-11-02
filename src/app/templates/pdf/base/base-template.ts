import {ClientUser, Petition} from '../../../shared/entity';

export interface BaseTemplateProps<T> {
    petition: Petition;
    conciliator: ClientUser;
    extraData: T;
}

export abstract class BaseTemplate<T = {}> {
    constructor(protected props: BaseTemplateProps<T>) {
    }

    abstract documentDefinition: any;

    protected get newLine() {
        return '\n';
    }

    protected get lineSeparator() {
        return {
            canvas: [
                {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 515, y2: 0,
                    lineWidth: 1,
                    lineCap: 'square'
                }
            ]
        };
    }

    protected get dashedLine() {
        return {
            canvas: [
                {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 515, y2: 0,
                    lineWidth: 1,
                    lineCap: 'square',
                    dash: {length: .2, space: 3}
                }
            ]
        };
    }
}
