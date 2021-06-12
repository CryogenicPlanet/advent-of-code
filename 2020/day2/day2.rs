use std::fs;


fn main() {
 part_one();
 part_two();
}

fn part_one() {
//     let input = "1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc";

    let input = fs::read_to_string("day2.txt").expect("Something went wrong reading the file");


    let mut is_valid = 0;

    for line in input.lines() {

        let split = line.split_whitespace();

        let vec: Vec<&str> = split.collect();

        let boundaries: Vec<&str> = vec[0].split("-").collect();
        let lower_boundary: u32 = boundaries[0].parse().expect("Could not convert");
        let upper_boundary: u32 = boundaries[1].parse().expect("Could not convert");
        let query : Vec<&str> = vec[1].split(":").collect();
        let query : Vec<char> = query[0].chars().collect();
        let query: char = query[0];

        let text = vec[2];
        // println!("{}", text);

        let mut count = 0;

        for c in text.chars() {

        

            if c == query {
                count += 1;
            }
        }

        if count >= lower_boundary && count <= upper_boundary {
            is_valid += 1;
        }

        // println!("bounadries: {}, query: {}, text: {}", boundaries, query, text);

    }
    println!("{}", is_valid);
}

fn part_two() {
//         let input = "1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc";

let input = fs::read_to_string("day2.txt").expect("Something went wrong reading the file");


    let mut is_valid = 0;

    for line in input.lines() {

        let split = line.split_whitespace();

        let vec: Vec<&str> = split.collect();

        let boundaries: Vec<&str> = vec[0].split("-").collect();
        let first_index: u32 = boundaries[0].parse().expect("Could not convert");
        let second_index: u32 = boundaries[1].parse().expect("Could not convert");
        let query : Vec<&str> = vec[1].split(":").collect();
        let query : Vec<char> = query[0].chars().collect();
        let query: char = query[0];

        let text = vec[2];
        // println!("{}", text);

        let mut count = 0;

        let text : Vec<char> = text.chars().collect(); 

        if text[(first_index -1) as usize] == query {
            count += 1;
        }

        if text[(second_index -1) as usize] == query{
            count += 1
        }

        if  count == 1 {
            is_valid += 1;
        }

        // println!("bounadries: {}, query: {}, text: {}", boundaries, query, text);

    }
    println!("{}", is_valid);
}
