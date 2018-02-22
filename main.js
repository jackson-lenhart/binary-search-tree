"use strict";

function Node(value, left = null, right = null) {
  return {
    value,
    left,
    right
  };
}

function insert(x, node, parent = null, direction = null) {
  if (node === null) {
    return parent[direction] = Node(x);
  }
  if (x < node.value) {
    insert(x, node.left, node, "left");
  } else if (x > node.value) {
    insert(x, node.right, node, "right");
  } else {
    throw new Error("Insertion of invalid node");
  }
}

function remove(x, node, parent = null, direction = null) {
  if (node === null) {
    throw new Error("Could not find node to remove");
  }

  if (node.value === x) {
    if (!node.left && !node.right) {
      return parent ?
        parent[direction] = null :
        node.value = null;
    } else if (node.left && !node.right) {
      let currNode = node.left;
      let currParent = node;
      if (!currNode.right) {
        node.value = currNode.value;
        return node.left = currNode.left;
      }
      while (currNode.right) {
        currParent = currNode;
        currNode = currNode.right;
      }
      node.value = currNode.value;
      return currParent.right = null;
    } else if (!node.left && node.right) {
      let currNode = node.right;
      if (!currNode.left) {
        node.value = currNode.value;
        return node.right = currNode.right;
      }
      let currParent = node;
      while (currNode.left) {
        currParent = currNode;
        currNode = currNode.left;
      }
      node.value = currNode.value;
      return currParent.left = null;
    } else if (node.left && node.right) {
      let currNode = node.left;
      if (!currNode.right) {
        node.value = currNode.value;
        return node.left = currNode.left;
      }
      let currParent = node;
      while (currNode.right) {
        currParent = currNode;
        currNode = currNode.right;
      }
      node.value = currNode.value;
      return currParent.right = null;
    }
  }

  if (x < node.value) {
    remove(x, node.left, node, "left");
  } else if (x > node.value) {
    remove(x, node.right, node, "right");
  } else {
    throw new Error("Unhandled exception in remove");
  }
}

function inOrderTraversal(node) {
  if (node === null) return;
  inOrderTraversal(node.left);
  console.log(node.value);
  inOrderTraversal(node.right);
}

function BinarySearchTree(seed) {
  if (!Array.isArray(seed)) {
    throw new Error("BinarySearchTree must be seeded with an array");
  }
  let root = Node(seed[0]);
  seed.slice(1).forEach(x => {
    insert(x, root);
  });
  return root;
}
