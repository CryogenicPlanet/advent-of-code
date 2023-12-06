use std::fs;

#[derive(Debug)]
struct GameSet {
    blue: i32,
    green: i32,
    red: i32,
}

struct Game {
    id: i32,
    sets: Vec<GameSet>,
}

fn read_input() -> Vec<Game> {
    let input = fs::read_to_string("input.txt").expect("Failed to read input.txt");

    //     let input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n\
    // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n\
    // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n\
    // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n\
    // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    //         .to_string();

    input
        .lines()
        .map(|line| {
            let parts: Vec<&str> = line.split(": ").collect();
            let game_id = parts[0]
                .split_whitespace()
                .nth(1)
                .unwrap()
                .parse::<i32>()
                .unwrap();
            let sets = parts[1]
                .split("; ")
                .map(|set| {
                    let mut blue = 0;
                    let mut green = 0;
                    let mut red = 0;
                    set.split(", ").for_each(|color_count| {
                        let color_parts: Vec<&str> = color_count.split_whitespace().collect();
                        let count = color_parts[0].parse::<i32>().unwrap();
                        match color_parts[1] {
                            "blue" => blue = count,
                            "green" => green = count,
                            "red" => red = count,
                            _ => {}
                        }
                    });
                    GameSet { blue, green, red }
                })
                .collect();
            Game { id: game_id, sets }
        })
        .collect()
}

fn part_one() -> i32 {
    let input = read_input();
    let mut output: i32 = 0;
    let max_set: GameSet = GameSet {
        blue: 14,
        green: 13,
        red: 12,
    };

    for game in input {
        if game.sets.iter().all(|set| {
            set.blue <= max_set.blue && set.green <= max_set.green && set.red <= max_set.red
        }) {
            output += game.id;
        }
    }

    return output;
}

fn part_two() -> i32 {
    let input = read_input();
    let mut output: i32 = 0;

    for game in input {
        let mut max_set = GameSet {
            blue: i32::MIN,
            green: i32::MIN,
            red: i32::MIN,
        };

        for set in game.sets {
            // println!("cur_set {:?}, max_set {:?}", set, max_set);

            if set.blue > max_set.blue {
                max_set.blue = set.blue;
            }
            if set.green > max_set.green {
                max_set.green = set.green;
            }
            if set.red > max_set.red {
                max_set.red = set.red;
            }
        }

        output += max_set.blue * max_set.green * max_set.red;
    }

    return output;
}

fn main() {
    println!("Part one: {}", part_one());
    println!("Part two: {}", part_two());
    // println!("Hello, world!");
}
