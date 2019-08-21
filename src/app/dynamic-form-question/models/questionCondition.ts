export enum Comparison {
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
     * Comparison type
     */
    comparison: Comparison;
}
