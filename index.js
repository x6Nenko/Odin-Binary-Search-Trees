class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor(dataArray) {
        // root of a binary search tree
        this.root = this.buildTree(dataArray);
    };

    buildTree(dataArray) {
        if (!dataArray || dataArray.length === 0) {
            return null;
        };

        // Sort the array for a balanced BST
        const sortedArray = [...new Set(dataArray)].sort((a, b) => a - b);
        console.log(sortedArray);

        return this.buildTreeRecursive(sortedArray, 0, sortedArray.length - 1);
    };

    buildTreeRecursive(sortedArray, start, end) {
        if (start > end) {
            return null;
        };

        const mid = Math.floor((start + end) / 2);
        const node = new Node(sortedArray[mid]);

        node.left = this.buildTreeRecursive(sortedArray, start, mid - 1);
        node.right = this.buildTreeRecursive(sortedArray, mid + 1, end);

        return node;
    };

    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        };
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        };
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        };
    };

    preOrder(node = this.root) {
        if (node == null)
        {
            return;
        }
        console.log(node.data + " ");
        preOrder(node.left);
        preOrder(node.right);
    };

    // Helper function to call insertNode
    insert(value) {
        this.insertNode(this.root, value);
    };
    
    // A recursive function to insert a new value in BST
    insertNode(node, value) {
        // Add value to the found slot
        if(node === null) {
            return new Node(value);
        };

        // Otherwise, recur down the tree
        if (value < node.value)
            node.left = this.insertNode(node.left, value);
        else if (value > node.value)
            node.right = this.insertNode(node.right, value);
 
        // Return to update the connections or if the value already exists
        return node;
    };

    /* Given a binary search tree and a value, this function
    deletes the value and returns the new root */
    deleteNode(node, value) {
        // Base case: there are no node so keep moving.
        if (node === null) {
            return node;
        }
   
        // Recursive calls for ancestors of
        // node to be deleted
        if (node.value > value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (node.value < value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        }
    
        // We reach here when node is the node
        // to be deleted.
    
        // If one of the children is empty
        if (node.left === null) {
            let temp = node.right;
            delete this.node;
            return temp;
        } else if (node.right === null) {
            let temp = node.left;
            delete this.node;
            return temp;
        }
    
        // If both children exist
        else {
            let succParent = node;
    
            // Find successor
            let succ = node.right;
            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }
        
            // Delete successor.  Since successor
            // is always left child of its parent
            // we can safely make successor's right
            // right child as left of its parent.
            // If there is no succ, then assign
            // succ.right to succParent.right
            if (succParent !== node) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }
        
            // Copy Successor Data to node
            node.value = succ.value;
        
            // Delete Successor and return node
            delete this.succ;
            return node;
        };
  };
};

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binaryTree = new Tree(data);

console.log("Tree by the Default");
binaryTree.prettyPrint();

console.log("Tree after inserting new Value");
binaryTree.insert(111);
binaryTree.prettyPrint();

console.log("Tree after removing Value");
binaryTree.deleteNode(binaryTree.root, 67);
binaryTree.prettyPrint();