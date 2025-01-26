class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor(array, root) {
    this.array = this.mergeSort(array);
    this.root = root;
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }
  returnBuildTree(array = this.array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  find(value, root = this.root) {
    if (!root) return null;
    if (value == root.data) return root;
    if (value > root.data) {
      this.find(value, (root = root.right));
    } else {
      this.find(value, (root = root.left));
    }
  }
  insert(value, node = this.root) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    if (value === node.data) return;
    if (value < node.data) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        this.insert(value, node.left);
      }
    } else {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        this.insert(value, node.right);
      }
    }
  }
  getSuccessor(node) {
    node = node.right;
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }
  delete(value, node = this.root) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      } else {
        let succ = this.getSuccessor(node);
        node.data = succ.data;
        node.right = this.delete(succ.data, node.right);
      }
    }
    return node;
  }

  merge(a, b, c = [], j = 0, i = 0) {
    if (i == a.length && j == b.length) {
      return c;
    }
    if (i == a.length) {
      c.push(...b.slice(j));
      return c;
    }
    if (j == b.length) {
      c.push(...a.slice(i));
      return c;
    }
    if (a[i] == b[j]) {
      c.push(a[i++]);
      j++;
      return this.merge(a, b, c, j, i);
    }
    if (a[i] < b[j]) {
      c.push(a[i++]);
      return this.merge(a, b, c, j, i);
    } else {
      c.push(b[j++]);
      return this.merge(a, b, c, j, i);
    }
  }
  levelOrder(node = this.root, array = [], newArray = []) {
    if (!node) return null;
    array.push(node);
    while (array.length != 0) {
      node = array[0];
      newArray.push(node.data);
      if (node.left !== null) array.push(node.left);
      if (node.right !== null) array.push(node.right);
      array.shift();
    }
    console.log(newArray);
  }
  preOrder(node = this.root) {
    if (!node) return null;
    console.log(node.data);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }
  inOrder(node = this.root, newArray = []) {
    if (!node) return newArray;
    this.inOrder(node.left, newArray);
    newArray.push(node.data);
    this.inOrder(node.right, newArray);

    return newArray;
  }
  postOrder(node = this.root) {
    if (!node) return null;
    this.inOrder(node.left);
    this.inOrder(node.right);
    console.log(node.data);
  }
  height(node = this.root) {
    if (!node) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }
  isBalanced(node = this.root) {
    let left = this.height(node.left);
    let right = this.height(node.right);
    let difference = left - right;
    if (difference > 1 || difference < -1) {
      return null;
    } else {
      return true;
    }
  }
  rebalance(node = this.root) {
    if (!this.isBalanced(node)) {
      console.log("found");
      let array = this.inOrder(node);
      this.root = this.buildTree(array, 0, array.length - 1);
    } else return;
  }
  mergeSort(array) {
    if (array.length <= 1) {
      return array;
    } else {
      const m = Math.floor(array.length / 2);
      const left = this.mergeSort(array.slice(0, m));
      const right = this.mergeSort(array.slice(m));
      return this.merge(left, right);
    }
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

let array = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
array.returnBuildTree();
array.prettyPrint();
array.delete(67);
array.prettyPrint();
array.insert(98);
array.prettyPrint();
array.insert(897);
array.prettyPrint();
array.insert(555);
array.prettyPrint();
array.insert(222);
array.prettyPrint();
array.isBalanced();
array.rebalance();
array.prettyPrint();
