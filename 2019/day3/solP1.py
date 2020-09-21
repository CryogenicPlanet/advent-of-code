

def generateLine(steps):
    prevPoint = (0, 0)
    outputLine = [prevPoint]
    for step in steps:
        char = step[0:1]
        move = int(step[1:])
        if char == "U":
            curPoint = (prevPoint[0] + move, prevPoint[1])
        elif char == "D":
            curPoint = (prevPoint[0] - move, prevPoint[1])
        elif char == "R":
            curPoint = (prevPoint[0], prevPoint[1] + move)
        elif char == "L":
            curPoint = (prevPoint[0], prevPoint[1] - move)
        prevPoint = curPoint
        outputLine.append(curPoint)
    return outputLine;

def generatePoints(line):
    outputPoints = {}
    for i in range(0, len(line) - 1):
        startPoint = line[i];
        endPoint = line[i + 1];
        if startPoint[0] == endPoint[0]:
            # y change
            x = startPoint[0]

            if startPoint[1] > endPoint[1]:
                for i in range(startPoint[1], endPoint[1] - 1, -1):
                    if x in outputPoints:
                        outputPoints[x].update({i: True})
                    else:
                        outputPoints[x] = {i: True}
            else:
                # print('Y Change Greater than')
                for i in range(startPoint[1], endPoint[1] + 1):
                    if x in outputPoints:
                        outputPoints[x].update({i: True})
                    else:
                        outputPoints[x] = {i: True}
                    
        elif startPoint[1] == endPoint[1]:
            # x change
            y = startPoint[1]

            if startPoint[0] > endPoint[0]:
                for i in range(startPoint[0], endPoint[0] - 1, -1):
                    if i in outputPoints:
                        outputPoints[i].update({y: True})
                    else:
                        outputPoints[i] = {y: True}
            else:
                  for i in range(startPoint[0], endPoint[0] + 1):
                    if i in outputPoints:
                        outputPoints[i].update({y: True})
                    else:
                        outputPoints[i] = {y: True}
    return outputPoints;


def findIntersect(line1, line2):
    points1 = generatePoints(line1)
    points2 = generatePoints(line2)
    intersects = []
    for xKey, yPoints in points1.items():
        if xKey in points2:
            yLine2 = points2[xKey]
            for yKey in yPoints:
                if yKey in yLine2:
                    if xKey != 0 and yKey != 0:
                        intersects.append(abs(xKey) + abs(yKey))
    return intersects
        

inputFile = open("input.txt", "r")
count = 1
for line in inputFile:
    if count == 1:
        line1Inp = line
    elif count == 2:
        line2Inp = line
    count += 1

# line2Inp = inputFile[1]

# line1Inp = "R75,D30,R83,U83,L12,D49,R71,U7,L72"
# line2Inp = "U62,R66,U55,R34,D71,R55,D58,R83"
# line1Inp = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51"
# line2Inp = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
line1 = generateLine(line1Inp.split(','))
line2 = generateLine(line2Inp.split(','))



# print("line1",line1)
# print("line2", line2)

# print(generatePoints(line1))
# print(generatePoints(line2))

intercepts = findIntersect(line1, line2)

print(intercepts)

print(min(intercepts))

# print(findIntersect(line1, line2))