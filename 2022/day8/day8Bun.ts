// const input = `30373
// 25512
// 65332
// 33549
// 35390`;

import { readFile } from "fs/promises";

const input = await readFile("input.txt", "utf-8");

const grid = input
  .split(`\n`)
  .map((row) => row.split(``))
  .map((row) => row.map((cell) => parseInt(cell)));

const rows = input.split(`\n`);

type GridIdx = `${number}${number}`;
const rowMax: Record<GridIdx, { left: number; right: number }> = {};
const colMax: Record<GridIdx, { top: number; bottom: number }> = {};

// const rowMax: Record<number, { left: number; right: number }> = {};

for (let i = 0; i < grid.length; i++) {
  const row = grid[i];
  let left = 0;
  let right = 0;
  for (const [idx, val] of row.entries()) {
    if (val > left) {
      left = val;
    }
    right = Math.max(...row.slice(idx));
    rowMax[`${i}${idx}`] = { left, right };
  }
}

const columnSlice = (
  grid: number[][],
  col: number,
  start: number
): number[] => {
  const slice = [];
  for (let i = start; i < grid.length; i++) {
    slice.push(grid[i][col]);
  }
  return slice;
};

for (let j = 0; j < grid[0].length; j++) {
  let top = 0;
  let bottom = 0;
  for (let i = 0; i < grid.length; i++) {
    const val = grid[i][j];
    if (val > top) {
      top = val;
    }
    bottom = Math.max(...columnSlice(grid, j, i));
    colMax[`${i}${j}`] = { top, bottom };
  }
}

let count = 0;

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[0].length - 1; j++) {
    const val = grid[i][j];
    const { left, right } = rowMax[`${i}${j}`];
    const { top, bottom } = colMax[`${i}${j}`];

    // console.log({ val, left, right, top, bottom, i, j });
    // Val greater than any of its neighbors
    if (val >= left || val > right || val >= top || val > bottom) {
      //   console.log("visible", { val, left, right, top, bottom, i, j });
      count++;
    }
  }
}

// console.log({ count });

count += 2 * (grid.length - 1) + 2 * (grid[0].length - 1);

console.log({ count });
