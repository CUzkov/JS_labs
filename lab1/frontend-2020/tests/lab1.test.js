const capitalize = require('../lab1/1.js');
const getMinMax = require('../lab1/2.js');
const multiplyArray = require('../lab1/3.js');

test('capitalize 1', () => {
    expect(capitalize('я вижу солнце')).toBe('Я Вижу Солнце');
});

test('capitalize 2', () => {
    expect(capitalize('я Вижу солнце')).toBe('Я Вижу Солнце');
});

test('getMinMax 1', () => {
    expect(getMinMax('22 и 3.35, -2, 28 0, а потом 13, может 1.2 и -134')).toEqual({ min: -134, max: 28 });
});

test('getMinMax 2', () => {
    expect(getMinMax('-2.5 ddd 1 nfuey 222.345 w 0')).toEqual({ min: -2.5, max: 222.345 });
});

test('multiplyArray 1', () => {
    expect(multiplyArray([1, 2, 3, 'ddd', { min: 1 }, 22, false], 2)).toEqual([2, 4, 6, 'ddd', { min: 1 }, 44, false]);
});

test('multiplyArray 2', () => {
    expect(multiplyArray([false, false], 2)).toEqual([false, false]);
});

test('multiplyArray 3', () => {
    expect(multiplyArray([false, false, 2, 3], 2)).toEqual([false, false, 4, 6]);
});
