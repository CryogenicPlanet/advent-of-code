// I didn't write this
// Credit: https://github.com/type-challenges/type-challenges/issues/778

// Programmatically mapping numbers from 0 to 9 to arrays of matching length
type CreateNumbersMap0_9<Arr extends any[] = []> =
  `${Arr["length"]}` extends `${any}${infer R}`
    ? R extends ""
      ? [Arr, ...CreateNumbersMap0_9<[...Arr, any]>]
      : []
    : never;

// Create the map
type NumbersMap0_9 = CreateNumbersMap0_9;

// Type of single digits
type Digit = keyof NumbersMap0_9 extends infer K
  ? K extends `${number}`
    ? K
    : never
  : never;

// Implementation of sum of single digits
type SumOneDigit<A extends Digit, B extends Digit, Adj extends any[]> = [
  ...NumbersMap0_9[A],
  ...NumbersMap0_9[B],
  ...Adj
] extends infer Result
  ? Result extends [...NumbersMap0_9[9], any, ...infer Over]
    ? [Over, [any]]
    : [Result, []]
  : never;

// Split string of number extracting last digit
type SplitOnLastDigit<S extends string> = S extends `${infer Pre}${Digit}`
  ? S extends `${Pre}${infer D}`
    ? [Pre, D]
    : never
  : never;

type StringGuard<X extends string> = X;
type DigitGuard<X extends Digit> = X;
type ArrayGuard<X extends any[]> = X;

// Implementation of sum of reverted strings. Adj parameter keeps in memory currying number
type SumImpl<A extends string, B extends string, Adj extends any[] = []> = [
  ...SplitOnLastDigit<A>,
  ...SplitOnLastDigit<B>
] extends infer CheckSplit
  ? [CheckSplit] extends [never]
    ? Adj extends [any]
      ? SumImpl<`${A}${B}`, "1">
      : `${A}${B}`
    : CheckSplit extends [
        StringGuard<infer ARest>,
        DigitGuard<infer AD>,
        StringGuard<infer BRest>,
        DigitGuard<infer BD>
      ]
    ? SumOneDigit<AD, BD, Adj> extends [
        ArrayGuard<infer Result>,
        ArrayGuard<infer CalcAdj>
      ]
      ? `${SumImpl<ARest, BRest, CalcAdj>}${Result["length"]}`
      : never
    : never
  : never;

export type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = SumImpl<`${A}`, `${B}`>;
