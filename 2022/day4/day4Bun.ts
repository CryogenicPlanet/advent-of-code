import { readFile } from "fs/promises";
const input = await readFile("input.txt", "utf-8");

const part1 = () => {
  const sections: [
    [start: number, end: number],
    [start: number, end: number]
  ][] = input.split("\n").map((section) => {
    const [first, second] = section.split(",");
    const [firstStart, firstEnd] = first.split("-").map(Number);
    const [secondStart, secondEnd] = second.split("-").map(Number);
    return [
      [firstStart, firstEnd],
      [secondStart, secondEnd],
    ];
  });

  let overlaps = 0;
  for (const section of sections) {
    const [first, second] = section;

    const [firstStart, firstEnd] = first;
    const [secondStart, secondEnd] = second;

    // Check if first is fully contained within second
    if (firstStart >= secondStart && firstEnd <= secondEnd) {
      overlaps++;
    } else if (secondStart >= firstStart && secondEnd <= firstEnd) {
      overlaps++;
    }
  }
  console.log({ overlaps });
};

const part2 = () => {
  const sections: [
    [start: number, end: number],
    [start: number, end: number]
  ][] = input.split("\n").map((section) => {
    const [first, second] = section.split(",");
    const [firstStart, firstEnd] = first.split("-").map(Number);
    const [secondStart, secondEnd] = second.split("-").map(Number);
    return [
      [firstStart, firstEnd],
      [secondStart, secondEnd],
    ];
  });

  let overlaps = 0;
  for (const section of sections) {
    const [first, second] = section;

    const [firstStart, firstEnd] = first;
    const [secondStart, secondEnd] = second;
    if (firstStart <= secondStart && secondStart <= firstEnd) {
      overlaps++;
    } else if (firstStart <= secondEnd && secondEnd <= firstEnd) {
      overlaps++;
    } else if (secondStart <= firstStart && firstStart <= secondEnd) {
      overlaps++;
    } else if (secondStart <= firstEnd && firstEnd <= secondEnd) {
      overlaps++;
    }
  }
  console.log({ overlaps });
};
