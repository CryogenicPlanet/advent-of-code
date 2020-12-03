

def checkPassword(inp):
    [check, password] = inp.split(':')
    password = password[1:]
    letter = check[-1]
    [pos1, pos2] = check[:-2].split('-')

    pos1, pos2 = int(pos1), int(pos2)

    [char1, char2] = password[pos1 - 1], password[pos2 - 1]

    if (char1 == letter or char2 == letter) and char1 != char2:
        return True
    else:
        return False

    # if letter in letterMem and pos1 <= letterMem[letter] <= pos2:
    #     return True
    # else:
    #     return False


# inp = [
#     "1-3 a: abcde",
#     "1-3 b: cdefg",
#     "2-9 c: ccccccccc"
# ]

inp = []
inputFile = open("input.txt", "r")
for line in inputFile:
    inp.append(line)

count = 0

for elm in inp:
    if checkPassword(elm):
        count += 1

print("count", count)
