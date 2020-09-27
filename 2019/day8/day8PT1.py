import numpy as np

inputFile = open("input.txt", "r")

line = ""
for x in inputFile:
    line = x

# line = "123456789012"

# width = 3
# height = 2
width = 25
height = 6

line = line.strip()

imageMatrix = np.full((height,width),-1)
print(imageMatrix)

layers = []

length = len(line)
print(length)
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
for layer in layers:
    # unique, counts = np.unique(layer, return_counts=True)
    # uniqueValue = dict(zip(unique, counts))
    # noOfZeroValues.append(uniqueValue[0])
    # uniqueValues.append(uniqueValue)
    zeros = np.count_nonzero(layer == 0)
    ones = np.count_nonzero(layer == 1)
    twos = np.count_nonzero(layer == 2)
    noOfZeroValues.append(zeros)
    products.append(ones*twos)
leastZeros = np.argmin(np.array(noOfZeroValues))
# noOfZeros = uniqueValues[mostZeros][0]
# noOfOnes = uniqueValues[mostZeros][1]
# noOfTwos = uniqueValues[mostZeros][2]
# print('Count 0,1,2',noOfZeros,noOfOnes,noOfTwos)
print('Zero Index', leastZeros)
print('Max Zeros', np.max(noOfZeroValues))
print('Final', products[leastZeros])
# print(layers[mostZeros])
