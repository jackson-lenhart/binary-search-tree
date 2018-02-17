"use strict";

function Node(value, parent = null, left = null, right = null) {
  return {
    value,
    left,
    right
  };
}

function insert(x, root) {
  let currNode = root;
  while (currNode) {
    if (x < currNode.value) {
      if (currNode.left) {
        currNode = currNode.left;
      } else {
        currNode.left = Node(x);
        return;
      }
    } else if (x > currNode.value) {
      if (currNode.right) {
        currNode = currNode.right;
      } else {
        currNode.right = Node(x);
        return;
      }
    } else if (x === currNode.value) {
      throw new Error("cannot insert node with the same value as an existing node");
    } else {
      throw new Error("undefined behavior in insert");
    }
  }

  throw new Error("failed to insert");
}

function remove(x, root, parent = null) {
  let currNode = root;
  while (currNode) {
    if (x < currNode.value) {
      if (currNode.left) {
        parent = currNode;
        currNode = currNode.left;
      } else {
        console.error("Failure to remove: could not find value");
        return;
      }
    } else if (x > currNode.value) {
      if (currNode.right) {
        parent = currNode;
        currNode = currNode.right;
      } else {
        console.error("Failure to remove: could not find value");
        return;
      }
    } else if (x === currNode.value) {
      let toRemove = currNode;
      if (!toRemove.left && !toRemove.right) {
        toRemove === parent.left ?
          parent.left = null :
          parent.right = null;
        return;
      } else if (!toRemove.left || !toRemove.right) {
        if (toRemove.left) {
          parent.left = toRemove.left;
        } else if (toRemove.right) {
          parent.right = toRemove.right;
        } else {
          throw new Error("Unexpected behavior in removal");
        }
        return;
      } else if (toRemove.left && toRemove.right) {
        //find min value in right subtree
        parent = currNode;
        currNode = currNode.right;
        while (currNode.left) {
          parent = currNode;
          currNode = currNode.left;
        }
        toRemove.value = currNode.value;
        return remove(currNode.value, currNode, parent);
      } else {
        throw new Error("Unexpected behavior in removal");
      }
    }
  }
  console.log("Failure to remove: could not find value");
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
