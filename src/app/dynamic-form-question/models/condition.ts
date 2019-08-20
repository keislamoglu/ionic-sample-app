export enum Comparison {
    IsEmpty,
    IsEqual,
    IsNotNull,
    IsGreaterThan,
    IsLowerThan,
    IsGreaterThanOrEqualTo,
    IsLowerThanOrEqualTo
}

export interface Condition {
    /**
     * The key of the question to be compared
     */
    question: string;

    /**
     * Comparison type
     */
    comparison: Comparison;
}
