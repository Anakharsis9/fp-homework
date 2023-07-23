import {
  allPass,
  anyPass,
  propEq,
  filter,
  equals,
  length,
  gte,
  pipe,
  complement,
  head,
  all
} from "ramda";
import { SHAPES, COLORS } from "../constants";

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  const isWhiteTriangle = propEq("triangle", "white");
  const isWhiteCircle = propEq("circle", "white");
  const isRedStar = propEq("star", "red");
  const isGreenSquare = propEq("square", "green");

  const isWhiteTriangleAndCircle = allPass([isWhiteTriangle, isWhiteCircle]);
  const isRedStarAndGreenSquare = allPass([isRedStar, isGreenSquare]);

  return (
    isWhiteTriangleAndCircle({ triangle, circle }) &&
    isRedStarAndGreenSquare({ star, square })
  );
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
  const figures = [star, square, triangle, circle];
  const greenFiguresCount = pipe(filter(equals("green")), length)(figures);

  return gte(greenFiguresCount, 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
  const figures = [star, square, triangle, circle];
  const redFiguresCount = pipe(filter(equals("red")), length)(figures);
  const blueFiguresCount = pipe(filter(equals("blue")), length)(figures);

  return redFiguresCount === blueFiguresCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) => {
  const hasBlueCircle = equals(circle, "blue");
  const hasRedStar = equals(star, "red");
  const hasOrangeSquare = equals(square, "orange");

  return hasBlueCircle && hasRedStar && hasOrangeSquare;
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
  const figures = [star, square, triangle, circle];
  const nonWhiteFigures = pipe(filter(complement(equals("white"))))(figures);

  const nonWhiteFiguresCount = nonWhiteFigures.length;

  const isFiguresCountEnough = gte(nonWhiteFiguresCount, 3);
  const firstFigureColor = head(nonWhiteFigures);

  const allFiguresSameColor = all(equals(firstFigureColor))(nonWhiteFigures);

  return isFiguresCountEnough && allFiguresSameColor;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
  const figures = [star, square, triangle, circle];

  const triangleIsGreen = triangle === "green";
  if (!triangleIsGreen) return false;

  const greenFiguresCount = pipe(filter(equals("green")), length)(figures);
  if (greenFiguresCount !== 2) return false;

  const redFiguresCount = pipe(filter(equals("red")), length)(figures);
  if (redFiguresCount !== 1) return false;

  const notGreenAndRedFiguresCount = pipe(
    filter(complement(equals("red"))),
    filter(complement(equals("green"))),
    length
  )(figures);
  
  return notGreenAndRedFiguresCount === 1;
};

// 7. Все фигуры оранжевые.

export const validateFieldN7 = ({ star, square, triangle, circle }) => {
  const figures = [star, square, triangle, circle];
  const isFigureOrange = equals("orange");
  const isAllFiguresOrange = all(isFigureOrange)(figures);
  return isAllFiguresOrange;
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star, square, triangle, circle }) => {
  return star !== "red" && star !== "white";
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) => {
  const figures = [star, square, triangle, circle];
  const isFigureGreen = equals("green");
  const isAllFiguresGreen = all(isFigureGreen)(figures);
  return isAllFiguresGreen;
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ star, square, triangle, circle }) => {
  const isTriangleAndSquareSameColor = triangle === square;
  return isTriangleAndSquareSameColor && triangle !== "white";
};
