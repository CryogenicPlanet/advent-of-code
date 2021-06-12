use std::fs;


fn main() {
    part_one();
   part_two();

}

fn part_two() {
//  let expenseReport =  [1721,
//                   979,
//                   366,
//                   299,
//                   675,
//                   1456];

    let expense_report = fs::read_to_string("day1.txt").expect("Something went wrong reading the file");


    for element in expense_report.lines() {

        let element : u32 = element.parse().expect("Unable to convert first element");

        for second_element in expense_report.lines() {

            let second_element: u32 = second_element.parse().expect("Unable to convert second element");

            for third_element in expense_report.lines() {

                let third_element: u32 = third_element.parse().expect("Unable to convert third element");

            if element + second_element + third_element == 2020 {
                
                println!("{}", element*second_element* third_element);
                return
            }
        }
    }
    }
}

fn part_one() {
//  let expenseReport =  [1721,
//                   979,
//                   366,
//                   299,
//                   675,
//                   1456];

    let expense_report = fs::read_to_string("day1.txt").expect("Something went wrong reading the file");


    for element in expense_report.lines() {

        let element : u32 = element.parse().expect("Unable to convert first element");

        for second_element in expense_report.lines() {

            let second_element: u32 = second_element.parse().expect("Unable to convert second element");

            if element + second_element == 2020 {
                println!("{}", element*second_element);
                return
            }
        }
    }
}
