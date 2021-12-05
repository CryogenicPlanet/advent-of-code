package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func getInput() ([]int, [][][]int) {
	matrices := [][][]int{}
	bingoInput := []int{}
	matrix := [][]int{}

	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lines := []string{}

	for scanner.Scan() {
		line := scanner.Text()

		lines = append(lines, line)
	}

	firstLine := strings.Split(lines[0], ",")

	// fmt.Println("First line", lines[0], firstLine)

	for _, char := range firstLine {
		val, err := strconv.Atoi(char)
		if err != nil {
			panic(err)
		}
		bingoInput = append(bingoInput, val)
	}

	for _, line := range lines[2:] {
		if line == "" {
			matrices = append(matrices, matrix)
			// New line
			matrix = make([][]int, 0)
		} else {
			row := []int{}
			for _, char := range strings.Fields(line) {
				// fmt.Println("Char", char, "---", line)
				val, err := strconv.Atoi(char)
				if err != nil {
					panic(err)
				}
				row = append(row, val)
			}
			matrix = append(matrix, row)
		}

	}
	matrices = append(matrices, matrix)

	return bingoInput, matrices
}

func part1() {
	/*
		Val -> MatrixIndex -> RowIndex -> ColIndex
	*/
	valHashMap := map[int]map[int]map[int]map[int]bool{}
	boolMatrices := [][][]bool{}
	bingoInput, matrices := getInput()

	// fmt.Println("Matrix len", matrices)

	for mI, matrix := range matrices {

		dummyMatrix := [][]bool{}
		for rI, row := range matrix {

			dummyRow := []bool{}
			for cI, val := range row {

				if _, ok := valHashMap[val]; !ok {
					valHashMap[val] = map[int]map[int]map[int]bool{}
				}
				if _, ok := valHashMap[val][mI]; !ok {
					valHashMap[val][mI] = map[int]map[int]bool{}
				}
				if _, ok := valHashMap[val][mI][rI]; !ok {
					valHashMap[val][mI][rI] = map[int]bool{}
				}

				valHashMap[val][mI][rI][cI] = false
				dummyRow = append(dummyRow, false)
			}
			dummyMatrix = append(dummyMatrix, dummyRow)
		}
		boolMatrices = append(boolMatrices, dummyMatrix)
	}

	fmt.Println("Bool matrix len", len(boolMatrices))

	// fmt.Println("Value hash", valHashMap[14])

	for _, val := range bingoInput {
		if _, ok := valHashMap[val]; ok {
			for mI, matrix := range valHashMap[val] {
				for rI, row := range matrix {
					for cI := range row {
						// fmt.Println("Updating for value", val, "at index [", mI, "], [", rI, "], [", cI, "]")
						boolMatrices[mI][rI][cI] = true
						completedRow := true
						completedCol := true

						for _, isChecked := range boolMatrices[mI][rI] {
							if !isChecked {
								completedRow = false
							}
						}

						for bCI := range boolMatrices[mI][rI] {
							completedCol = true
							// fmt.Println("Checking col", bCI, "\n")
							for bRI := range boolMatrices[mI] {
								isChecked := boolMatrices[mI][bRI][bCI]
								// fmt.Print("(", bRI, ",", bCI, ") :", isChecked, "\t")
								if !isChecked {
									completedCol = false
								}
							}
							if completedCol {
								break
							}
							// fmt.Println("\n")
						}

						// fmt.Println("Val", val, "complete col", completedCol)

						if completedRow || completedCol {
							fmt.Println("Completed matrix:", mI, "with val:", val, "\n")
							// Finding some of unmarked values of matrix
							sum := 0
							for bRI, boolRow := range boolMatrices[mI] {
								// if bRI == rI {
								// 	fmt.Print(string("\033[32m"))
								// }
								for bCI, boolVal := range boolRow {
									if !boolVal {
										// Not checked
										fmt.Print(matrices[mI][bRI][bCI], " (O) \t")
										sum += matrices[mI][bRI][bCI]
									} else {
										fmt.Print(matrices[mI][bRI][bCI], " (X) \t")
									}
								}
								fmt.Println(string("\033[0m"))
							}
							fmt.Println("\nSum is", sum)

							fmt.Println("Part 1:", sum*val)

							// for bMI, boolMatrix := range boolMatrices {
							// 	fmt.Println("Matrix :", bMI)
							// 	for bRI, boolRow := range boolMatrix {
							// 		if bRI == rI && bMI == mI {
							// 			fmt.Print(string("\033[32m"))
							// 		}
							// 		for bCI, boolVal := range boolRow {
							// 			if !boolVal {
							// 				// Not checked
							// 				fmt.Print(matrices[bMI][bRI][bCI], " (O) \t")
							// 				// sum += matrices[mI][bRI][bCI]
							// 			} else {
							// 				fmt.Print(matrices[mI][bRI][bCI], " (X) \t")
							// 			}
							// 		}
							// 		fmt.Println(string("\033[0m"))
							// 	}
							// 	fmt.Println()
							// }

							return
						}
					}
				}
			}
		}
	}

}

func part2() {
	/*
		Val -> MatrixIndex -> RowIndex -> ColIndex
	*/
	valHashMap := map[int]map[int]map[int]map[int]bool{}
	boolMatrices := [][][]bool{}
	bingoInput, matrices := getInput()

	finishedCount := len(matrices)
	finishedMatrix := map[int]bool{}

	// fmt.Println("Matrix len", matrices)

	for mI, matrix := range matrices {

		dummyMatrix := [][]bool{}
		for rI, row := range matrix {

			dummyRow := []bool{}
			for cI, val := range row {

				if _, ok := valHashMap[val]; !ok {
					valHashMap[val] = map[int]map[int]map[int]bool{}
				}
				if _, ok := valHashMap[val][mI]; !ok {
					valHashMap[val][mI] = map[int]map[int]bool{}
				}
				if _, ok := valHashMap[val][mI][rI]; !ok {
					valHashMap[val][mI][rI] = map[int]bool{}
				}

				valHashMap[val][mI][rI][cI] = false
				dummyRow = append(dummyRow, false)
			}
			dummyMatrix = append(dummyMatrix, dummyRow)
		}
		boolMatrices = append(boolMatrices, dummyMatrix)
	}

	fmt.Println("Bool matrix len", len(boolMatrices))

	// fmt.Println("Value hash", valHashMap[14])

	for _, val := range bingoInput {
		if _, ok := valHashMap[val]; ok {
			for mI, matrix := range valHashMap[val] {
				for rI, row := range matrix {
					for cI := range row {
						// fmt.Println("Updating for value", val, "at index [", mI, "], [", rI, "], [", cI, "]")
						boolMatrices[mI][rI][cI] = true
						completedRow := true
						completedCol := true

						for _, isChecked := range boolMatrices[mI][rI] {
							if !isChecked {
								completedRow = false
							}
						}

						for bCI := range boolMatrices[mI][rI] {
							completedCol = true
							// fmt.Println("Checking col", bCI, "\n")
							for bRI := range boolMatrices[mI] {
								isChecked := boolMatrices[mI][bRI][bCI]
								// fmt.Print("(", bRI, ",", bCI, ") :", isChecked, "\t")
								if !isChecked {
									completedCol = false
								}
							}
							if completedCol {
								break
							}
							// fmt.Println("\n")
						}

						// fmt.Println("Val", val, "complete col", completedCol)

						if completedRow || completedCol {

							if finishedCount == 1 {
								if _, ok := finishedMatrix[mI]; !ok {
									// Last matrix
									fmt.Println("Completed matrix:", mI, "with val:", val, "\n")
									// Finding some of unmarked values of matrix
									sum := 0
									for bRI, boolRow := range boolMatrices[mI] {
										// if bRI == rI {
										// 	fmt.Print(string("\033[32m"))
										// }
										for bCI, boolVal := range boolRow {
											if !boolVal {
												// Not checked
												fmt.Print(matrices[mI][bRI][bCI], " (O) \t")
												sum += matrices[mI][bRI][bCI]
											} else {
												fmt.Print(matrices[mI][bRI][bCI], " (X) \t")
											}
										}
										fmt.Println(string("\033[0m"))
									}
									fmt.Println("\nSum is", sum)

									fmt.Println("Part 2:", sum*val)
									return
								}
							} else {
								if _, ok := finishedMatrix[mI]; !ok {
									finishedMatrix[mI] = true
									finishedCount--
								}
							}

							// for bMI, boolMatrix := range boolMatrices {
							// 	fmt.Println("Matrix :", bMI)
							// 	for bRI, boolRow := range boolMatrix {
							// 		if bRI == rI && bMI == mI {
							// 			fmt.Print(string("\033[32m"))
							// 		}
							// 		for bCI, boolVal := range boolRow {
							// 			if !boolVal {
							// 				// Not checked
							// 				fmt.Print(matrices[bMI][bRI][bCI], " (O) \t")
							// 				// sum += matrices[mI][bRI][bCI]
							// 			} else {
							// 				fmt.Print(matrices[mI][bRI][bCI], " (X) \t")
							// 			}
							// 		}
							// 		fmt.Println(string("\033[0m"))
							// 	}
							// 	fmt.Println()
							// }

						}
					}
				}
			}
		}
	}

}

func main() {
	// part1()
	part2()
}
