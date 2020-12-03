

def checkPassword(inp):
    [check, password] = inp.split(':')
    password = password[1:]
    letter = check[-1]
    [minC, maxC] = check[:-2].split('-')

    minC, maxC = int(minC), int(maxC)

    letterMem = {}
    for char in password:
        if char in letterMem:
            letterMem[char] += 1
        else:
            letterMem[char] = 1

    if letter in letterMem and minC <= letterMem[letter] <= maxC:
        return True
    else:
        return False


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
