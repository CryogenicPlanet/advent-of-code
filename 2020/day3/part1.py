

treeMap = []

inputFile = open("input.txt", "r")
for line in inputFile:
    treeMap.append(line)

horizontalLen = len(treeMap[0])
verticalLen = len(treeMap)

print('\n'.join(treeMap))

print('================================ \n')

print(horizontalLen, verticalLen)
startPosX = 0
startPosY = 0


def checkStep(startPosX, startPosY):
    global treeMap
    moveRight = (startPosX + 3) % (horizontalLen-1)
    moveDown = startPosY + 1

    finalPos = treeMap[moveDown][moveRight]

    print("X", moveRight, "Y", moveDown, 'Final Pos', finalPos)

    if finalPos == "#":
        return [True, moveRight, moveDown]
    else:
        return [False, moveRight, moveDown]


count = 0

while startPosY != verticalLen - 1:
    [check, startPosX, startPosY] = checkStep(startPosX, startPosY)
    if check:
        count += 1
print("count:", count)
