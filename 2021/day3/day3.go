package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func part1() {

	matrix := getInputMatrix()

	gammaRate := []int{}
	epsilonRate := []int{}

	for j, _ := range matrix[0] {
		colZeros := 0
		colOnes := 0
		for i, _ := range matrix {
			val := matrix[i][j]
			// fmt.Println("i, j", i, j, "val:", val)
			if val == 0 {
				colZeros += 1
			} else {
				colOnes += 1
			}
		}

		// fmt.Println("Col", j, "\t0:", colZeros, "1:", colOnes)

		if colOnes > colZeros {
			gammaRate = append(gammaRate, 1)
			epsilonRate = append(epsilonRate, 0)
		} else {
			gammaRate = append(gammaRate, 0)
			epsilonRate = append(epsilonRate, 1)
		}
	}

	gammaRateVal, err := strconv.ParseInt(strings.Join(strings.Split(strings.Trim(fmt.Sprint(gammaRate), "[]"), " "), ""), 2, 64)
	epsilonrateVal, err := strconv.ParseInt(strings.Join(strings.Split(strings.Trim(fmt.Sprint(epsilonRate), "[]"), " "), ""), 2, 64)

	if err != nil {
		panic(err)
	}

	fmt.Println(gammaRateVal, epsilonrateVal)

	fmt.Println("Part 1 :", gammaRateVal*epsilonrateVal)

}

func getInputMatrix() [][]int {
	matrix := [][]int{}

	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()

		row := []int{}
		for _, char := range line {

			val, err := strconv.Atoi(string(char))

			if err != nil {
				panic(err)
			}
			row = append(row, val)
		}
		matrix = append(matrix, row)
	}

	return matrix
}

func recursiveSolver(matrix [][]int, j int, min bool) ([]int, error) {

	if len(matrix) == 1 {
		return matrix[0], nil
	}

	zeroIndex := []int{}
	oneIndex := []int{}

	for i, _ := range matrix {
		val := matrix[i][j]
		if val == 0 {
			zeroIndex = append(zeroIndex, i)
		} else {
			oneIndex = append(oneIndex, i)
		}
	}

	if len(zeroIndex) > len(oneIndex) {
		// 1 is most common
		if min {
			// we want least common so here we use 0
			newMatrix := [][]int{} // Only rows where j bit is 0
			for _, index := range zeroIndex {
				newMatrix = append(newMatrix, matrix[index])
			}
			return recursiveSolver(newMatrix, j+1, min)
		} else {
			newMatrix := [][]int{} // Only rows where j bit is 1
			for _, index := range oneIndex {
				newMatrix = append(newMatrix, matrix[index])
			}
			return recursiveSolver(newMatrix, j+1, min)
		}
	} else {
		// 0 is most common

		if min {
			// we least common so here we use 1
			newMatrix := [][]int{} // Only rows where j bit is 1
			for _, index := range oneIndex {
				newMatrix = append(newMatrix, matrix[index])
			}
			return recursiveSolver(newMatrix, j+1, min)
		} else {
			newMatrix := [][]int{} // Only rows where j bit is 0
			for _, index := range zeroIndex {
				newMatrix = append(newMatrix, matrix[index])
			}
			return recursiveSolver(newMatrix, j+1, min)
		}
	}
}

func part2() {

	matrix := getInputMatrix()

	oxy, err := recursiveSolver(matrix, 0, false)

	co2, err := recursiveSolver(matrix, 0, true)

	if err != nil {
		panic(err)
	}

	oxyVal, err := strconv.ParseInt(strings.Join(strings.Split(strings.Trim(fmt.Sprint(oxy), "[]"), " "), ""), 2, 64)
	co2Val, err := strconv.ParseInt(strings.Join(strings.Split(strings.Trim(fmt.Sprint(co2), "[]"), " "), ""), 2, 64)

	fmt.Println("Oxy, co2", oxy, co2)

	fmt.Println("Part 2:", oxyVal*co2Val)

}

func main() {

	part1()
	part2()
}
