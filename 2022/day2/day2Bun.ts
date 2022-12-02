import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf8");
// Line:
// A X

// PARSE LINES
const lines = input.split("\n");
const parsedLines = lines.map((line) => {
	const [optMove, myMove] = line.split(" ");
	return { optMove, myMove };
});

const part1 = () => {
	// Part 1
	let score = 0;
	for (const { optMove, myMove } of parsedLines) {
		let rockPaperScissors =
			optMove === "A" ? "Rock" : optMove === "B" ? "Paper" : "Scissors";
		let myMoveRockPaperScissors =
			myMove === "X" ? "Rock" : myMove === "Y" ? "Paper" : "Scissors";

		if (rockPaperScissors === myMoveRockPaperScissors) {
			score += 3;
		} else if (
			(rockPaperScissors === "Rock" &&
				myMoveRockPaperScissors === "Scissors") ||
			(rockPaperScissors === "Paper" && myMoveRockPaperScissors === "Rock") ||
			(rockPaperScissors === "Scissors" && myMoveRockPaperScissors === "Paper")
		) {
			score += 0;
		} else {
			score += 6;
		}

		if (myMoveRockPaperScissors === "Rock") {
			score += 1;
		} else if (myMoveRockPaperScissors === "Paper") {
			score += 2;
		} else {
			score += 3;
		}
	}
	console.log({ score });
};

const part2 = () => {
	let score = 0;
	for (const { optMove, myMove: myOutcome } of parsedLines) {
		let rockPaperScissors: "Rock" | "Paper" | "Scissors" =
			optMove === "A" ? "Rock" : optMove === "B" ? "Paper" : "Scissors";
		let outcome =
			myOutcome === "X" ? "Lose" : myOutcome === "Y" ? "Draw" : "Win";

		let myMove: "Rock" | "Paper" | "Scissors";

		if (outcome === "Lose") {
			myMove =
				rockPaperScissors === "Rock"
					? "Scissors"
					: rockPaperScissors === "Paper"
					? "Rock"
					: "Paper";

			score += 0;
		} else if (outcome === "Draw") {
			myMove = rockPaperScissors;
			score += 3;
		} else {
			// Outcome win
			myMove =
				rockPaperScissors === "Paper"
					? "Scissors"
					: rockPaperScissors === "Scissors"
					? "Rock"
					: "Paper";
			score += 6;
		}

		if (myMove === "Rock") {
			score += 1;
		} else if (myMove === "Paper") {
			score += 2;
		} else {
			score += 3;
		}
	}
	console.log({ score });
};

part2();
