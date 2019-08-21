import {Comparison, Question} from '../dynamic-form-question/models';

export class ConditionChecker {
    constructor(private questionFormValueGetter: (key: string) => string) {
    }

    verifyCondition(question: Question): boolean {
        if (!question.conditions || !question.conditions.length) {
            return true;
        }

        return question.conditions.every(condition => {
            const compareValue = this.questionFormValueGetter(condition.question);
            return this._compare(question.value, compareValue, condition.comparison);
        });
    }

    private _compare(value: string, compareValue: string, comparison: Comparison): boolean {
        let isValid = false;

        switch (comparison) {
            case Comparison.IsEmpty:
                isValid = compareValue == null || compareValue === '';
                break;
            case Comparison.IsEqual:
                isValid = compareValue === value;
                break;
            case Comparison.IsNotNull:
                isValid = compareValue != null && compareValue !== '';
                break;
            case Comparison.IsGreaterThan:
                isValid = compareValue < value;
                break;
            case Comparison.IsLowerThan:
                isValid = compareValue > value;
                break;
            case Comparison.IsGreaterThanOrEqualTo:
                isValid = compareValue <= value;
                break;
            case Comparison.IsLowerThanOrEqualTo:
                isValid = compareValue >= value;
                break;
            default:
                isValid = true;
        }

        return isValid;
    }
}
