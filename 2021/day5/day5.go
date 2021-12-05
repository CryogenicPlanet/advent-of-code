package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func abs(x, y int) int {
	if x < y {
		return y - x
	}
	return x - y
}

func getLineSegments() ([][2][2]int, [2][2]int) {

	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	minX := 0
	maxX := 0
	minY := 0
	maxY := 0

	lineSegments := [][2][2]int{}

	for scanner.Scan() {
		line := scanner.Text()

		splits := strings.Split(line, "->")
		from := strings.Split(splits[0], ",")
		to := strings.Split(splits[1], ",")

		fromX, err := strconv.Atoi(strings.TrimSpace(from[0]))
		if err != nil {
			panic(err)
		}
		minX = min(minX, fromX)
		maxX = max(maxX, fromX)

		fromY, err := strconv.Atoi(strings.TrimSpace(from[1]))
		if err != nil {
			panic(err)
		}
		minY = min(minY, fromY)
		maxY = max(maxY, fromY)

		toX, err := strconv.Atoi(strings.TrimSpace(to[0]))
		if err != nil {
			panic(err)
		}
		minX = min(minX, toX)
		maxX = max(maxX, toX)

		toY, err := strconv.Atoi(strings.TrimSpace(to[1]))
		if err != nil {
			panic(err)
		}
		minY = min(minY, toY)
		maxY = max(maxY, toY)

		lineSegment := [2][2]int{{fromX, fromY}, {toX, toY}}

		lineSegments = append(lineSegments, lineSegment)

	}
	return lineSegments, [2][2]int{{minX, maxX}, {minY, maxY}}
}

func part1() {

	lineSegments, minMax := getLineSegments()

	minMaxX := minMax[0]
	minMaxY := minMax[1]

	maxX := minMaxX[1]

	maxY := minMaxY[1]

	matrix := make([][]int, maxY+1)
	for i := range matrix {
		matrix[i] = make([]int, maxX+1)
	}

	for _, lineSegment := range lineSegments {
		from := lineSegment[0]
		to := lineSegment[1]

		if from[0] == to[0] {
			// Vertical line
			x := from[0]
			start := from[1]
			end := to[1]
			if to[1] < from[1] {
				start = to[1]
				end = from[1]
			}

			// fmt.Println("Vertical line", from, to)

			idx := start
			for idx <= end {
				matrix[idx][x] += 1
				idx++
			}

		} else if from[1] == to[1] {
			// Horizontal  line
			y := from[1]
			start := from[0]
			end := to[0]
			if to[0] < from[0] {
				start = to[0]
				end = from[0]
			}

			idx := start

			// fmt.Println("Horizontal line", from, to)
			// fmt.Println("Hoz line", start, end)
			for idx <= end {
				matrix[y][idx] += 1
				idx++
			}
		}

	}

	greaterThanOne := 0

	for _, row := range matrix {
		for _, val := range row {
			if val > 1 {
				greaterThanOne++
			}
			if val == 0 {
				// fmt.Print(". ")
			} else {
				// fmt.Print(val, " ")
			}
		}
		// fmt.Println()
	}

	fmt.Println("Part one :	", greaterThanOne)
}

func part2() {

	lineSegments, minMax := getLineSegments()

	minMaxX := minMax[0]
	minMaxY := minMax[1]

	maxX := minMaxX[1]

	maxY := minMaxY[1]

	matrix := make([][]int, maxY+1)
	for i := range matrix {
		matrix[i] = make([]int, maxX+1)
	}

	for _, lineSegment := range lineSegments {
		from := lineSegment[0]
		to := lineSegment[1]

		if from[0] == to[0] {
			// Vertical line
			x := from[0]
			start := from[1]
			end := to[1]
			if to[1] < from[1] {
				start = to[1]
				end = from[1]
			}

			// fmt.Println("Vertical line", from, to)

			idx := start
			for idx <= end {
				matrix[idx][x] += 1
				idx++
			}

		} else if from[1] == to[1] {
			// Horizontal  line
			y := from[1]
			start := from[0]
			end := to[0]
			if to[0] < from[0] {
				start = to[0]
				end = from[0]
			}

			idx := start

			// fmt.Println("Horizontal line", from, to)
			// fmt.Println("Hoz line", start, end)
			for idx <= end {
				matrix[y][idx] += 1
				idx++
			}
		} else if abs(from[1], to[1]) == abs(from[0], to[0]) {
			// Diagonal line

			// fmt.Println("Diagonal line", from, to)

			xStart := from[0]
			xEnd := to[0]

			yStart := from[1]
			yEnd := to[1]
			idX := xStart
			idY := yStart

			if to[0] < from[0] {

				if to[1] < from[1] {

					for idX >= xEnd && idY >= yEnd {
						// fmt.Println("IdX", idX, "IdY", idY)

						matrix[idY][idX] += 1
						idX--
						idY--
					}
				} else {

					for idX >= xEnd && idY <= yEnd {
						// fmt.Println("IdX", idX, "IdY", idY)

						matrix[idY][idX] += 1
						idX--
						idY++
					}
				}
			} else {
				if to[1] < from[1] {

					for idX <= xEnd && idY >= yEnd {
						// fmt.Println("IdX", idX, "IdY", idY)

						matrix[idY][idX] += 1
						idX++
						idY--
					}
				} else {

					for idX <= xEnd && idY <= yEnd {
						// fmt.Println("IdX", idX, "IdY", idY)

						matrix[idY][idX] += 1
						idX++
						idY++
					}
				}
			}

		}

	}

	greaterThanOne := 0

	for _, row := range matrix {
		for _, val := range row {
			if val > 1 {
				greaterThanOne++
			}
			if val == 0 {
				// fmt.Print(". ")
			} else {
				// fmt.Print(val, " ")
			}
		}
		// fmt.Println()
	}

	fmt.Println("Part two :	", greaterThanOne)
}

func main() {
	// part1()
	part2()
}
