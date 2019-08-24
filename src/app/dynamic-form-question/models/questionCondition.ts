export enum Condition {
    IsEmpty,
    IsEqual,
    IsNotNull,
    IsGreaterThan,
    IsLowerThan,
    IsGreaterThanOrEqualTo,
    IsLowerThanOrEqualTo
}

export interface QuestionCondition {
    /**
     * The key of the question to be compared
     */
    question: string;

    /**
     * Condition type
     */
    condition: Condition;
}
