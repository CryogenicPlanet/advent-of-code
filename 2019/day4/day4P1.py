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

def checkDouble(number):
    strInp = str(number)
    hasDouble = False
    for i in range(0, len(strInp) - 1):
        firstDigit = int(strInp[i])
        secondDigit = int(strInp[i + 1])
        if  (firstDigit == secondDigit):
            hasDouble = True
    return hasDouble

def countPosibilities(start, end):
    count = 0
    for i in range(start, end):
        if checkDouble(i) and checkIncreasing(i):
            count += 1
    return count

start = time.time()
print(countPosibilities(109165, 576723))
end = time.time()
print("Time consumed in working: ",end - start)