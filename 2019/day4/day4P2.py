import time


def checkIncreasing(number):
    strInp = str(number)
    allSmaller = True
    for i in range(0, len(strInp) - 1):
        firstDigit = int(strInp[i])
        secondDigit = int(strInp[i + 1])
        if not (firstDigit <= secondDigit):
            allSmaller = False
    return allSmaller


def returnDoubles(number):
    strInp = str(number)
    hasDouble = {}
    for i in range(0, len(strInp) - 1):
        firstDigit = int(strInp[i])
        secondDigit = int(strInp[i + 1])
        if (firstDigit == secondDigit):
            hasDouble[firstDigit] = True
    return hasDouble


def verifyRules(number):
    strInp = str(number)
    doubles = {}
    digitCount = {}
    for i in range(0, len(strInp) - 1):
        firstDigit = int(strInp[i])
        secondDigit = int(strInp[i + 1])
        if not (firstDigit <= secondDigit):
            return False
        if (firstDigit == secondDigit):
            doubles[firstDigit] = True
        if firstDigit in digitCount:
            digitCount[firstDigit] += 1
        else:
            digitCount[firstDigit] = 1
    if secondDigit in digitCount:
        digitCount[secondDigit] += 1
    else:
        digitCount[secondDigit] = 1

    # print(doubles)
    if len(doubles.values()) == 0:
        return False
    validDouble = False
    for digit in doubles:
        # print(digit, digitCount[digit])
        if digitCount[digit] == 2:
            validDouble = True
    return validDouble


def countPosibilities(start, end):
    count = 0
    validNumbers = []
    for i in range(start, end):
        if verifyRules(i):
            count += 1
            validNumbers.append(i)
    # print(validNumbers)
    return count


print(verifyRules(111122), verifyRules(123444),
      verifyRules(112233), verifyRules(122233))

start = time.time()
print(countPosibilities(109165, 576723))
end = time.time()
print("Time consumed in working: ", end - start)
