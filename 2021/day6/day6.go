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
	file, err := os.Open("test.txt")
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

	counter := 0
	maxCount := 80
	for counter < maxCount {
		newState := []int{}
		for idx, elm := range state {
			if elm == 0 {
				state[idx] = 6
				newState = append(newState, 8)
			} else {
				state[idx]--
			}
		}
		state = append(state, newState...)
		counter++
	}
	fmt.Println("No of elms", len(state))

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
	initialState := []int{}

	for _, str := range initialStateStr {
		val, err := strconv.Atoi(strings.TrimSpace(str))
		if err != nil {
			panic(err)
		}
		initialState = append(initialState, val)
	}

	counter := 0
	state := make([]int64, 9)

	for _, val := range initialState {
		state[val]++
	}

	maxCount := 256
	for counter < maxCount {
		newState := make([]int64, 9)
		for idx, elm := range state {
			if idx == 0 {
				newState[6] += elm
				newState[8] += elm
			} else {
				//
				newState[idx-1] += elm
			}
		}
		state = newState
		counter++
	}
	var sum int64 = 0

	for _, val := range state {
		sum += val
	}

	fmt.Println("No of elms", sum)
}

func main() {
	part1()
	part2()
}
