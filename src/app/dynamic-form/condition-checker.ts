import {Comparison, Question} from '../dynamic-form-question/models';

export class ConditionChecker {
    constructor(private questionFinder: (key: string) => Question) {
    }

    verifyCondition(question: Question): boolean {
        if (!question.conditions || !question.conditions.length) {
            return true;
        }

        return question.conditions.every(condition => {
            const compareQuestion = this.questionFinder(condition.question);

            if (!compareQuestion) {
                throw new Error(`The key "${condition.question}" is not matched with any question`);
            }

            return this._compare(question.value, compareQuestion.value, condition.comparison);
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
