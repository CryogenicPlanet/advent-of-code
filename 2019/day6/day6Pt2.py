class Node:
    def __init__(self, name, parent):
        self.children = []
        self.count = 0
        self.name = name
        self.parent = parent if parent else None

    def addChild(self, newChild):
        self.children.append(newChild)

    def addParent(self, newParent):
        self.parent = newParent

    def setCount(self, count):
        self.count = count


# def countPath(root, des,  count=0):
#     if root.name == des:
#         # print('Leaf Returned', root.name, root.count)
#         count += 1
#         return True
#     if len(root.children) == 0:
#         return False
#     hasDes = False
#     for child in root.children:
#         # child.setCount(root.count + 1)
#         hasDes = countPath(child, des, count)
#         if hasDes:
#             count += 1
#             break

#     return count


def createPath(root, des, pathMap, pathOrder):

    if root.name == des:
        pathOrder.append(root.name)
        pathMap[root.name] = root
        return True
    if len(root.children) == 0:
        return False

    hasDes = False
    for child in root.children:
        hasDes = createPath(child, des, pathMap, pathOrder)
        if hasDes:
            break
    if hasDes:
        pathMap[root.name] = root
        pathOrder.append(root.name)

    if hasDes and root.parent == None:
        return [pathMap, pathOrder]

    return hasDes


treeMap = {}

inputFile = open("input.txt", "r")

for line in inputFile:
    [parent, child] = line.split(')')
    parent = parent.strip()
    child = child.strip()
    if parent in treeMap:
        parentNode = treeMap[parent]
    else:
        parentNode = Node(parent, None)
        treeMap[parent] = parentNode

    if child in treeMap:
        childNode.addParent(parentNode)
        childNode = treeMap[child]
    else:
        childNode = Node(child, parentNode)
        treeMap[child] = childNode

    parentNode.addChild(childNode)


root = treeMap['COM']
count = 0
sanOrbit = treeMap['SAN']
youOrbit = treeMap['YOU'].parent
# print(treeMap)
[sanPath, sanOrder] = createPath(root, sanOrbit.name, {}, [])
[youPath, youOrder] = createPath(root, youOrbit.name, {}, [])


# print(sanPath.keys(), sanOrder)
# print(youPath.keys(), youOrder)
with open('err.txt', 'w') as f:
    f.write("%s\n" % sanOrder)
    f.write("%s\n" % youOrder)

paths = []
count = 0
for orbitKey in youOrder:
    if orbitKey in sanPath:
        # Path Overlay
        # midPoint = treeMap[orbitKey]
        # # print(midPoint, midPoint.name)
        # midPoint.parent = None
        # pathObject = createPath(
        #     midPoint, sanOrbit.name, {}, [])
        # if not(isinstance(pathObject, bool)):
        #     [midToSanMap, midToSanOrder] = pathObject
        #     # print(midToSanOrder)
        #     returnCount = len(midToSanOrder[:-1])
        #     print(orbitKey, count, returnCount)
        #     count += returnCount
        #     paths.append(count)
        returnCount = sanOrder[1:].index(orbitKey)
        print(orbitKey, count, returnCount)
        count += returnCount
        paths.append(count)

    count += 1
print(min(paths))
