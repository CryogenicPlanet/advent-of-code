use std::fs;

fn main() {
    part_one();
    part_two();
}

fn part_two() {
    let input = "..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#";

    let input = fs::read_to_string("day3.txt").expect("Something went wrong reading the file");

    let rows: Vec<&str> = input.lines().collect();
    let verticalLen: u32 = input.lines().count() as u32;
    let horizontalLen: u32 = rows[0].chars().count() as u32;

    println!("Height : {}, Width: {}", verticalLen, horizontalLen);

    let deltas = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)];
    let mut counts: Vec<u64> = vec![];

    for delta in deltas.iter() {
        let mut startX = 0;
        let mut startY = 0;
        let mut count = 0;

        let (deltaX, deltaY) = delta;

        while startY != (verticalLen - 1) {
            let moveRight = (startX + deltaX) % (horizontalLen);
            let moveDown = startY + deltaY;

            let row: Vec<char> = rows[moveDown as usize].chars().collect();
            let pos = row[moveRight as usize];

            // println!("X : {}, Y : {}, Pos :{}", moveRight, moveDown, pos);

            if pos == '#' {
                count += 1;
            }
            startX = moveRight;
            startY = moveDown;
        }
        // println!("{}", count);
        counts.push(count);
    }

    println!("{:?}", counts);

    let mut final_val: u64 = 1;

    for x in counts.iter() {
        final_val *= x;
    }

    println!("{}", final_val);
}

fn part_one() {
    // let input = "..##.......
    // #...#...#..
    // .#....#..#.
    // ..#.#...#.#
    // .#...##..#.
    // ..#.##.....
    // .#.#.#....#
    // .#........#
    // #.##...#...
    // #...##....#
    // .#..#...#.#";

    let input = fs::read_to_string("day3.txt").expect("Something went wrong reading the file");

    let rows: Vec<&str> = input.lines().collect();
    let verticalLen: u32 = input.lines().count() as u32;
    let horizontalLen: u32 = rows[0].chars().count() as u32;

    println!("Height : {}, Width: {}", verticalLen, horizontalLen);

    let mut startX = 0;
    let mut startY = 0;
    let mut count = 0;

    while startY != (verticalLen - 1) {
        let moveRight = (startX + 3) % (horizontalLen);
        let moveDown = startY + 1;

        let row: Vec<char> = rows[moveDown as usize].chars().collect();
        let pos = row[moveRight as usize];

        // println!("X : {}, Y : {}, Pos :{}", moveRight, moveDown, pos);

        if pos == '#' {
            count += 1;
        }
        startX = moveRight;
        startY = moveDown;
    }
    println!("{}", count);
}
