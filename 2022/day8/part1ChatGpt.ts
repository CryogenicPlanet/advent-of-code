import { readFile } from "fs/promises";

function countVisibleTrees(grid: number[][]): number {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  // Create a 2D array of the same size as the grid to store the number of visible trees from each location
  const visibleTrees = create2DArray(gridWidth, gridHeight);

  // Iterate over each row of the grid
  for (let i = 0; i < gridHeight; i++) {
    // Keep track of the tallest tree in the current row
    let maxHeight = 0;

    // Iterate over each column of the current row
    for (let j = 0; j < gridWidth; j++) {
      // If the current tree is taller than the tallest tree so far, it is visible from the left
      if (grid[i][j] > maxHeight) {
        visibleTrees[i][j] += 1;
        maxHeight = grid[i][j];
      }
    }

    // Reset the maximum height for the next iteration
    maxHeight = 0;

    // Iterate over the columns in reverse order
    for (let j = gridWidth - 1; j >= 0; j--) {
      // If the current tree is taller than the tallest tree so far, it is visible from the right
      if (grid[i][j] > maxHeight) {
        visibleTrees[i][j] += 1;
        maxHeight = grid[i][j];
      }
    }
  }

  // Iterate over each column of the grid
  for (let j = 0; j < gridWidth; j++) {
    // Keep track of the tallest tree in the current column
    let maxHeight = 0;

    // Iterate over each row of the current column
    for (let i = 0; i < gridHeight; i++) {
      // If the current tree is taller than the tallest tree so far, it is visible from the top
      if (grid[i][j] > maxHeight) {
        visibleTrees[i][j] += 1;
        maxHeight = grid[i][j];
      }
    }

    // Reset the maximum height for the next iteration
    maxHeight = 0;

    // Iterate over the rows in reverse order
    for (let i = gridHeight - 1; i >= 0; i--) {
      // If the current tree is taller than the tallest tree so far, it is visible from the bottom
      if (grid[i][j] > maxHeight) {
        visibleTrees[i][j] += 1;
        maxHeight = grid[i][j];
      }
    }
  }

  // Initialize the count of visible trees to the number of trees on the edge of the grid
  let count = gridWidth * 2 + gridHeight * 2 - 4;

  for (let i = 1; i < gridHeight - 1; i++) {
    for (let j = 1; j < gridWidth - 1; j++) {
      // If the current tree is visible from any direction, increment the count
      if (visibleTrees[i][j] > 0) {
        count += 1;
      }
    }
  }

  // Return the total count of visible trees
  return count;
}

// Helper function to create a 2D array with the given dimensions
function create2DArray(width: number, height: number): number[][] {
  const array = [];
  for (let i = 0; i < height; i++) {
    array.push(new Array(width).fill(0));
  }
  return array;
}

const input = await readFile("input.txt", "utf-8");

const grid = input
  .split(`\n`)
  .map((row) => row.split(``))
  .map((row) => row.map((cell) => parseInt(cell)));

const count = countVisibleTrees(grid);
console.log(count); // 21
