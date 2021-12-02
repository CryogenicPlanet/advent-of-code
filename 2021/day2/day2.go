package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func handleInputPart1(inp string, depth int, xPos int) (int, int, error) {

	re := regexp.MustCompile("[0-9]+")

	val, err := strconv.Atoi(re.FindString(inp))

	if err != nil {
		return depth, xPos, err
	}

	if strings.Contains(inp, "forward") {
		return depth, xPos + val, nil
	} else if strings.Contains(inp, "down") {
		return depth + val, xPos, nil
	} else if strings.Contains(inp, "up") {
		return depth - val, xPos, nil
	}
	return depth, xPos, errors.New("Invalid input type")

}

func part1() {
	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	// optionally, resize scanner's capacity for lines over 64K, see next example

	depth := 0
	xPos := 0

	for scanner.Scan() {
		depth, xPos, err = handleInputPart1(scanner.Text(), depth, xPos)
		if err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("Part 1", depth*xPos)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func handleInputPart2(inp string, depth int, xPos int, aim int) (int, int, int, error) {

	re := regexp.MustCompile("[0-9]+")

	val, err := strconv.Atoi(re.FindString(inp))

	if err != nil {
		return depth, xPos, aim, err
	}

	if strings.Contains(inp, "forward") {
		return depth + (aim * val), xPos + val, aim, nil
	} else if strings.Contains(inp, "down") {
		return depth, xPos, aim + val, nil
	} else if strings.Contains(inp, "up") {
		return depth, xPos, aim - val, nil
	}
	return depth, xPos, aim, errors.New("Invalid input type")

}

func part2() {
	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	// optionally, resize scanner's capacity for lines over 64K, see next example

	depth := 0
	xPos := 0
	aim := 0

	for scanner.Scan() {
		depth, xPos, aim, err = handleInputPart2(scanner.Text(), depth, xPos, aim)
		if err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("Part 2", depth*xPos)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func main() {
	part1()
	part2()
}
