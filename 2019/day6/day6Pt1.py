class Node:
    def __init__(self, name):
        self.children = []
        self.count = 0
        self.name = name

    def addChild(self, newChild):
        self.children.append(newChild)

    def setCount(self, count):
        self.count = count


def countOrbits(root):
    count = 0
    if len(root.children) == 0:
        # print('Leaf Returned', root.name, root.count)
        return root.count

    for child in root.children:
        child.setCount(root.count + 1)
        count += countOrbits(child)
    return count + root.count


treeMap = {}

inputFile = open("input.txt", "r")

for line in inputFile:
    [parent, child] = line.split(')')
    parent = parent.strip()
    child = child.strip()
    if child in treeMap:
        childNode = treeMap[child]
    else:
        childNode = Node(child)
        treeMap[child] = childNode

    if parent in treeMap:
        treeMap[parent].addChild(childNode)
    else:
        parentNode = Node(parent)
        parentNode.addChild(childNode)
        treeMap[parent] = parentNode

root = treeMap['COM']
count = 0
# print(treeMap)
print(countOrbits(root))
