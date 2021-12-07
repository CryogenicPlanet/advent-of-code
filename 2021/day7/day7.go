package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

func MinMax(array []int) (int, int) {
	var max int = array[0]
	var min int = array[0]
	for _, value := range array {
		if max < value {
			max = value
		}
		if min > value {
			min = value
		}
	}
	return min, max
}

func abs(x, y int) int {
	if x < y {
		return y - x
	}
	return x - y
}

func getFuelCost(state []int, point int) int {
	fuelCost := 0
	for _, val := range state {
		fuelCost += abs(val, point)
	}
	// fmt.Println("Fuel cost", fuelCost)
	return fuelCost
}

func calcFuel(state []int, point int, defaultVal int, min int, max int) int {

	fuelCost := defaultVal

	// fmt.Println("Point is", point, fuelCost)

	if point <= min {
		return defaultVal
	} else if point >= max {
		return defaultVal
	}

	if defaultVal == 0 {
		// Calc fuel
		fuelCost = getFuelCost(state, point)
	}

	if leftFuel := getFuelCost(state, point-1); leftFuel < fuelCost {
		// fmt.Println("Going left", fuelCost, leftFuel)
		return calcFuel(state, point-1, leftFuel, min, max)
	} else if rightFuel := getFuelCost(state, point+1); rightFuel < fuelCost {
		return calcFuel(state, point-1, rightFuel, min, max)
		// fmt.Println("Going right", fuelCost, rightFuel)
	}
	return fuelCost
}

func part1() {
	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	line := ""

	for scanner.Scan() {
		line = scanner.Text()
	}

	initialStateStr := strings.Split(line, ",")
	state := []int{}

	for _, str := range initialStateStr {
		val, err := strconv.Atoi(strings.TrimSpace(str))
		if err != nil {
			panic(err)
		}
		state = append(state, val)
	}

	min, max := MinMax(state)

	midPoint := int(math.Floor(float64(min+max) / 2))

	fmt.Println("Min max midpoint", min, max, midPoint)

	fuelCost := calcFuel(state, midPoint, 0, min, max)

	fmt.Println("Fuel cost", fuelCost)

}

func getFuelCost2(state []int, point int) int {
	fuelCost := 0
	for _, val := range state {
		diff := abs(val, point)
		fuelCost += int((math.Pow(float64(diff), 2) + float64(diff)) / 2) // (n^2 + n)/2 is the summation of numbers to that point
	}
	// fmt.Println("Fuel cost", fuelCost)
	return fuelCost
}

func calcFuel2(state []int, point int, defaultVal int, min int, max int) int {

	fuelCost := defaultVal

	// fmt.Println("Point is", point, fuelCost)

	if point <= min {
		return defaultVal
	} else if point >= max {
		return defaultVal
	}

	if defaultVal == 0 {
		// Calc fuel
		fuelCost = getFuelCost2(state, point)
	}

	if leftFuel := getFuelCost2(state, point-1); leftFuel < fuelCost {
		// fmt.Println("Going left", fuelCost, leftFuel)
		return calcFuel2(state, point-1, leftFuel, min, max)
	} else if rightFuel := getFuelCost2(state, point+1); rightFuel < fuelCost {
		return calcFuel2(state, point-1, rightFuel, min, max)
		// fmt.Println("Going right", fuelCost, rightFuel)
	}
	return fuelCost
}

func part2() {
	file, err := os.Open("data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	line := ""

	for scanner.Scan() {
		line = scanner.Text()
	}

	initialStateStr := strings.Split(line, ",")
	state := []int{}

	for _, str := range initialStateStr {
		val, err := strconv.Atoi(strings.TrimSpace(str))
		if err != nil {
			panic(err)
		}
		state = append(state, val)
	}

	min, max := MinMax(state)

	midPoint := int(math.Floor(float64(min+max) / 2))

	fmt.Println("Min max midpoint", min, max, midPoint)

	fuelCost := calcFuel2(state, midPoint, 0, min, max)

	fmt.Println("Fuel cost", fuelCost)
}

func main() {
	part1()
	part2()
}
