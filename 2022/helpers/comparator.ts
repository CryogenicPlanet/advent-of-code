// I didn't write this
// Credit: https://github.com/type-challenges/type-challenges/issues/11444
export type Comparator<
  A extends number,
  B extends number
> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? ComparePositives<AbsB, AbsA>
    : Comparison.Lower
  : `${B}` extends `-${number}`
  ? Comparison.Greater
  : ComparePositives<`${A}`, `${B}`>;

type ComparePositives<
  A extends string,
  B extends string,
  ByLength = CompareByLength<A, B>
> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

type CompareByLength<
  A extends string,
  B extends string
> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareByLength<AR, BR>
    : Comparison.Greater
  : B extends `${infer BF}${infer BR}`
  ? Comparison.Lower
  : Comparison.Equal;

type CompareByDigits<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
  ? CompareDigits<AF, BF> extends Comparison.Equal
    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>
  : Comparison.Equal;

type CompareDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : "0123456789" extends `${string}${A}${string}${B}${string}`
  ? Comparison.Lower
  : Comparison.Greater;

export enum Comparison {
  Greater,
  Equal,
  Lower,
}
