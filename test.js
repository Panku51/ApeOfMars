const randomizeIndex = (count) => {
    return Math.floor(count * Math.random());
};

const randomizeElemnts = (array, count) => {
    if (count > array.length) {
        throw new Error('Array size cannot be smaller than expected random numbers count.');
    }
    const result = [];
    const guardian = new Set();
    while (result.length < count) {
        const index = randomizeIndex(count);
        if (guardian.has(index)) {
            continue;
        }
        const element = array[index];
        guardian.add(index);
        result.push(element);
    }
    return result;
};


// Usage example:

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const element = randomizeElemnts(array, 5);

console.log(element);  // Example output: [2, 0, 4, 3, 1]
