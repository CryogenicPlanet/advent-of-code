use std::{
    collections::{HashMap, HashSet},
    fs,
};

#[derive(Debug)]
struct Number {
    x: i32,
    y: i32,
    size: i32,
    value: i32,
    validPositions: HashSet<(i32, i32)>,
}

#[derive(Debug)]
struct Symbol {
    x: usize,
    y: usize,
}

#[derive(Debug)]
struct Grid {
    n: usize,
    m: usize,
    numbers: Vec<Number>,
    symbols: HashMap<(i32, i32), char>,
}

fn read_input() -> Grid {
    // let input = fs::read_to_string("input.txt").expect("Failed to read input.txt");
    let input = "\
    467..114..\n\
    ...*......\n\
    ..35..633.\n\
    ......#...\n\
    617*......\n\
    .....+.58.\n\
    ..592.....\n\
    ......755.\n\
    ...$.*....\n\
    .664.598..\n\
    "
    .to_string();

    let lines = input.lines();
    let mut numbers = Vec::new();
    let mut symbols = HashMap::new();
    let mut n = 0;
    let mut m = 0;

    fn calculate_valid_positions(
        x: i32,
        y: i32,
        size: i32,
    ) -> std::collections::HashSet<(i32, i32)> {
        let mut valid_positions = std::collections::HashSet::new();
        for x_offset in 0..=size {
            // Main size positions
            valid_positions.insert((x + x_offset, y));
            // Vertical adjacent
            valid_positions.insert((x + x_offset, y - 1));
            valid_positions.insert((x + x_offset, y + 1));

            // Diagonals
            valid_positions.insert((x + x_offset - 1, y - 1));
            valid_positions.insert((x + x_offset + 1, y - 1));
            valid_positions.insert((x + x_offset - 1, y + 1));
            valid_positions.insert((x + x_offset + 1, y + 1));
        }

        valid_positions.insert((x - 1, y));
        valid_positions.insert((x + size + 1, y));
        valid_positions
    }

    for (yIdx, line) in lines.enumerate() {
        m = line.len();
        let mut current_number = String::new();
        for (xIdx, c) in line.chars().enumerate() {
            match c {
                '0'..='9' => current_number.push(c),
                _ if !current_number.is_empty() => {
                    let value = current_number.parse::<i32>().unwrap();
                    let size = current_number.len() as i32;

                    let base_x = xIdx as i32 - size;
                    let yIdx = yIdx as i32;

                    numbers.push(Number {
                        x: base_x,
                        y: yIdx as i32,
                        size,
                        value,
                        validPositions: calculate_valid_positions(base_x, yIdx, size),
                    });
                    current_number.clear();
                }
                _ => {}
            }
            if !c.is_numeric() && !current_number.is_empty() {
                let value = current_number.parse::<i32>().unwrap();
                let size = current_number.len() as i32;
                let base_x = xIdx as i32 - size;
                let yIdx = yIdx as i32;

                numbers.push(Number {
                    x: base_x,
                    y: yIdx as i32,
                    size,
                    value,
                    validPositions: calculate_valid_positions(base_x, yIdx, size),
                });
                current_number.clear();
            }
            if c != '.' && !c.is_numeric() {
                symbols.insert((xIdx as i32, yIdx as i32), c);
            }
        }
        if !current_number.is_empty() {
            let value = current_number.parse::<i32>().unwrap();
            let size = current_number.len() as i32;
            let base_x = m as i32 - size;
            let yIdx = yIdx as i32;

            numbers.push(Number {
                x: base_x,
                y: yIdx as i32,
                size,
                value,
                validPositions: calculate_valid_positions(base_x, yIdx, size),
            });
        }
        n += 1;
    }

    Grid {
        n,
        m,
        numbers,
        symbols,
    }
}

fn part_one() -> i32 {
    let grid = read_input();

    // println!("{:?}", grid);

    let mut output = 0;

    for number in &grid.numbers {
        let mut is_valid = false;

        // println!("number: {:?}", number);

        for positions in &number.validPositions {
            if let Some(_symbol) = grid.symbols.get(positions) {
                println!("number {:?}, symbol: {:?}", number.value, _symbol);
                output += number.value;
                is_valid = true;
                break;
            }
        }

        if !is_valid {
            println!("Invalid number: {:?}", number.value);
        }
    }

    return output;
}

fn main() {
    println!("Part one: {}", part_one());
    // println!("Part two: {}", part_two());
    // println!("Hello, world!");
}
