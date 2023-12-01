import { readFile } from "node:fs/promises";

// const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
const input = await readFile("input.txt", "utf-8");

const part1 = () => {
  const [a, b, c, d] = input;

  const buffer: [string, string, string, string] = [a, b, c, d];

  const checkNextVal = (val: string): boolean => {
    const set = new Set(buffer);

    if (set.has(val)) return false;
    if (set.size !== 4) return false;

    return true;
  };

  let i = 4;

  if (checkNextVal(d)) {
    console.log(4);
  } else {
    for (const char of input.slice(4)) {
      if (checkNextVal(char)) {
        console.log(i);
        break;
      }
      buffer.shift();
      buffer.push(char);
      i++;
    }
  }
};

const part2 = () => {
  const NUM = 14;

  const buffer = input.slice(0, NUM).split("");

  const checkNextVal = (val: string): boolean => {
    const set = new Set(buffer);

    if (set.has(val)) return false;
    if (set.size !== NUM) return false;

    return true;
  };

  let i = NUM;

  if (checkNextVal(input[NUM - 1])) {
    console.log(NUM);
  } else {
    for (const char of input.slice(NUM)) {
      if (checkNextVal(char)) {
        console.log(i);
        break;
      }
      buffer.shift();
      buffer.push(char);
      i++;
    }
  }
};

part2();
