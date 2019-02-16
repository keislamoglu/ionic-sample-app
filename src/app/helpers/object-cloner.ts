export function clone<T>(object: T): T {
    return {...object as Object} as T;
}
