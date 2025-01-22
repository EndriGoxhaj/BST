class Node {
  constructor(data, left, right) {
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
}

let array = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
array.returnBuildTree();
array.prettyPrint();
