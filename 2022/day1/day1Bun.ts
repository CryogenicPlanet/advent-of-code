import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

let elfs: number[] = [0];

let idx = 0;
for (const line of input.split("\n")) {
	if (line === "") {
		idx += 1;
		elfs.push(0);
	} else {
		elfs[idx] += parseInt(line);
	}
}

const sortedElfs = elfs.sort((a, b) => b - a);

const sum = sortedElfs[0] + sortedElfs[1] + sortedElfs[2];

console.log(sum);
