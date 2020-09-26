def parseInstruction(instruction):
    # print("Parsing instruction", instruction)
    strInstr = str(instruction)

    opCode = int(strInstr[-2:])
    length = 2 if opCode == 3 or opCode == 4 else 4
    paramModes = []
    params = strInstr[:-2]
    params = params[::-1]
    for param in params:
        paramModes.append(int(param))
    return [opCode, length, paramModes]


def getValues(params, paramModes, arr):
    values = []
    for i in range(0, len(params)):
        if i >= len(paramModes) or paramModes[i] == 0:
            # Pointer Mode
            values.append(arr[params[i]])
        elif paramModes[i] == 1:
            # Immediate Mode
            values.append(params[i])
    return values


def intProgram(opCode, params, paramModes, arr):
    finalPos = params[-1]
    values = getValues(params[:-1], paramModes, arr)
    if opCode == 1:
        # Addition
        output = values[0] + values[1]
        arr[finalPos] = output
        return arr
    elif opCode == 2:
        # Multiplication
        output = values[0] * values[1]
        arr[finalPos] = output
        return arr
    elif opCode == 3:
        # Input
        inputVal = int(input())
        arr[finalPos] = inputVal
        return arr
    elif opCode == 4:
        # Output
        print(arr[finalPos])
        return arr
    else:
        return arr


inputFile = open("input.txt", "r")

line = ""
for x in inputFile:
    line = x

# line = "1002,4,3,4,33"
# line = "1101,100,-1,4,0"

arr = line.split(',')
# print(arr)
arr = list(map(int, arr))

arrLength = len(arr)
index = 0

while index < arrLength:
    [opCode, length, paramModes] = parseInstruction(arr[index])
    params = []
    # print('Instruction Output', opCode, length, paramModes)
    if opCode != 99:
        for i in range(1, length):
            params.append(arr[index + i])
        # print('Params', params)
        arr = intProgram(opCode, params, paramModes, arr)
        # print(arr)
    else:
        break
    index += length

# print(arr)
# print(parseInstruction(1002))
