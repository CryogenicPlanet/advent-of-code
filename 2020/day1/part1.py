# expenseReport = [1721,
#                  979,
#                  366,
#                  299,
#                  675,
#                  1456]

# cache = {}
expenseReport = []

inputFile = open("input.txt", "r")
for line in inputFile:
    expenseReport.append(int(line))

for index, first in enumerate(expenseReport):
    for second in expenseReport[index:]:
        if first + second == 2020:
            print(first * second)
            break
        # cache[first] = second
