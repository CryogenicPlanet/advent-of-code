function findBestSpot(grid: number[][]): number {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  // Create a 2D array of the same size as the grid to store the maximum viewing distance from each location
  const maxViewingDistance = create2DArray(gridWidth, gridHeight);

  // Iterate over each row of the grid
  for (let i = 0; i < gridHeight; i++) {
    // Keep track of the tallest tree in the current row
    let maxHeight = 0;

    // Iterate over each column of the current row
    for (let j = 0; j < gridWidth; j++) {
      // If the current tree is taller than the tallest tree so far, its maximum viewing distance is 1
      if (grid[i][j] > maxHeight) {
        maxViewingDistance[i][j] = 1;
        maxHeight = grid[i][j];
      }
    }

    // Reset the maximum height for the next iteration
    maxHeight = 0;

    // Iterate over the columns in reverse order
    for (let j = gridWidth - 1; j >= 0; j--) {
      // If the current tree is taller than the tallest tree so far, its maximum viewing distance is 1
      if (grid[i][j] > maxHeight) {
        maxViewingDistance[i][j] = 1;
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
      // If the current tree is taller than the tallest tree so far, its maximum viewing distance is 1
      if (grid[i][j] > maxHeight) {
        maxViewingDistance[i][j] = 1;
        maxHeight = grid[i][j];
      }
    }

    // Reset the maximum height for the next iteration
    maxHeight = 0;

    // Iterate over the rows in reverse order
    for (let i = gridHeight - 1; i >= 0; i--) {
      // If the current tree is taller than the tallest tree so far, its maximum viewing distance is 1
      if (grid[i][j] > maxHeight) {
        maxViewingDistance[i][j] = 1;
        maxHeight = grid[i][j];
      }
    }
  }

  // Initialize the maximum scenic score to 0
  let maxScenicScore = 0;

  // Iterate over each tree in the grid
  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      // Calculate the scenic score for the current tree
      let scenicScore = maxViewingDistance[i][j];

      // If the current tree is not visible from the left, calculate its viewing distance from the left
      if (maxViewingDistance[i][j] == 0) {
        let k = j - 1;
        while (k >= 0 && grid[i][k] <= grid[i][j]) {
          k -= 1;
        }
        scenicScore = Math.max(scenicScore, j - k);
      }

      // If the current tree is not visible from the right, calculate its viewing distance from the right
      if (maxViewingDistance[i][j] == 0) {
        let k = j + 1;
        while (k < gridWidth && grid[i][k] <= grid[i][j]) {
          k += 1;
        }
        scenicScore = Math.max(scenicScore, k - j);
      }

      // If the current tree is not visible from the top, calculate its viewing distance from the top
      if (maxViewingDistance[i][j] == 0) {
        let k = i - 1;
        while (k >= 0 && grid[k][j] <= grid[i][j]) {
          k -= 1;
        }
        scenicScore = Math.max(scenicScore, i - k);
      }

      // If the current tree is not visible from the bottom, calculate its viewing distance from the bottom
      if (maxViewingDistance[i][j] == 0) {
        let k = i + 1;

        // Calculate the scenic score for the current tree
        let scenicScore = maxViewingDistance[i][j];

        // If the current tree is not visible from the left, calculate its viewing distance from the left
        if (maxViewingDistance[i][j] == 0) {
          let k = j - 1;
          while (k >= 0 && grid[i][k] <= grid[i][j]) {
            k -= 1;
          }
          scenicScore = Math.max(scenicScore, j - k);
        }

        // If the current tree is not visible from the right, calculate its viewing distance from the right
        if (maxViewingDistance[i][j] == 0) {
          let k = j + 1;
          while (k < gridWidth && grid[i][k] <= grid[i][j]) {
            k += 1;
          }
          scenicScore = Math.max(scenicScore, k - j);
        }

        // If the current tree is not visible from the top, calculate its viewing distance from the top
        if (maxViewingDistance[i][j] == 0) {
          let k = i - 1;
          while (k >= 0 && grid[k][j] <= grid[i][j]) {
            k -= 1;
          }
          scenicScore = Math.max(scenicScore, i - k);
        }

        // If the current tree is not visible from the bottom, calculate its viewing distance from the bottom
        if (maxViewingDistance[i][j] == 0) {
          let k = i + 1;
          while (k < gridHeight && grid[k][j] <= grid[i][j]) {
            k += 1;
          }
          scenicScore = Math.max(scenicScore, k - i);
        }

        // Update the maximum scenic score if necessary
        maxScenicScore = Math.max(maxScenicScore, scenicScore);
      }
    }

    // Return the maximum scenic score
    return maxScenicScore;
  }
}

// Helper function to create a 2D array with the given dimensions
function create2DArray(width: number, height: number): number[][] {
  const array = [];
  for (let i = 0; i < height; i++) {
    array.push(new Array(width).fill(0));
  }
  return array;
}

const grid = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];
const score = findBestSpot(grid);
console.log(score); // 8
