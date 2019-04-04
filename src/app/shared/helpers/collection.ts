export function getGrouped<T>(collection: T[], per: number) {
    const groupedCollection: Array<T[]> = [];
    const loopCount = Math.ceil(collection.length / per);
    for (let i = 0; i < loopCount; i++) {
        groupedCollection.push(collection.slice(i * per, (i + 1) * per));
    }

    return groupedCollection;
}
