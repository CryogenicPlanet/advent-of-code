import math

def determineFuel(num):
    fuel =  math.floor(num / 3)
    fuel -= 2
    return fuel

def calcFuel(originalMass):
    curMass = originalMass
    fuelPerMass = 0
    curFuel = 0
    while curMass > 0:
        fuelPerMass += curFuel
        curFuel = determineFuel(curMass)
        curMass = curFuel
        # print('Fuel Iteraion', curFuel)
        
    return fuelPerMass

inputFile = open("input.txt", "r")
# inputFile = [1969]
totalSum = 0
for line in inputFile:
  totalSum += calcFuel(int(line))
print(totalSum)