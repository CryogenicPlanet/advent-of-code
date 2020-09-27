import numpy as np
from itertools import permutations

globalMap = []


def parseInstruction(instruction):
    # print("Parsing instruction", instruction)
    strInstr = str(instruction)
    lengthOpCodes = {1: 4, 2: 4, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 99: 0}

    opCode = int(strInstr[-2:])
    length = lengthOpCodes.get(opCode, 4)
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


def intProgram(opCode, params, paramModes, arr, defaultJump, inputVal):
    finalPos = params[-1]
    values = getValues(params, paramModes, arr)
    # print('Values', values)
    if opCode == 1:
        # Addition
        output = values[0] + values[1]
        arr[finalPos] = output
        return [arr, defaultJump, inputVal]
    elif opCode == 2:
        # Multiplication
        output = values[0] * values[1]
        arr[finalPos] = output
        return [arr, defaultJump, inputVal]
    elif opCode == 3:
        # Input
        # inputVal = int(input())
        arr[finalPos] = inputVal
        return [arr, defaultJump, None]
    elif opCode == 4:
        # Output
        # print(values[0])
        return [values[0], -1, inputVal]
    elif opCode == 5:
        # Jump if true
        if values[0] != 0:
            return [arr, values[1], inputVal]
        else:
            return [arr, defaultJump, inputVal]
    elif opCode == 6:
        # Jump if false
        if values[0] == 0:
            return [arr, values[1], inputVal]
        else:
            return [arr, defaultJump, inputVal]
    elif opCode == 7:
        # Less than
        if values[0] < values[1]:
            arr[finalPos] = 1
        else:
            arr[finalPos] = 0
        return [arr, defaultJump, inputVal]
    elif opCode == 8:
        # Equal to
        if values[0] == values[1]:
            arr[finalPos] = 1
        else:
            arr[finalPos] = 0
        return [arr, defaultJump, inputVal]
    else:
        return [arr, defaultJump, inputVal]


inputFile = open("input.txt", "r")

line = ""
for x in inputFile:
    line = x

# line = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"

# line = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"

# line = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"

# line = "105,1,3,4,0,99"
# line = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
# line = "3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99"

arr = line.split(',')
# print(arr)
arr = list(map(int, arr))

originalArr = arr.copy()


arr = originalArr.copy()

perm = permutations([0, 1, 2, 3, 4])
phases = np.array(list(perm))
# phases = rolledPhases


def calcPhase(originalArr, phases):
    inputs = [0]
    arrLength = len(originalArr)
    # print('Phases', phases)
    for phase in phases:
        index = 0
        arr = originalArr.copy()
        inputs = [phase] + inputs
        # print('Current Phase', phase, inputs, arr)
        while index < arrLength:
            [opCode, length, paramModes] = parseInstruction(arr[index])
            params = []
            # print('Instruction Output', opCode, length, paramModes)
            globalMap.append([index, arr])
            if opCode != 99:
                for i in range(1, length):
                    params.append(arr[index + i])
                # print('Params', params)
                # print('Opcode',opCode)
                [newArr, jump, inputVal] = intProgram(
                    opCode, params, paramModes, arr, index + length, inputs.pop(0) if len(inputs) > 0 else None)
                # print(opCode,inputVal)
                if not inputVal == None:
                    inputs.append(inputVal)
                if jump == -1:
                    # print('Output',newArr)
                    inputs.append(newArr)
                    jump = index + 2
                else:
                    arr = newArr
                # print(arr)
                index = jump
            else:
                break
    return inputs[0]  # Should be final phase output

# calcPhaseVec = np.vectorize(calcPhase)
phaseOutputs = []
for phase in phases:
    # print(phase)
    phaseOutputs.append(calcPhase(arr, phase))
print(np.max(phaseOutputs))
