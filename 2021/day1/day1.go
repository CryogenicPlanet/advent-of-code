package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func part1() {

	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	// optionally, resize scanner's capacity for lines over 64K, see next example

	increaseCount := 0
	lastDepth := -1

	for scanner.Scan() {
		currentDepth, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatal(err)
		}

		if currentDepth > lastDepth && lastDepth != -1 {
			increaseCount++
		}
		lastDepth = currentDepth
	}

	fmt.Println("Part 1", increaseCount)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func part2() {
	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	// optionally, resize scanner's capacity for lines over 64K, see next example

	increaseCount := 0

	depths := []int{}

	for scanner.Scan() {
		currentDepth, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatal(err)
		}
		depths = append(depths, currentDepth)
	}

	for idx, val := range depths {

		if idx+3 < len(depths) {
			// currentSum
			currentSum := val + depths[idx+1] + depths[idx+2]
			// nextSum
			nextSum := depths[idx+1] + depths[idx+2] + depths[idx+3]

			// fmt.Println("Sums", idx, currentSum, nextSum)

			if nextSum > currentSum {
				increaseCount++
			}
		}

	}

	fmt.Println("Part 2", increaseCount)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func main() {

	part1()
	part2()
}
