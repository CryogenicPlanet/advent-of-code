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


# line = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5"

# line = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10"

# line = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"

# line = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"

# line = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"

# line = "105,1,3,4,0,99"
# line = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
# line = "3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99"

arr = line.split(',')
# print(arr)
arr = list(map(int, arr))
# print(arr)




perm = permutations([5, 6, 7, 8, 9])
phases = np.array(list(perm))
# phases = rolledPhases


def calcPhase(originalArr, phases):
    inputs = [0]
    arrLength = len(originalArr)
    # print('Phases', phases)
    phaseIndex = 0
    phaseMemory = []
    for phase in phases:
        phaseMemory.append({"phase" : phase, "array" : originalArr.copy(), "index" : 0, "first" : True})
    # print(phaseMemory)
    while True:
        if phaseIndex >= len(phases):
            phaseIndex = 0
        # print('Current Phase', phaseIndex)
        phase = phaseMemory[phaseIndex]['phase']
        arr = phaseMemory[phaseIndex]['array']
        index = phaseMemory[phaseIndex]['index']
        if  'first' in phaseMemory[phaseIndex]:
            inputs = [phase] + inputs
        # print('Inputs', inputs, 'Phase', phase)
      
        while index < arrLength:
           
            [opCode, length, paramModes] = parseInstruction(arr[index])
            params = []
            # print('Instruction Output', opCode, length, paramModes)
            globalMap.append([index, arr])
            if opCode != 99:
                for i in range(1, length):
                    params.append(arr[index + i])
                # print('Params', params)
                # print('Opcode',opCode,'Index', index, inputs)
                [newArr, jump, inputVal] = intProgram(
                    opCode, params, paramModes, arr, index + length, inputs.pop(0) if len(inputs) > 0 else None)
                # print(opCode,inputVal)
                if not inputVal == None:
                    inputs.append(inputVal)
                if jump == -1:
                    # print('Index,Output',index,newArr, arr)
                    # print('Output', newArr)
                    inputs.append(newArr)
                    jump = index + 2
                    phaseMemory[phaseIndex] = {"phase" : phase, "array" : arr, "index" : jump}
                    phaseIndex += 1
                    # return newArr
                    break
                else:
                    arr = newArr
                index = jump
            else:
                if phaseIndex == 4:
                    #  print('Halting', opCode, inputs)
                     return inputs[0]    # Should be final phase output
                phaseIndex += 1
                break
    
      
      
            
   

# calcPhaseVec = np.vectorize(calcPhase)
phaseOutputs = []
for phase in phases:
    # print(phase)
    phaseOutputs.append(calcPhase(arr, phase))
print(np.max(phaseOutputs))
