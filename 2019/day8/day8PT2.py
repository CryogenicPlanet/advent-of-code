import numpy as np
import matplotlib.pyplot as plt

inputFile = open("input.txt", "r")

line = ""
for x in inputFile:
    line = x
width = 25
height = 6

# line = "0222112222120000"
# width = 2
# height = 2



line = line.strip()

imageMatrix = np.full((height,width),-1)
# print(imageMatrix)

layers = []

length = len(line)
# print(length)
curPos = 0
while curPos < length:
    newImageMatrix = np.copy(imageMatrix)
    for i in range(height):
        for j in range(width):
            newImageMatrix[i][j] = int(line[curPos])
            curPos += 1
    layers.append(newImageMatrix)

layers = np.array(layers)
print(len(layers))
# uniqueValues = []
products = []
noOfZeroValues = []
curLayerPos = 0
validCords =  np.where(imageMatrix == -1)
while curLayerPos < len(layers): 
    # print('Iteration', curLayerPos)
    
    # print(validCords)
    currentLayer = layers[curLayerPos]
    curValidCord = 0
    while curValidCord < len(validCords[0]):
        yCord = validCords[0][curValidCord]
        xCord = validCords[1][curValidCord]
        imageMatrix[yCord][xCord] = currentLayer[yCord][xCord]
        curValidCord += 1          
    curLayerPos += 1
    # print(imageMatrix)
    validCords = np.where(imageMatrix == 2)

for row in imageMatrix:
    print(''.join(map(str, row)))



