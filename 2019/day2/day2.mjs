import fs from "fs";

const intProgram = (opCode, val1, val2, outPos, arr) => {
  switch (opCode) {
    case 1: {
      // Addition
      const output = val1 + val2;
      arr[outPos] = output;
      return arr;
    }
    case 2: {
      // Multiplcation
      const output = val1 * val2;
      arr[outPos] = output;
      return arr;
    }
    case 99: {
      // Break
      return -1;
    }
    default: {
      return arr;
    }
  }
};

const file = fs.readFileSync("input.txt", "utf-8");

const line = file.toString();
// const line = "1,1,1,4,99,5,6,0,99";
// console.log(line);

let arr = line.split(",").map(function (item) {
  return parseInt(item, 10);
});
const length = arr.length;

const originalArr = arr;

const globalMemory = {};

for (let x = 0; x < 99; x++) {
  for (let y = 0; y < 99; y++) {
    arr[1] = x;
    arr[2] = y;
    // console.log(memory);
    // console.log("Yvalue", arr[y]);
    let unknown = true;
    if (arr[x] in globalMemory) {
      // console.log("X in memory");
      if (arr[y] in globalMemory[arr[x]]) {
        // console.log("Known!");
        unknown = false;
      }
    }

    if (unknown) {
      for (let i = 0; i < length; i += 4) {
        const val1 = arr[arr[i + 1]];
        const val2 = arr[arr[i + 2]];
        const opCode = arr[i];

        let newArr = intProgram(opCode, val1, val2, arr[i + 3], arr);
        if (newArr == -1) {
          // console.log(arr);
          if (arr[0] === 19690720) {
            console.log("Sucess with noun + verb", 100 * x + y);
          }
          arr = originalArr;

          globalMemory[arr[x]] = { ...globalMemory[arr[x]], [arr[y]]: false };
        } else {
          // console.log(newArr);

          arr = newArr;
        }
      }
    }
  }
}
