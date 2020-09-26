def parseInstruction(instruction):
    strInstr = str(instruction)
    length = len(strInstr)
    opCode = strInstr[-2:]
    paramModes = []
    params = strInstr[:-1]
    params = params[::-1]
    for param in params:
        paramModes.append(int(param))
    return [opCode, length, paramModes]


line = "1002,4,3,4,33"

arr = line[:-1]

arrLength = len(arr)
index = 0

while index < arrLength:
    [opCode, length, paramModes] = parseInstruction(arr[index])

    index += length

# print(parseInstruction(1002))
