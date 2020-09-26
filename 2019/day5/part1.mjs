// import fs from "fs";
const fs = require("fs");

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
    case 3: {
      // Input
    }
    case 4: {
      // Ouput
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

const parseInstruction = (instruction) => {
  const strInts = str(instruction);
  const length = strInts.length;
  const opCode = int(strInts.slice(length - 2, length));
  const parameterModes = [];
  const parameters = strInts.slice(0, length - 1);
  for (let param of parameters.split("").reverse()) {
    parameterModes.push(int(param));
  }
  return {
    length,
    opCode,
    parameterModes,
  };
};

const file = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const line = file.toString();
// const line = "1,1,1,4,99,5,6,0,99";
// console.log(line);

let arr = line.split(",").map(function (item) {
  return parseInt(item, 10);
});
const length = arr.length;

for (let i = 0; i < length; ) {
  const { opCode, length, parameterModes } = parseInstruction(arr[i]);

  // const val1 = arr[arr[i + 1]];
  // const val2 = arr[arr[i + 2]];
  // const opCode = arr[i];

  arr = intProgram(opCode, val1, val2, arr[i + 3], arr);
}

console.log("fin");
