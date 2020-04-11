const capitalize = require('../lab1/1.js');

test('capitalize 1', () => {
    expect(capitalize('я вижу солнце')).toBe('Я Вижу Солнце вввв');
});

test('capitalize 2', () => {
    expect(capitalize('я Вижу солнце')).toBe('Я Вижу Солнце ввв');
});
