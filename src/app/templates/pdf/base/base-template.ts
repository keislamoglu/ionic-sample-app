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

    protected nl(times = 1) {
        let newLine = '';

        for (let i = 0; i < times; i++) {
            newLine += '\n';
        }

        return newLine;
    }

    protected lineSeparator() {
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

    protected dashLine() {
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