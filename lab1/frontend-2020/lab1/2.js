/**
 * Напишите функцию getMinMax(str),
 * на вход в функцию подается строка str
 * числа в строке выделяются пробелами или знаками препинания
 * необходимо найти минимальное и максимальное число в строке
 * вернуть в формате {min: 1, max: 22}
 * Примеры:
 * '22 и 3.35, -2, 28, а потом 13, может 1.2 и -134' -> {min: -134, max: 28}
 */

function getMinMax(str) {
  //больше 100 символов в строчку нельзя?
  mass = str.split(/[ ,!?]/).map(index => parseFloat(index, 10)).filter(index => !isNaN(index) && typeof index === 'number');
  return { min: Math.min(...mass), max: Math.max(...mass) };
}

module.exports = getMinMax;
