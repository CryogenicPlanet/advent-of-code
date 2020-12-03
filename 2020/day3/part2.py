

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


def checkStep(startPosX, startPosY, deltaX, deltaY):
    global treeMap
    moveRight = (startPosX + deltaX) % (horizontalLen-1)
    moveDown = startPosY + deltaY

    finalPos = treeMap[moveDown][moveRight]

    # print("X", moveRight, "Y", moveDown, 'Final Pos', finalPos)

    if finalPos == "#":
        return [True, moveRight, moveDown]
    else:
        return [False, moveRight, moveDown]


counts = []
deltas = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

for delta in deltas:
    count = 0
    startPosX = 0
    startPosY = 0
    [deltaX, deltaY] = delta
    while startPosY != verticalLen - 1:
        [check, startPosX, startPosY] = checkStep(
            startPosX, startPosY, deltaX, deltaY)
        if check:
            count += 1
    counts.append(count)

finalVal = 1
for x in counts:
    finalVal *= x

print(finalVal)
