package main

import (
    "bufio"
    "fmt"
    "log"
	"os"
	"strconv"
)

func main() {

	file, err := os.Open("input.txt")
    if err != nil {
        log.Fatal(err)
    }
	defer file.Close()
	
	var expenseReport []int

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
		// fmt.Println(scanner.Text())
		inp := scanner.Text()
		intInp,conErr := strconv.Atoi(inp)
		if conErr != nil {
			log.Fatal(conErr) 
		}
		expenseReport = append(expenseReport,intInp)
	}
	// fmt.Println(expenseReport)

	for index, first := range expenseReport {
		for _, second := range expenseReport[index:] {
			if first + second == 2020 {
				fmt.Println(first*second)
				break
			}

		}
	}


    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

}