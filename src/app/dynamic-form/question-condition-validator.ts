import {Condition, Question} from '../dynamic-form-question/models';

export class QuestionConditionValidator {
    constructor(private questions: Question[]) {
    }

    validate(key: string): boolean {
        const question = this._getQuestion(key);

        if (!question.conditions || !question.conditions.length) {
            return true;
        }

        return question.conditions.every(condition => {
            const compareQuestion = this._getQuestion(condition.question);
            return this._compare(question.value, compareQuestion.value, condition.condition);
        });
    }

    private _compare(value: string, compareValue: string, comparison: Condition): boolean {
        let isValid = false;

        switch (comparison) {
            case Condition.IsEmpty:
                isValid = compareValue == null || compareValue === '';
                break;
            case Condition.IsEqual:
                isValid = compareValue === value;
                break;
            case Condition.IsNotNull:
                isValid = compareValue != null && compareValue !== '';
                break;
            case Condition.IsGreaterThan:
                isValid = compareValue < value;
                break;
            case Condition.IsLowerThan:
                isValid = compareValue > value;
                break;
            case Condition.IsGreaterThanOrEqualTo:
                isValid = compareValue <= value;
                break;
            case Condition.IsLowerThanOrEqualTo:
                isValid = compareValue >= value;
                break;
            default:
                isValid = true;
        }

        return isValid;
    }

    private _getQuestion(key: string): Question {
        const question = this.questions.find(q => q.key === key);

        if (!question) {
            throw new Error(`The key ${key} is not matched with any question`);
        }

        return question;
    }
}
