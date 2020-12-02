# expenseReport = [1721,
#                  979,
#                  366,
#                  299,
#                  675,
#                  1456]

# cache = {}
def main():
    expenseReport = []
    inputFile = open("input.txt", "r")
    for line in inputFile:
        expenseReport.append(int(line))

    for index, first in enumerate(expenseReport):
        for secondIndex, second in enumerate(expenseReport[index:]):
            for third in expenseReport[secondIndex:]:
                if first + second + third == 2020:
                    print(first * second * third)
                    return

        # cache[first] = second
main()
