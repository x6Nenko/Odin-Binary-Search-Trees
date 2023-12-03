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
        };
   
        // Recursive calls for ancestors of
        // node to be deleted
        if (node.value > value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (node.value < value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        };
    
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
            };
        
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
            };
        
            // Copy Successor Data to node
            node.value = succ.value;
        
            // Delete Successor and return node
            delete this.succ;
            return node;
        };
    };

    // Return the node with the given value.
    find(node, value) {
        // Base case: there are no such node.
        if (node === null) {
            return node;
        };
    
        // Recursive calls to find the node
        if (node.value > value) {
            node.left = this.find(node.left, value);
            return node;
        } else if (node.value < value) {
            node.right = this.find(node.right, value);
            return node;
        };

        console.log(node);
        return node;
    };

    // Traverse the tree in breadth-first level order and 
    // provide each node as an argument to the callback
    levelOrder(callback) {
        // Check if the tree has a root
        if (!this.root) {
            return;
        };

        // Initialize a queue with the root node
        const queue = [this.root];

        // Continue while there are nodes in the queue
        while (queue.length > 0) {
            // Dequeue the front node from the queue
            const currentNode = queue.shift();

            // Call the callback on the current node
            if (callback) {
                callback(currentNode);
            };

            // Enqueue left child if exists
            if (currentNode.left) {
                queue.push(currentNode.left);
            };

            // Enqueue right child if exists
            if (currentNode.right) {
                queue.push(currentNode.right);
            };
        };
    };

    // Print inOrder traversal
    inOrder(node) {
        if (node === null) {
            return;
        };
         
        // First recur on left subtree
        this.inOrder(node.left);
         
        // Now deal with the node
        console.log(node.value);
         
        // Then recur on right subtree
        this.inOrder(node.right);
    };

    // Print preOrder traversal
    preOrder(node) {
        if (node == null) {
            return;
        };

        console.log(node.value);
        this.preOrder(node.left);
        this.preOrder(node.right);
    };

    // Print postOrder traversal
    postOrder(node) {
        if (node === null) {
            return;
        };

        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.value);
    };

    // Return max height of the tree
    height(node) {
        if (node == null)
            return -1;
        else {
            // Compute height of each subtree
            let lheight = this.height(node.left);
            let rheight = this.height(node.right);
 
            // Use the larger one
            if (lheight > rheight) {
                return (lheight + 1);
            } else {
                return (rheight + 1);
            }
        };
    };

    depth(node) {

    };
};

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binaryTree = new Tree(data);

// Define a callback function to perform an operation on each node
const optionalCallback = (node) => {
    console.log(node.value);
};

console.log("Tree by the Default");
binaryTree.prettyPrint();

console.log("Tree after inserting new Value");
binaryTree.insert(111);
binaryTree.prettyPrint();

console.log("Tree after removing Value");
binaryTree.deleteNode(binaryTree.root, 67);
binaryTree.prettyPrint();

console.log("Output for the: find(root, 111)");
binaryTree.find(binaryTree.root, 111);

console.log("Output for the: levelOrder(optionalCallback)");
binaryTree.levelOrder(optionalCallback);

console.log("Output for the: inOrder(root)");
binaryTree.inOrder(binaryTree.root);

console.log("Output for the: preOrder(root)");
binaryTree.preOrder(binaryTree.root);

console.log("Output for the: postOrder(root)");
binaryTree.postOrder(binaryTree.root);

console.log("Max height output: " + binaryTree.height(binaryTree.root));