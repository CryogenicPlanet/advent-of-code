use std::fs;

fn read_input() -> Vec<String> {
    let input = fs::read_to_string("input.txt").expect("Failed to read input.txt");
    input.lines().map(|x| x.to_string()).collect()
}

fn part_one() -> i32 {
    let input = read_input();
    let mut output: i32 = 0;
    for line in input {
        let mut numbers: Vec<char> = Vec::new();
        for character in line.chars() {
            if character.is_digit(10) {
                numbers.push(character);
            }
        }
        if let (Some(first), Some(last)) = (numbers.first(), numbers.last()) {
            let combined_str = format!("{}{}", first, last);
            if let Ok(combined_number) = combined_str.parse::<i32>() {
                output += combined_number;
            }
        }
    }

    return output;
}

#[derive(Debug)]
enum WordOrCharArr {
    DigitWord(String, i32),
    CharArr(Vec<char>),
}

fn split_digit_words(input: &str) -> Vec<WordOrCharArr> {
    let digit_words = [
        ("one", 1),
        ("two", 2),
        ("three", 3),
        ("four", 4),
        ("five", 5),
        ("six", 6),
        ("seven", 7),
        ("eight", 8),
        ("nine", 9),
    ];
    let mut result: Vec<WordOrCharArr> = Vec::new();
    let mut current_segment = String::new();

    let mut chars = input.chars().peekable();
    while let Some(&c) = chars.peek() {
        // println!("current char: {}, {}", c, current_segment);
        if c.is_alphabetic() {
            current_segment.push(c);
            if let Some(value) = digit_words.iter().find_map(|&(word, value)| {
                if current_segment.contains(word) {
                    Some(value)
                } else {
                    None
                }
            }) {
                // println!("found digit word: {}", value);

                result.push(WordOrCharArr::DigitWord(current_segment.clone(), value));
                current_segment.clear();
            }
        } else {
            if c.is_digit(10) {
                result.push(WordOrCharArr::CharArr(vec![c]));
                current_segment.clear();
            }
        }
        chars.next();
    }

    // println!("final current segment: {}", current_segment);

    if !current_segment.is_empty() {
        result.push(WordOrCharArr::CharArr(current_segment.chars().collect()));
    }

    // Implement Debug for WordOrCharArr to fix the error

    // Now we can print the result with {:?}
    // println!("result: {:?}", result);

    result
}

fn part_two() -> i32 {
    let input = vec![
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
    ]; // for testing
       // let input = read_input();
    let mut output: i32 = 0;
    for line in input {
        let mut numbers: Vec<i32> = Vec::new();

        let split = split_digit_words(&line);

        // println!("split: {:?}", split);

        for item in split {
            match item {
                WordOrCharArr::DigitWord(_, value) => {
                    // println!("string digit {}", value);
                    numbers.push(value);
                }
                WordOrCharArr::CharArr(chars) => {
                    for character in chars {
                        if character.is_digit(10) {
                            if let Some(digit) = character.to_digit(10) {
                                numbers.push(digit as i32);
                            }
                        }
                    }
                }
            }
        }

        println!("numbers: {:?}", numbers);

        if let (Some(first), Some(last)) = (numbers.first(), numbers.last()) {
            let combined_number = first * 10 + last;
            // println!("{} + {} = {}", first, last, combined_number);

            output += combined_number;
        }
    }

    return output;
}

fn main() {
    println!("Part one: {}", part_one());
    println!("Part two: {}", part_two());
    // println!("Hello, world!");
}
