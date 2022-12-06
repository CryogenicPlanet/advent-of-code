import { readFile } from "fs/promises";

const input = await readFile("input.txt", "utf-8");

const part1 = () => {
  const rugsacks: [first: string, second: string][] = input
    .split("\n")
    .map((line) => {
      const length = line.length;
      const half = Math.floor(length / 2);
      const first = line.slice(0, half);
      const second = line.slice(half, length);
      return [first, second];
    });

  let sum = 0;

  for (const rugsack of rugsacks) {
    const [first, second] = rugsack;
    const set = new Set(first);
    for (const char of second) {
      if (set.has(char)) {
        const ascii = char.charCodeAt(0);
        // a-z = 1-26
        // A-Z = 27-52
        const val = ascii > 96 ? ascii - 96 : ascii - 38;
        sum += val;
        break;
      }
    }
  }

  console.log(sum);
};

const part2 = () => {
  const rugsacks: string[] = input.split("\n");
  // group of 3 rugsacks each
  const groups: [first: string, second: string, third: string][] = [];
  for (let i = 0; i < rugsacks.length; i += 3) {
    groups.push([rugsacks[i], rugsacks[i + 1], rugsacks[i + 2]]);
  }
  let sum = 0;

  for (const group of groups) {
    const [first, second, third] = group;
    const firstSet = new Set(first);
    const secondSet = new Set(second);
    for (const char of third) {
      if (firstSet.has(char) && secondSet.has(char)) {
        const ascii = char.charCodeAt(0);
        // a-z = 1-26
        // A-Z = 27-52
        const val = ascii > 96 ? ascii - 96 : ascii - 38;
        sum += val;
        break;
      }
    }
  }

  console.log(sum);
};

part2();
