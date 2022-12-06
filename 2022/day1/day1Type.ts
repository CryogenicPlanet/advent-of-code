import { Comparator, Comparison } from "../helpers/comparator";
import { Sum } from "../helpers/sum";

type Input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

type ToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

type GetElves<T extends string> = T extends `${infer First}\n\n${infer Rest}`
  ? [First, ...GetElves<Rest>]
  : [T];

type ParseElf<T extends string> = T extends `${infer First}\n${infer Rest}`
  ? [ToNumber<First>, ...ParseElf<Rest>]
  : [ToNumber<T>];
type ParseElves<T extends string[]> = T extends [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends string[]
      ? [ParseElf<First>, ...ParseElves<Rest>]
      : never
    : never
  : [];

type SumElf<T extends number[]> = T extends [infer First, ...infer Rest]
  ? First extends number
    ? Rest extends number[]
      ? Sum<First, SumElf<Rest>>
      : never
    : never
  : 0;

type SumElves<T extends number[][]> = T extends [infer First, ...infer Rest]
  ? First extends number[]
    ? Rest extends number[][]
      ? [SumElf<First>, ...SumElves<Rest>]
      : never
    : never
  : [];

type ArrToNum<T extends string[]> = T extends [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends string[]
      ? [ToNumber<First>, ...ArrToNum<Rest>]
      : never
    : never
  : [];

type ParsedInput = ArrToNum<SumElves<ParseElves<GetElves<Input>>>>;

type Max<T extends number[], cMax extends number> = T extends [
  infer First extends number,
  ...infer Rest extends number[]
]
  ? Comparator<First, cMax> extends Comparison.Greater
    ? Max<Rest, First>
    : Max<Rest, cMax>
  : cMax;

type MaxElves = Max<ParsedInput, 0>;
