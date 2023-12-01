import { readFile } from "fs/promises";

// const input = `    [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2`;
const input = await readFile("input.txt", "utf-8");

const [startingGrid, moves] = input.split("\n\n");

// Parse Grid
/**
[G]                 [D] [R]        
[W]         [V]     [C] [T] [M]    
[L]         [P] [Z] [Q] [F] [V]    
[J]         [S] [D] [J] [M] [T] [V]
[B]     [M] [H] [L] [Z] [J] [B] [S]
[R] [C] [T] [C] [T] [R] [D] [R] [D]
[T] [W] [Z] [T] [P] [B] [B] [H] [P]
[D] [S] [R] [D] [G] [F] [S] [L] [Q]
 1   2   3   4   5   6   7   8   9 
 */

const gridInputLines = startingGrid.split("\n");
const indexLine = gridInputLines.pop();

const keys: number[] = indexLine.split("   ").map((key) => parseInt(key));

const columns: Record<number, string[]> = {};
keys.forEach((key) => {
  columns[key] = [];
});

for (const line of gridInputLines) {
  const values = line.split("");
  let idx = 1;
  for (let i = 0; i < values.length; ) {
    let firstVal = values[i];
    if (firstVal === "[") {
      columns[idx].push(values[i + 1]);
      i += 4;
      idx++;
    } else {
      i += 4;
      idx++;
    }
  }
}
console.log(columns);

// Parse Moves
// move 1 from 3 to 5

const movesArray: { quantity: number; from: number; to: number }[] = [];
for (const move of moves.split("\n")) {
  const [_, quantity, from, to] = move.match(/move (\d+) from (\d+) to (\d+)/);
  movesArray.push({
    quantity: parseInt(quantity),
    from: parseInt(from),
    to: parseInt(to),
  });
}

// Apply Moves

const part1 = () => {
  for (const move of movesArray) {
    const { quantity, from, to } = move;
    const fromColumn = columns[from];
    const toColumn = columns[to];

    for (let i = 0; i < quantity; i++) {
      const topVal = fromColumn.shift();
      toColumn.unshift(topVal);
    }

    console.log({ toColumn, fromColumn, move });
  }

  const topRow = keys.map((key) => columns[key][0]);

  console.log(topRow.join(""));
};

const part2 = () => {
  for (const move of movesArray) {
    const { quantity, from, to } = move;
    const fromColumn = columns[from];
    const toColumn = columns[to];

    const toMove = fromColumn.splice(0, quantity);
    toColumn.unshift(...toMove);
  }

  const topRow = keys.map((key) => columns[key][0]);

  console.log(topRow.join(""));
};

part2();
