import { readFile } from "fs/promises";

// const input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;
const input = await readFile("input.txt", "utf-8");

type FileNode = {
  type: "file";
  name: string;
  size: number;
};
type FolderNode = {
  type: "folder";
  path: string;
  size?: number;
  parent: FolderNode | null;
  children: Record<string, FileNode | FolderNode>;
};

const root: FolderNode = {
  children: {},
  path: "/",
  parent: null,
  type: "folder",
};

const delim = "$ ";

const commands = input.split(`${delim}`);

let currentPath = root.path;
let currentNode = root;

for (const command of commands) {
  if (command === "") continue;
  const trimmed = command.trim();

  if (trimmed.startsWith("cd")) {
    const path = trimmed.slice(3).trim();
    if (path === "/") {
      currentPath = path;
      currentNode = root;
    } else if (path === "..") {
      // If parent is null, we are at root
      currentNode = currentNode.parent ?? root;
      currentPath = currentNode.path;
    } else {
      // If path is not in children, create it
      if (!currentNode.children[path]) {
        currentNode.children[path] = {
          type: "folder",
          path: `${currentPath}${path}/`,
          parent: currentNode,
          children: {},
        };
      }
      currentNode = currentNode.children[path] as FolderNode;
      currentPath = currentNode.path;
    }
  } else if (trimmed.startsWith("ls")) {
    const output = trimmed.split("\n").slice(1);
    for (const line of output) {
      const [size, name] = line.split(" ");
      if (size === "dir") {
        currentNode.children[size] = {
          path: `${currentPath}${name}/`,
          parent: currentNode,
          type: "folder",
          children: {},
        } as FolderNode;
      } else {
        currentNode.children[name] = {
          name,
          size: parseInt(size),
          type: "file",
        } as FileNode;
      }
    }
  }
}

// Set folder sizes
const folders: { size: number; node: FolderNode }[] = [];

const getFolderSize = (folder: FolderNode): number => {
  const children = Object.values(folder.children);
  let size = 0;
  for (const child of children) {
    if (child.type === "file") {
      size += child.size;
    } else {
      size += getFolderSize(child);
    }
  }
  folder.size = size;
  folders.push({ size, node: folder });
  return size;
};

getFolderSize(root);

const part1 = () => {
  const LIMIT = 100000;

  const folderUnderLimit = folders.filter((f) => f.size < LIMIT);

  const sumSize = folderUnderLimit.reduce((acc, f) => acc + f.size, 0);

  console.log({ sumSize });
};

const part2 = () => {
  const FILESYSTEM_SIZE = 70000000;

  const SPACE_NEEDED = 30000000;

  const spaceToDelete = SPACE_NEEDED - (FILESYSTEM_SIZE - root.size);

  const foldersSorted = folders.sort((a, b) => a.size - b.size);

  for (const folder of foldersSorted) {
    if (folder.size > spaceToDelete) {
      console.log({ size: folder.size });
      break;
    }
  }
};

part2();
