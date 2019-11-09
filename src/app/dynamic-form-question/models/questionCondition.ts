export enum Condition {
    IsEmpty,
    IsEqual,
    IsNotNull,
    IsGreaterThan,
    IsLowerThan,
    IsGreaterThanOrEqualTo,
    IsLowerThanOrEqualTo
}

export interface QuestionCondition<K = string> {
    /**
     * The key of the question to be compared
     */
    question: K;

    /**
     * Condition type
     */
    condition: Condition;

    /**
     * The value to be compared with the relevant question's value.
     * If this value is set, the value of the question which has this condition will be ignored.
     */
    compareValue?: string;
}
