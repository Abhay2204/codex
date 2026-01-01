// Phase 1: Foundations Problems
export const phase1Problems = [
  // ===== 1. Language Basics & OOP (10 problems) =====
  {
    title: 'Basic Calculator',
    difficulty: 'Easy',
    tags: ['OOP', 'Basics', 'Design'],
    acceptanceRate: 72.5,
    visualizationType: 'Array',
    description: 'Create a Calculator class that handles addition, subtraction, multiplication, and division with error handling for division by zero.',
    starterCode: `class Calculator {
  add(a, b) {
    // Your code here
  }
  subtract(a, b) {
    // Your code here
  }
  multiply(a, b) {
    // Your code here
  }
  divide(a, b) {
    // Handle division by zero
  }
}`,
    solution: `class Calculator {
  add(a, b) {
    return a + b;
  }
  subtract(a, b) {
    return a - b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}`,
    examples: [{ input: 'calc.add(5, 3)', expected: '8' }, { input: 'calc.divide(10, 0)', expected: 'Error: Division by zero' }]
  },
  {
    title: 'Student Management System',
    difficulty: 'Medium',
    tags: ['OOP', 'Basics', 'Inheritance'],
    acceptanceRate: 58.3,
    visualizationType: 'Array',
    description: 'Implement a system using Inheritance where "Person" is the base class and "Student" and "Teacher" are derived classes with specific properties.',
    starterCode: `class Person {
  constructor(name, age) {
    // Your code here
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    // Your code here
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    // Your code here
  }
}`,
    solution: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return \`Hi, I'm \${this.name}, \${this.age} years old.\`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} is studying.\`;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
  
  teach() {
    return \`\${this.name} is teaching \${this.subject}.\`;
  }
}`,
    examples: [{ input: 'new Student("John", 20, "A")', expected: 'Student { name: "John", age: 20, grade: "A" }' }]
  },
  {
    title: 'Bank Account Encapsulation',
    difficulty: 'Easy',
    tags: ['OOP', 'Basics', 'Encapsulation'],
    acceptanceRate: 65.8,
    visualizationType: 'Array',
    description: 'Design a BankAccount class with private balance and public methods for deposit() and withdraw() with validation.',
    starterCode: `class BankAccount {
  #balance = 0;
  
  deposit(amount) {
    // Validate and add to balance
  }
  
  withdraw(amount) {
    // Validate and subtract from balance
  }
  
  getBalance() {
    // Return current balance
  }
}`,
    solution: `class BankAccount {
  #balance = 0;
  
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
}`,
    examples: [{ input: 'account.deposit(100); account.withdraw(30); account.getBalance()', expected: '70' }]
  },
  {
    title: 'Shape Polymorphism',
    difficulty: 'Medium',
    tags: ['OOP', 'Basics', 'Polymorphism'],
    acceptanceRate: 55.2,
    visualizationType: 'Array',
    description: 'Create an abstract class Shape with a method calculateArea(), and implement it for Circle, Rectangle, and Triangle.',
    starterCode: `class Shape {
  calculateArea() {
    throw new Error('Method must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) { /* Your code */ }
  calculateArea() { /* Your code */ }
}

class Rectangle extends Shape {
  constructor(width, height) { /* Your code */ }
  calculateArea() { /* Your code */ }
}

class Triangle extends Shape {
  constructor(base, height) { /* Your code */ }
  calculateArea() { /* Your code */ }
}`,
    solution: `class Shape {
  calculateArea() {
    throw new Error('Method must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  calculateArea() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  calculateArea() {
    return 0.5 * this.base * this.height;
  }
}`,
    examples: [{ input: 'new Circle(5).calculateArea()', expected: '78.54' }]
  },
  {
    title: 'Interface Implementation',
    difficulty: 'Medium',
    tags: ['OOP', 'Basics', 'Interface'],
    acceptanceRate: 52.1,
    visualizationType: 'Array',
    description: 'Define a Playable interface and implement it in MusicPlayer and VideoPlayer classes with play(), pause(), and stop() methods.',
    starterCode: `// Playable interface concept
class MusicPlayer {
  play() { /* Your code */ }
  pause() { /* Your code */ }
  stop() { /* Your code */ }
}

class VideoPlayer {
  play() { /* Your code */ }
  pause() { /* Your code */ }
  stop() { /* Your code */ }
}`,
    solution: `class MusicPlayer {
  constructor() {
    this.isPlaying = false;
  }
  play() {
    this.isPlaying = true;
    return 'Playing music...';
  }
  pause() {
    this.isPlaying = false;
    return 'Music paused';
  }
  stop() {
    this.isPlaying = false;
    return 'Music stopped';
  }
}

class VideoPlayer {
  constructor() {
    this.isPlaying = false;
  }
  play() {
    this.isPlaying = true;
    return 'Playing video...';
  }
  pause() {
    this.isPlaying = false;
    return 'Video paused';
  }
  stop() {
    this.isPlaying = false;
    return 'Video stopped';
  }
}`,
    examples: [{ input: 'musicPlayer.play()', expected: 'Playing music...' }]
  },
  {
    title: 'Generic Storage Box',
    difficulty: 'Easy',
    tags: ['OOP', 'Basics', 'Generics'],
    acceptanceRate: 68.4,
    visualizationType: 'Array',
    description: 'Write a generic class (or template) that can store and retrieve any data type.',
    starterCode: `class StorageBox {
  constructor() {
    this.item = null;
  }
  
  store(item) {
    // Store the item
  }
  
  retrieve() {
    // Return the stored item
  }
}`,
    solution: `class StorageBox {
  constructor() {
    this.item = null;
  }
  
  store(item) {
    this.item = item;
  }
  
  retrieve() {
    return this.item;
  }
  
  isEmpty() {
    return this.item === null;
  }
  
  clear() {
    this.item = null;
  }
}`,
    examples: [{ input: 'box.store(42); box.retrieve()', expected: '42' }]
  },
  {
    title: 'Custom Exception Handler',
    difficulty: 'Medium',
    tags: ['OOP', 'Basics', 'Exception'],
    acceptanceRate: 48.7,
    visualizationType: 'Array',
    description: 'Write a program that throws a custom InsufficientFundsException when a withdrawal exceeds a bank balance.',
    starterCode: `class InsufficientFundsException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InsufficientFundsException';
  }
}

function withdraw(balance, amount) {
  // Throw InsufficientFundsException if amount > balance
}`,
    solution: `class InsufficientFundsException extends Error {
  constructor(message, balance, requested) {
    super(message);
    this.name = 'InsufficientFundsException';
    this.balance = balance;
    this.requested = requested;
  }
}

function withdraw(balance, amount) {
  if (amount > balance) {
    throw new InsufficientFundsException(
      \`Insufficient funds. Balance: \${balance}, Requested: \${amount}\`,
      balance,
      amount
    );
  }
  return balance - amount;
}`,
    examples: [{ input: 'withdraw(100, 150)', expected: 'InsufficientFundsException: Insufficient funds' }]
  },
  {
    title: 'File Data Parser',
    difficulty: 'Medium',
    tags: ['OOP', 'Basics', 'String'],
    acceptanceRate: 45.3,
    visualizationType: 'Array',
    description: 'Write a function to parse CSV data string into objects and return a summary.',
    starterCode: `function parseCSV(csvString) {
  // Parse CSV string into array of objects
  // Return summary with count and data
}`,
    examples: [{ input: '"name,age\\nJohn,25\\nJane,30"', expected: '[{name:"John",age:"25"},{name:"Jane",age:"30"}]' }]
  },
  {
    title: 'Singleton Pattern',
    difficulty: 'Medium',
    tags: ['OOP', 'Basics', 'Design Pattern'],
    acceptanceRate: 51.6,
    visualizationType: 'Array',
    description: 'Implement a DatabaseConnection class that ensures only one instance of the class is created (Singleton Pattern).',
    starterCode: `class DatabaseConnection {
  static instance = null;
  
  constructor() {
    // Ensure only one instance
  }
  
  static getInstance() {
    // Return the single instance
  }
  
  connect() {
    return 'Connected to database';
  }
}`,
    examples: [{ input: 'DatabaseConnection.getInstance() === DatabaseConnection.getInstance()', expected: 'true' }]
  },
  {
    title: 'Lambda Filter Even Numbers',
    difficulty: 'Easy',
    tags: ['OOP', 'Basics', 'Functional'],
    acceptanceRate: 74.2,
    visualizationType: 'Array',
    description: 'Write a function that takes a list of integers and returns only the even numbers using functional features (filter, lambda).',
    starterCode: `function filterEven(numbers) {
  // Use filter with arrow function to return even numbers
}`,
    examples: [{ input: 'filterEven([1, 2, 3, 4, 5, 6])', expected: '[2, 4, 6]' }]
  },

  // ===== 2. Algorithmic Complexity (10 problems) =====
  {
    title: 'Iterative Search O(n)',
    difficulty: 'Easy',
    tags: ['Complexity', 'Big-O', 'Array'],
    acceptanceRate: 78.5,
    visualizationType: 'Array',
    description: 'Write a function to find an element in an array using linear search. State its Time Complexity O(n).',
    starterCode: `function linearSearch(arr, target) {
  // Iterate through array to find target
  // Time Complexity: O(n)
}`,
    examples: [{ input: 'linearSearch([1, 3, 5, 7, 9], 5)', expected: '2' }]
  },
  {
    title: 'Nested Loops Analysis O(n³)',
    difficulty: 'Medium',
    tags: ['Complexity', 'Big-O', 'Analysis'],
    acceptanceRate: 42.3,
    visualizationType: 'Array',
    description: 'Write a program with three nested loops and mathematically prove why its complexity is O(n³).',
    starterCode: `function tripleNestedLoop(n) {
  let count = 0;
  // Three nested loops
  // Each loop runs n times: n * n * n = O(n³)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        count++;
      }
    }
  }
  return count;
}`,
    examples: [{ input: 'tripleNestedLoop(3)', expected: '27' }]
  },
  {
    title: 'Binary Search O(log n)',
    difficulty: 'Easy',
    tags: ['Complexity', 'Big-O', 'Binary Search'],
    acceptanceRate: 55.2,
    visualizationType: 'Array',
    description: 'Implement binary search and explain why its complexity is O(log n) - halving the search space each iteration.',
    starterCode: `function binarySearch(arr, target) {
  // Binary search implementation
  // Time Complexity: O(log n) - halves search space each step
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    // Your code here
  }
  return -1;
}`,
    examples: [{ input: 'binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 6)', expected: '5' }]
  },
  {
    title: 'Space Trade-off: Find Duplicate',
    difficulty: 'Medium',
    tags: ['Complexity', 'Big-O', 'Hash Table', 'Array'],
    acceptanceRate: 48.9,
    visualizationType: 'Array',
    description: 'Solve "Find Duplicate" using a Hash Set O(n) space vs nested loop O(1) space. Compare both approaches.',
    starterCode: `// O(n) time, O(n) space - using Hash Set
function findDuplicateHash(nums) {
  const seen = new Set();
  // Your code here
}

// O(n²) time, O(1) space - using nested loops
function findDuplicateLoop(nums) {
  // Your code here
}`,
    examples: [{ input: 'findDuplicateHash([1, 3, 4, 2, 2])', expected: '2' }]
  },
  {
    title: 'Recursive Fibonacci O(2^n)',
    difficulty: 'Easy',
    tags: ['Complexity', 'Big-O', 'Recursion'],
    acceptanceRate: 62.4,
    visualizationType: 'Tree',
    description: 'Implement Fibonacci recursively and explain why the time complexity is O(2^n) due to overlapping subproblems.',
    starterCode: `function fibRecursive(n) {
  // Naive recursive implementation
  // Time Complexity: O(2^n) - exponential due to repeated calculations
  if (n <= 1) return n;
  // Your code here
}`,
    examples: [{ input: 'fibRecursive(10)', expected: '55' }]
  },
  {
    title: 'Optimized Fibonacci O(n)',
    difficulty: 'Easy',
    tags: ['Complexity', 'Big-O', 'DP'],
    acceptanceRate: 68.7,
    visualizationType: 'DP',
    description: 'Re-implement Fibonacci using an array (tabulation) to achieve O(n) time complexity.',
    starterCode: `function fibOptimized(n) {
  // Tabulation approach - O(n) time, O(n) space
  if (n <= 1) return n;
  const dp = [0, 1];
  // Your code here
}`,
    examples: [{ input: 'fibOptimized(10)', expected: '55' }]
  },
  {
    title: 'String Concatenation Comparison',
    difficulty: 'Medium',
    tags: ['Complexity', 'Big-O', 'String'],
    acceptanceRate: 45.6,
    visualizationType: 'Array',
    description: 'Compare the runtime of concatenating strings in a loop using String (O(n²)) vs StringBuilder/Array.join (O(n)).',
    starterCode: `// Slow: O(n²) - creates new string each iteration
function concatSlow(n) {
  let result = '';
  for (let i = 0; i < n; i++) {
    result += 'a'; // Creates new string each time
  }
  return result;
}

// Fast: O(n) - uses array and joins at end
function concatFast(n) {
  const arr = [];
  // Your code here
}`,
    examples: [{ input: 'concatFast(5)', expected: '"aaaaa"' }]
  },
  {
    title: 'Dynamic Array Growth',
    difficulty: 'Medium',
    tags: ['Complexity', 'Big-O', 'Array', 'Amortized'],
    acceptanceRate: 38.4,
    visualizationType: 'Array',
    description: 'Write code to simulate an array that doubles in size when full. Calculate the Amortized Time Complexity of insertion.',
    starterCode: `class DynamicArray {
  constructor() {
    this.arr = new Array(1);
    this.size = 0;
    this.capacity = 1;
  }
  
  push(element) {
    // If full, double the capacity
    // Amortized O(1) insertion
  }
}`,
    examples: [{ input: 'arr.push(1); arr.push(2); arr.push(3)', expected: 'size: 3, capacity: 4' }]
  },
  {
    title: 'Bubble Sort Analysis',
    difficulty: 'Easy',
    tags: ['Complexity', 'Big-O', 'Sorting'],
    acceptanceRate: 71.2,
    visualizationType: 'Array',
    description: 'Implement Bubble Sort and identify the best-case O(n) and worst-case O(n²) Big-O.',
    starterCode: `function bubbleSort(arr) {
  // Best case: O(n) - already sorted
  // Worst case: O(n²) - reverse sorted
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    // Your code here
  }
  return arr;
}`,
    examples: [{ input: 'bubbleSort([64, 34, 25, 12, 22])', expected: '[12, 22, 25, 34, 64]' }]
  },
  {
    title: 'Recursive Depth Stack Overflow',
    difficulty: 'Medium',
    tags: ['Complexity', 'Big-O', 'Recursion', 'Stack'],
    acceptanceRate: 44.8,
    visualizationType: 'Stack',
    description: 'Write a recursive function and determine the Space Complexity of the call stack O(n).',
    starterCode: `function recursiveSum(n) {
  // Space Complexity: O(n) - n stack frames
  // Will cause stack overflow for large n
  if (n <= 0) return 0;
  return n + recursiveSum(n - 1);
}

// Iterative version - O(1) space
function iterativeSum(n) {
  // Your code here
}`,
    examples: [{ input: 'recursiveSum(5)', expected: '15' }]
  },

  // ===== 3. Arrays & Strings (10 problems) =====
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    acceptanceRate: 48.5,
    visualizationType: 'Array',
    description: 'Find two numbers in an array that add up to a specific target. Return their indices.',
    starterCode: `function twoSum(nums, target) {
  // Use hash map for O(n) solution
  const map = new Map();
  // Your code here
}`,
    examples: [{ input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' }]
  },
  {
    title: 'Reverse String In-Place',
    difficulty: 'Easy',
    tags: ['Array', 'String', 'Two Pointers'],
    acceptanceRate: 75.2,
    visualizationType: 'Array',
    description: 'Reverse a string in-place without using library reverse functions. Use two pointers.',
    starterCode: `function reverseString(s) {
  // Two pointer approach - swap from both ends
  let left = 0, right = s.length - 1;
  // Your code here
}`,
    examples: [{ input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' }]
  },
  {
    title: 'Find Majority Element',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'Sorting'],
    acceptanceRate: 63.8,
    visualizationType: 'Array',
    description: 'Find the element that appears more than n/2 times in an array. Use Boyer-Moore Voting Algorithm.',
    starterCode: `function majorityElement(nums) {
  // Boyer-Moore Voting Algorithm - O(n) time, O(1) space
  let candidate = null, count = 0;
  // Your code here
}`,
    examples: [{ input: 'nums = [3,2,3]', expected: '3' }]
  },
  {
    title: 'Move Zeroes',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    acceptanceRate: 61.2,
    visualizationType: 'Array',
    description: 'Move all zeroes in an array to the end while maintaining the relative order of non-zero elements.',
    starterCode: `function moveZeroes(nums) {
  // Two pointer approach - in-place
  let insertPos = 0;
  // Your code here
}`,
    examples: [{ input: 'nums = [0,1,0,3,12]', expected: '[1,3,12,0,0]' }]
  },
  {
    title: 'Valid Anagram',
    difficulty: 'Easy',
    tags: ['Array', 'String', 'Hash Table', 'Sorting'],
    acceptanceRate: 62.5,
    visualizationType: 'HashMap',
    description: 'Determine if two strings are anagrams of each other (same characters, different order).',
    starterCode: `function isAnagram(s, t) {
  // Use character frequency count
  if (s.length !== t.length) return false;
  const count = {};
  // Your code here
}`,
    examples: [{ input: 's = "anagram", t = "nagaram"', expected: 'true' }]
  },
  {
    title: 'Rotate Image 90 Degrees',
    difficulty: 'Medium',
    tags: ['Array', 'Matrix', 'Math'],
    acceptanceRate: 68.4,
    visualizationType: 'Array',
    description: 'Rotate an n × n 2D matrix (representing an image) by 90 degrees clockwise in-place.',
    starterCode: `function rotate(matrix) {
  // Step 1: Transpose the matrix
  // Step 2: Reverse each row
  const n = matrix.length;
  // Your code here
}`,
    examples: [{ input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expected: '[[7,4,1],[8,5,2],[9,6,3]]' }]
  },
  {
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    tags: ['Array', 'String'],
    acceptanceRate: 40.8,
    visualizationType: 'Array',
    description: 'Find the longest common prefix string amongst an array of strings.',
    starterCode: `function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  // Compare with each string and shrink prefix
  // Your code here
}`,
    examples: [{ input: 'strs = ["flower","flow","flight"]', expected: '"fl"' }]
  },
  {
    title: 'Container With Most Water',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    acceptanceRate: 54.3,
    visualizationType: 'Array',
    description: 'Find two lines that together with the x-axis form a container containing the most water.',
    starterCode: `function maxArea(height) {
  // Two pointer approach - start from both ends
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  // Your code here
}`,
    examples: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' }]
  },
  {
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    tags: ['Array', 'Prefix Sum'],
    acceptanceRate: 64.7,
    visualizationType: 'Array',
    description: 'Return an array where each element is the product of all other elements without using division.',
    starterCode: `function productExceptSelf(nums) {
  // Use prefix and suffix products
  const n = nums.length;
  const result = new Array(n).fill(1);
  // Your code here
}`,
    examples: [{ input: 'nums = [1,2,3,4]', expected: '[24,12,8,6]' }]
  },
  {
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    tags: ['Array', 'String', 'Math'],
    acceptanceRate: 16.6,
    visualizationType: 'Array',
    description: 'Implement a function that converts a string to a 32-bit signed integer (like C atoi function).',
    starterCode: `function myAtoi(s) {
  // Handle: whitespace, sign, digits, overflow
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  // Your code here
}`,
    examples: [{ input: 's = "   -42"', expected: '-42' }]
  },

  // ===== 4. Linked Lists (10 problems) =====
  {
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    acceptanceRate: 71.0,
    visualizationType: 'Array',
    description: 'Reverse a singly linked list. Implement both iterative and recursive solutions.',
    starterCode: `function reverseListIterative(head) {
  let prev = null, curr = head;
  while (curr) {
    // Your code here
  }
  return prev;
}

function reverseListRecursive(head) {
  // Base case and recursive call
}`,
    examples: [{ input: 'head = [1,2,3,4,5]', expected: '[5,4,3,2,1]' }]
  },
  {
    title: 'Detect Cycle in Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Two Pointers', 'Fast Slow'],
    acceptanceRate: 46.8,
    visualizationType: 'Array',
    description: 'Use "Fast and Slow Pointers" (Floyd\'s Cycle Detection) to determine if a linked list has a loop.',
    starterCode: `function hasCycle(head) {
  // Fast pointer moves 2 steps, slow moves 1
  // If they meet, there's a cycle
  let slow = head, fast = head;
  // Your code here
}`,
    examples: [{ input: 'head = [3,2,0,-4] with cycle at pos 1', expected: 'true' }]
  },
  {
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    acceptanceRate: 62.5,
    visualizationType: 'Array',
    description: 'Create a new sorted list from two existing sorted linked lists.',
    starterCode: `function mergeTwoLists(l1, l2) {
  // Use dummy head for easier handling
  const dummy = { val: 0, next: null };
  let current = dummy;
  // Your code here
}`,
    examples: [{ input: 'l1 = [1,2,4], l2 = [1,3,4]', expected: '[1,1,2,3,4,4]' }]
  },
  {
    title: 'Remove N-th Node From End',
    difficulty: 'Medium',
    tags: ['Linked List', 'Two Pointers'],
    acceptanceRate: 40.2,
    visualizationType: 'Array',
    description: 'Delete the n-th node from the end of a singly linked list in one pass using two pointers.',
    starterCode: `function removeNthFromEnd(head, n) {
  // Use two pointers with n gap between them
  const dummy = { val: 0, next: head };
  let fast = dummy, slow = dummy;
  // Your code here
}`,
    examples: [{ input: 'head = [1,2,3,4,5], n = 2', expected: '[1,2,3,5]' }]
  },
  {
    title: 'Palindrome Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Two Pointers', 'Stack'],
    acceptanceRate: 49.5,
    visualizationType: 'Array',
    description: 'Check if a linked list reads the same forward and backward (palindrome).',
    starterCode: `function isPalindrome(head) {
  // Find middle, reverse second half, compare
  // Or use stack to store first half
  // Your code here
}`,
    examples: [{ input: 'head = [1,2,2,1]', expected: 'true' }]
  },
  {
    title: 'Middle of Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Two Pointers', 'Fast Slow'],
    acceptanceRate: 74.3,
    visualizationType: 'Array',
    description: 'Return the middle node of a linked list. If two middle nodes, return the second one.',
    starterCode: `function middleNode(head) {
  // Fast pointer moves 2x speed of slow
  // When fast reaches end, slow is at middle
  let slow = head, fast = head;
  // Your code here
}`,
    examples: [{ input: 'head = [1,2,3,4,5]', expected: '[3,4,5]' }]
  },
  {
    title: 'Intersection of Two Linked Lists',
    difficulty: 'Easy',
    tags: ['Linked List', 'Two Pointers', 'Hash Table'],
    acceptanceRate: 53.8,
    visualizationType: 'Array',
    description: 'Find the node where two singly linked lists intersect. Return null if no intersection.',
    starterCode: `function getIntersectionNode(headA, headB) {
  // Two pointer technique - switch lists when reaching end
  // They will meet at intersection or both be null
  let pA = headA, pB = headB;
  // Your code here
}`,
    examples: [{ input: 'listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], intersect at 8', expected: 'Node with value 8' }]
  },
  {
    title: 'Delete Node in Linked List',
    difficulty: 'Medium',
    tags: ['Linked List'],
    acceptanceRate: 73.6,
    visualizationType: 'Array',
    description: 'Delete a node in a linked list given access only to that node (not the head).',
    starterCode: `function deleteNode(node) {
  // Copy next node's value to current
  // Then skip the next node
  // Your code here
}`,
    examples: [{ input: 'head = [4,5,1,9], node = 5', expected: '[4,1,9]' }]
  },
  {
    title: 'Swap Nodes in Pairs',
    difficulty: 'Medium',
    tags: ['Linked List', 'Recursion'],
    acceptanceRate: 60.5,
    visualizationType: 'Array',
    description: 'Swap every two adjacent nodes in a linked list. Do not modify node values.',
    starterCode: `function swapPairs(head) {
  // Use dummy node and swap pairs iteratively
  const dummy = { val: 0, next: head };
  let prev = dummy;
  // Your code here
}`,
    examples: [{ input: 'head = [1,2,3,4]', expected: '[2,1,4,3]' }]
  },
  {
    title: 'Copy List with Random Pointer',
    difficulty: 'Medium',
    tags: ['Linked List', 'Hash Table'],
    acceptanceRate: 51.2,
    visualizationType: 'Array',
    description: 'Clone a linked list where each node has a "next" and a "random" pointer.',
    starterCode: `function copyRandomList(head) {
  // Use hash map to store original -> copy mapping
  // First pass: create all nodes
  // Second pass: set next and random pointers
  const map = new Map();
  // Your code here
}`,
    examples: [{ input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', expected: 'Deep copy of the list' }]
  },

  // ===== 5. Stacks & Queues (10 problems) =====
  {
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    acceptanceRate: 40.5,
    visualizationType: 'Stack',
    description: 'Use a Stack to check if brackets (), [], {} are closed in the correct order.',
    starterCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  // Your code here
}`,
    examples: [{ input: 's = "()[]{}"', expected: 'true' }, { input: 's = "(]"', expected: 'false' }]
  },
  {
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    tags: ['Stack', 'Queue', 'Design'],
    acceptanceRate: 60.8,
    visualizationType: 'Stack',
    description: 'Build a FIFO queue using two LIFO stacks.',
    starterCode: `class MyQueue {
  constructor() {
    this.stack1 = []; // For push
    this.stack2 = []; // For pop
  }
  
  push(x) { /* Your code */ }
  pop() { /* Your code */ }
  peek() { /* Your code */ }
  empty() { /* Your code */ }
}`,
    examples: [{ input: 'push(1), push(2), peek(), pop(), empty()', expected: '1, 1, false' }]
  },
  {
    title: 'Min Stack',
    difficulty: 'Medium',
    tags: ['Stack', 'Design'],
    acceptanceRate: 52.3,
    visualizationType: 'Stack',
    description: 'Design a stack that supports push, pop, top, and getMin in O(1) time.',
    starterCode: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // Track minimums
  }
  
  push(val) { /* Your code */ }
  pop() { /* Your code */ }
  top() { /* Your code */ }
  getMin() { /* Your code */ }
}`,
    examples: [{ input: 'push(-2), push(0), push(-3), getMin(), pop(), getMin()', expected: '-3, -2' }]
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    tags: ['Stack', 'Math', 'Array'],
    acceptanceRate: 44.8,
    visualizationType: 'Stack',
    description: 'Calculate the result of a postfix expression like "2 1 + 3 *" using a stack.',
    starterCode: `function evalRPN(tokens) {
  const stack = [];
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b)
  };
  // Your code here
}`,
    examples: [{ input: 'tokens = ["2","1","+","3","*"]', expected: '9' }]
  },
  {
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    tags: ['Stack', 'Array', 'Monotonic Stack'],
    acceptanceRate: 66.5,
    visualizationType: 'Stack',
    description: 'Use a Monotonic Stack to find how many days you must wait for a warmer temperature.',
    starterCode: `function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // Store indices
  // Your code here
}`,
    examples: [{ input: 'temperatures = [73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]' }]
  },
  {
    title: 'Circular Queue',
    difficulty: 'Medium',
    tags: ['Queue', 'Array', 'Design'],
    acceptanceRate: 51.7,
    visualizationType: 'Queue',
    description: 'Implement a queue using a fixed-size array that wraps around (circular buffer).',
    starterCode: `class MyCircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.head = 0;
    this.tail = -1;
    this.size = 0;
    this.capacity = k;
  }
  
  enQueue(value) { /* Your code */ }
  deQueue() { /* Your code */ }
  Front() { /* Your code */ }
  Rear() { /* Your code */ }
  isEmpty() { /* Your code */ }
  isFull() { /* Your code */ }
}`,
    examples: [{ input: 'MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), Rear()', expected: '3' }]
  },
  {
    title: 'Simplify Unix Path',
    difficulty: 'Medium',
    tags: ['Stack', 'String'],
    acceptanceRate: 39.4,
    visualizationType: 'Stack',
    description: 'Given a Unix-style absolute path, simplify it (e.g., /home/../usr/ -> /usr).',
    starterCode: `function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');
  // Handle '.', '..', and directory names
  // Your code here
}`,
    examples: [{ input: 'path = "/home//foo/"', expected: '"/home/foo"' }]
  },
  {
    title: 'Implement Stack using Queues',
    difficulty: 'Easy',
    tags: ['Stack', 'Queue', 'Design'],
    acceptanceRate: 58.2,
    visualizationType: 'Queue',
    description: 'Build a LIFO stack using two FIFO queues.',
    starterCode: `class MyStack {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }
  
  push(x) { /* Your code */ }
  pop() { /* Your code */ }
  top() { /* Your code */ }
  empty() { /* Your code */ }
}`,
    examples: [{ input: 'push(1), push(2), top(), pop(), empty()', expected: '2, 2, false' }]
  },
  {
    title: 'Asteroid Collision',
    difficulty: 'Medium',
    tags: ['Stack', 'Array', 'Simulation'],
    acceptanceRate: 44.6,
    visualizationType: 'Stack',
    description: 'Use a stack to simulate the collision of asteroids moving in different directions.',
    starterCode: `function asteroidCollision(asteroids) {
  const stack = [];
  // Positive = moving right, Negative = moving left
  // Collision happens when right-moving meets left-moving
  // Your code here
}`,
    examples: [{ input: 'asteroids = [5,10,-5]', expected: '[5,10]' }]
  },
  {
    title: 'Number of Recent Calls',
    difficulty: 'Easy',
    tags: ['Queue', 'Design', 'Data Stream'],
    acceptanceRate: 73.4,
    visualizationType: 'Queue',
    description: 'Implement a class that counts the number of recent requests within a 3000ms time window using a Queue.',
    starterCode: `class RecentCounter {
  constructor() {
    this.queue = [];
  }
  
  ping(t) {
    // Add timestamp t to queue
    // Remove timestamps older than t - 3000
    // Return count of requests in window
    // Your code here
  }
}`,
    examples: [{ input: 'ping(1), ping(100), ping(3001), ping(3002)', expected: '1, 2, 3, 3' }]
  }
];


// ========================================
// PHASE 2: INTERMEDIATE - Core Logic
// ========================================

export const phase2Problems = [
  // ===== 1. Searching Algorithms (10 problems) =====
  {
    title: 'Binary Search',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 55.2,
    visualizationType: 'Array',
    description: 'Implement the standard binary search algorithm to find a target in a sorted array. Return the index if found, else return -1.',
    starterCode: `function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Your code here
  }
  return -1;
}`,
    examples: [{ input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' }]
  },
  {
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 38.5,
    visualizationType: 'Array',
    description: 'Find a target in an array that has been rotated at some pivot point. The array was originally sorted in ascending order.',
    starterCode: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  // Determine which half is sorted
  // Then check if target is in that half
  // Your code here
}`,
    examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4' }]
  },
  {
    title: 'Search Insert Position',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 44.3,
    visualizationType: 'Array',
    description: 'Return the index where a target would be inserted to keep the array sorted. If target exists, return its index.',
    starterCode: `function searchInsert(nums, target) {
  let left = 0, right = nums.length;
  // Binary search for insertion point
  // Your code here
}`,
    examples: [{ input: 'nums = [1,3,5,6], target = 5', expected: '2' }, { input: 'nums = [1,3,5,6], target = 2', expected: '1' }]
  },
  {
    title: 'Find First and Last Position',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 41.8,
    visualizationType: 'Array',
    description: 'Find the starting and ending index of a given target value in a sorted array. Return [-1, -1] if not found.',
    starterCode: `function searchRange(nums, target) {
  // Use two binary searches:
  // 1. Find leftmost occurrence
  // 2. Find rightmost occurrence
  function findLeft(nums, target) {
    // Your code here
  }
  function findRight(nums, target) {
    // Your code here
  }
  return [findLeft(nums, target), findRight(nums, target)];
}`,
    examples: [{ input: 'nums = [5,7,7,8,8,10], target = 8', expected: '[3, 4]' }]
  },
  {
    title: 'Peak Index in Mountain Array',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 69.8,
    visualizationType: 'Array',
    description: 'Find the highest point (peak) in an array that strictly increases then strictly decreases.',
    starterCode: `function peakIndexInMountainArray(arr) {
  let left = 0, right = arr.length - 1;
  // If arr[mid] < arr[mid+1], peak is on right
  // Otherwise, peak is on left (including mid)
  // Your code here
}`,
    examples: [{ input: 'arr = [0,2,1,0]', expected: '1' }]
  },
  {
    title: 'Square Root (x)',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Math'],
    acceptanceRate: 37.4,
    visualizationType: 'Array',
    description: 'Compute and return the integer square root of x using binary search. Do not use built-in sqrt functions.',
    starterCode: `function mySqrt(x) {
  if (x < 2) return x;
  let left = 1, right = Math.floor(x / 2);
  // Binary search for largest n where n*n <= x
  // Your code here
}`,
    examples: [{ input: 'x = 8', expected: '2' }, { input: 'x = 16', expected: '4' }]
  },
  {
    title: 'Capacity To Ship Packages',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Array', 'Greedy'],
    acceptanceRate: 64.7,
    visualizationType: 'Array',
    description: 'Find the minimum ship capacity to ship all packages within D days. Packages must be shipped in order.',
    starterCode: `function shipWithinDays(weights, days) {
  // Binary search on capacity
  // Min capacity = max(weights), Max = sum(weights)
  function canShip(capacity) {
    // Check if we can ship within 'days' using this capacity
  }
  // Your code here
}`,
    examples: [{ input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', expected: '15' }]
  },
  {
    title: 'Find Peak Element',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 45.9,
    visualizationType: 'Array',
    description: 'Find an element that is strictly greater than its neighbors in O(log n) time. Array may contain multiple peaks.',
    starterCode: `function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  // Move towards the higher neighbor
  // Your code here
}`,
    examples: [{ input: 'nums = [1,2,3,1]', expected: '2' }]
  },
  {
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Array'],
    acceptanceRate: 52.3,
    visualizationType: 'Array',
    description: 'Koko can eat at speed k bananas/hour. Determine the minimum integer speed k to eat all piles within h hours.',
    starterCode: `function minEatingSpeed(piles, h) {
  // Binary search on eating speed k
  // Min k = 1, Max k = max(piles)
  function canFinish(k) {
    // Calculate hours needed at speed k
  }
  // Your code here
}`,
    examples: [{ input: 'piles = [3,6,7,11], h = 8', expected: '4' }]
  },
  {
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    tags: ['Binary Search', 'Array', 'Divide and Conquer'],
    acceptanceRate: 35.8,
    visualizationType: 'Array',
    description: 'Find the median of two sorted arrays. The overall run time complexity should be O(log(m+n)).',
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Binary search on the smaller array
  // Partition both arrays such that:
  // left_part has (m+n+1)/2 elements
  // max(left_part) <= min(right_part)
  // Your code here
}`,
    examples: [{ input: 'nums1 = [1,3], nums2 = [2]', expected: '2.0' }]
  },

  // ===== 2. Sorting Algorithms (10 problems) =====
  {
    title: 'Merge Sort',
    difficulty: 'Medium',
    tags: ['Sorting', 'Divide and Conquer', 'Array'],
    acceptanceRate: 58.4,
    visualizationType: 'Array',
    description: 'Implement the stable O(n log n) Merge Sort algorithm using divide and conquer.',
    starterCode: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  // Merge two sorted arrays
  // Your code here
}`,
    examples: [{ input: 'arr = [38,27,43,3,9,82,10]', expected: '[3,9,10,27,38,43,82]' }]
  },
  {
    title: 'Quick Sort',
    difficulty: 'Medium',
    tags: ['Sorting', 'Divide and Conquer', 'Array'],
    acceptanceRate: 52.1,
    visualizationType: 'Array',
    description: 'Implement Quick Sort using the partition method (Lomuto or Hoare scheme).',
    starterCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  // Lomuto partition scheme
  const pivot = arr[high];
  // Your code here
}`,
    examples: [{ input: 'arr = [10,7,8,9,1,5]', expected: '[1,5,7,8,9,10]' }]
  },
  {
    title: 'Sort Colors',
    difficulty: 'Medium',
    tags: ['Sorting', 'Array', 'Two Pointers'],
    acceptanceRate: 58.4,
    visualizationType: 'Array',
    description: 'Sort an array of 0s, 1s, and 2s in-place using the Dutch National Flag algorithm.',
    starterCode: `function sortColors(nums) {
  // Three pointers: low, mid, high
  // 0s go to left, 2s go to right, 1s stay in middle
  let low = 0, mid = 0, high = nums.length - 1;
  // Your code here
}`,
    examples: [{ input: 'nums = [2,0,2,1,1,0]', expected: '[0,0,1,1,2,2]' }]
  },
  {
    title: 'Kth Largest Element in Array',
    difficulty: 'Medium',
    tags: ['Sorting', 'Heap', 'Divide and Conquer', 'QuickSelect'],
    acceptanceRate: 65.8,
    visualizationType: 'Array',
    description: 'Find the kth largest element using QuickSelect (average O(n)) or Heap Sort.',
    starterCode: `function findKthLargest(nums, k) {
  // QuickSelect approach
  function quickSelect(left, right, kSmallest) {
    if (left === right) return nums[left];
    
    const pivotIndex = partition(left, right);
    // Your code here
  }
  
  function partition(left, right) {
    // Your code here
  }
  
  return quickSelect(0, nums.length - 1, nums.length - k);
}`,
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', expected: '5' }]
  },
  {
    title: 'Merge Intervals',
    difficulty: 'Medium',
    tags: ['Sorting', 'Array', 'Intervals'],
    acceptanceRate: 46.5,
    visualizationType: 'Array',
    description: 'Given a collection of intervals, merge all overlapping intervals.',
    starterCode: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  
  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);
  
  const result = [intervals[0]];
  // Merge overlapping intervals
  // Your code here
}`,
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' }]
  },
  {
    title: 'Largest Number',
    difficulty: 'Medium',
    tags: ['Sorting', 'Array', 'String', 'Greedy'],
    acceptanceRate: 34.2,
    visualizationType: 'Array',
    description: 'Arrange a list of non-negative integers such that they form the largest possible number.',
    starterCode: `function largestNumber(nums) {
  // Custom comparator: compare a+b vs b+a
  const sorted = nums.map(String).sort((a, b) => {
    // Your code here
  });
  
  // Handle edge case of all zeros
  if (sorted[0] === '0') return '0';
  return sorted.join('');
}`,
    examples: [{ input: 'nums = [3,30,34,5,9]', expected: '"9534330"' }]
  },
  {
    title: 'Insertion Sort List',
    difficulty: 'Medium',
    tags: ['Sorting', 'Linked List'],
    acceptanceRate: 50.8,
    visualizationType: 'Array',
    description: 'Sort a linked list using the Insertion Sort algorithm.',
    starterCode: `function insertionSortList(head) {
  const dummy = { val: -Infinity, next: null };
  let curr = head;
  
  while (curr) {
    // Find insertion position in sorted part
    let prev = dummy;
    while (prev.next && prev.next.val < curr.val) {
      prev = prev.next;
    }
    // Insert curr after prev
    // Your code here
  }
  
  return dummy.next;
}`,
    examples: [{ input: 'head = [4,2,1,3]', expected: '[1,2,3,4]' }]
  },
  {
    title: 'H-Index',
    difficulty: 'Medium',
    tags: ['Sorting', 'Array', 'Counting Sort'],
    acceptanceRate: 38.1,
    visualizationType: 'Array',
    description: 'Calculate a researcher\'s H-index: the maximum h such that h papers have at least h citations each.',
    starterCode: `function hIndex(citations) {
  // Sort in descending order
  citations.sort((a, b) => b - a);
  
  // Find largest h where citations[h-1] >= h
  // Your code here
}`,
    examples: [{ input: 'citations = [3,0,6,1,5]', expected: '3' }]
  },
  {
    title: 'Custom Sort String',
    difficulty: 'Medium',
    tags: ['Sorting', 'String', 'Hash Table'],
    acceptanceRate: 69.4,
    visualizationType: 'Array',
    description: 'Sort characters of string s based on the order defined in string order.',
    starterCode: `function customSortString(order, s) {
  // Create priority map from order string
  const priority = {};
  for (let i = 0; i < order.length; i++) {
    priority[order[i]] = i;
  }
  
  // Sort s based on priority
  // Your code here
}`,
    examples: [{ input: 'order = "cba", s = "abcd"', expected: '"cbad"' }]
  },
  {
    title: 'Find All Duplicates in Array',
    difficulty: 'Medium',
    tags: ['Sorting', 'Array', 'Hash Table', 'Cyclic Sort'],
    acceptanceRate: 73.2,
    visualizationType: 'Array',
    description: 'Find all elements that appear twice in an array where 1 ≤ a[i] ≤ n. Use O(1) extra space.',
    starterCode: `function findDuplicates(nums) {
  // Use array indices as hash
  // Mark visited by negating value at index
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    // Your code here
  }
  
  return result;
}`,
    examples: [{ input: 'nums = [4,3,2,7,8,2,3,1]', expected: '[2,3]' }]
  },

  // ===== 3. Hash Tables (10 problems) =====
  {
    title: 'Design HashMap',
    difficulty: 'Easy',
    tags: ['Hash Table', 'Design', 'Array'],
    acceptanceRate: 64.8,
    visualizationType: 'HashMap',
    description: 'Build a HashMap from scratch without using built-in hash table libraries. Implement put, get, and remove.',
    starterCode: `class MyHashMap {
  constructor() {
    this.size = 1000;
    this.buckets = new Array(this.size).fill(null).map(() => []);
  }
  
  _hash(key) {
    return key % this.size;
  }
  
  put(key, value) {
    // Your code here
  }
  
  get(key) {
    // Your code here - return -1 if not found
  }
  
  remove(key) {
    // Your code here
  }
}`,
    examples: [{ input: 'put(1,1), put(2,2), get(1), get(3), remove(2)', expected: '1, -1' }]
  },
  {
    title: 'Intersection of Two Arrays',
    difficulty: 'Easy',
    tags: ['Hash Table', 'Array', 'Two Pointers', 'Sorting'],
    acceptanceRate: 70.5,
    visualizationType: 'Array',
    description: 'Find the common elements between two arrays. Each element in the result must be unique.',
    starterCode: `function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();
  
  // Your code here
  
  return [...result];
}`,
    examples: [{ input: 'nums1 = [1,2,2,1], nums2 = [2,2]', expected: '[2]' }]
  },
  {
    title: 'Group Anagrams',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sorting'],
    acceptanceRate: 66.7,
    visualizationType: 'HashMap',
    description: 'Group strings that are anagrams of each other. Use sorted string or character count as key.',
    starterCode: `function groupAnagrams(strs) {
  const map = new Map();
  
  for (const str of strs) {
    // Create key (sorted string or char count)
    const key = str.split('').sort().join('');
    // Your code here
  }
  
  return [...map.values()];
}`,
    examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }]
  },
  {
    title: 'Isomorphic Strings',
    difficulty: 'Easy',
    tags: ['Hash Table', 'String'],
    acceptanceRate: 42.5,
    visualizationType: 'HashMap',
    description: 'Determine if two strings can be mapped character-for-character (bijective mapping).',
    starterCode: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  
  const mapST = new Map();
  const mapTS = new Map();
  
  for (let i = 0; i < s.length; i++) {
    // Check both directions of mapping
    // Your code here
  }
  
  return true;
}`,
    examples: [{ input: 's = "egg", t = "add"', expected: 'true' }, { input: 's = "foo", t = "bar"', expected: 'false' }]
  },
  {
    title: 'Happy Number',
    difficulty: 'Easy',
    tags: ['Hash Table', 'Math', 'Two Pointers'],
    acceptanceRate: 54.8,
    visualizationType: 'HashMap',
    description: 'Determine if a number is "happy". A happy number eventually reaches 1 through sum of squares of digits.',
    starterCode: `function isHappy(n) {
  const seen = new Set();
  
  function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }
  
  // Detect cycle using hash set
  // Your code here
}`,
    examples: [{ input: 'n = 19', expected: 'true' }]
  },
  {
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Array', 'Prefix Sum'],
    acceptanceRate: 43.5,
    visualizationType: 'Array',
    description: 'Find the total number of continuous subarrays whose sum equals k.',
    starterCode: `function subarraySum(nums, k) {
  // Use prefix sum with hash map
  // If prefixSum[j] - prefixSum[i] = k, subarray [i+1, j] sums to k
  const prefixCount = new Map([[0, 1]]);
  let sum = 0, count = 0;
  
  for (const num of nums) {
    sum += num;
    // Check if (sum - k) exists in map
    // Your code here
  }
  
  return count;
}`,
    examples: [{ input: 'nums = [1,1,1], k = 2', expected: '2' }]
  },
  {
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Array', 'Heap', 'Sorting', 'Bucket Sort'],
    acceptanceRate: 64.2,
    visualizationType: 'HashMap',
    description: 'Return the k most frequent elements in an array. Use bucket sort for O(n) solution.',
    starterCode: `function topKFrequent(nums, k) {
  // Count frequencies
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  
  // Bucket sort by frequency
  const buckets = new Array(nums.length + 1).fill(null).map(() => []);
  // Your code here
}`,
    examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1,2]' }]
  },
  {
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Array', 'Union Find'],
    acceptanceRate: 48.7,
    visualizationType: 'Array',
    description: 'Find the length of the longest consecutive elements sequence in O(n) time.',
    starterCode: `function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLength = 0;
  
  for (const num of numSet) {
    // Only start counting if num-1 doesn't exist (start of sequence)
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let length = 1;
      // Your code here
    }
  }
  
  return maxLength;
}`,
    examples: [{ input: 'nums = [100,4,200,1,3,2]', expected: '4' }]
  },
  {
    title: 'Brick Wall',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Array'],
    acceptanceRate: 54.1,
    visualizationType: 'HashMap',
    description: 'Find the vertical line that crosses the fewest bricks in a wall.',
    starterCode: `function leastBricks(wall) {
  // Count edge positions (not including wall edges)
  const edgeCount = new Map();
  
  for (const row of wall) {
    let position = 0;
    for (let i = 0; i < row.length - 1; i++) {
      position += row[i];
      // Your code here
    }
  }
  
  // Answer = total rows - max edges at any position
  const maxEdges = Math.max(0, ...edgeCount.values());
  return wall.length - maxEdges;
}`,
    examples: [{ input: 'wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]', expected: '2' }]
  },
  {
    title: 'Insert Delete GetRandom O(1)',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Array', 'Design', 'Randomized'],
    acceptanceRate: 52.4,
    visualizationType: 'HashMap',
    description: 'Design a data structure that supports insert, remove, and getRandom in average O(1) time.',
    starterCode: `class RandomizedSet {
  constructor() {
    this.map = new Map(); // val -> index
    this.list = [];
  }
  
  insert(val) {
    if (this.map.has(val)) return false;
    // Your code here
    return true;
  }
  
  remove(val) {
    if (!this.map.has(val)) return false;
    // Swap with last element, then pop
    // Your code here
    return true;
  }
  
  getRandom() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    return this.list[randomIndex];
  }
}`,
    examples: [{ input: 'insert(1), remove(2), insert(2), getRandom()', expected: 'true, false, true, 1 or 2' }]
  },

  // ===== 4. Recursion & Backtracking (10 problems) =====
  {
    title: 'Permutations',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'Array'],
    acceptanceRate: 74.8,
    visualizationType: 'Tree',
    description: 'Given an array of distinct integers, return all possible permutations.',
    starterCode: `function permute(nums) {
  const result = [];
  
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }
    
    for (let i = 0; i < remaining.length; i++) {
      // Choose, explore, unchoose
      // Your code here
    }
  }
  
  backtrack([], nums);
  return result;
}`,
    examples: [{ input: 'nums = [1,2,3]', expected: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' }]
  },
  {
    title: 'Subsets',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'Array', 'Bit Manipulation'],
    acceptanceRate: 74.5,
    visualizationType: 'Tree',
    description: 'Return all possible subsets (the power set) of a set of integers.',
    starterCode: `function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);
    
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}`,
    examples: [{ input: 'nums = [1,2,3]', expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }]
  },
  {
    title: 'Combination Sum',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'Array'],
    acceptanceRate: 67.5,
    visualizationType: 'Tree',
    description: 'Find all unique combinations of candidates that sum to target. Numbers can be used unlimited times.',
    starterCode: `function combinationSum(candidates, target) {
  const result = [];
  
  function backtrack(start, current, remaining) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    if (remaining < 0) return;
    
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      // Can reuse same element, so pass i (not i+1)
      backtrack(i, current, remaining - candidates[i]);
      current.pop();
    }
  }
  
  backtrack(0, [], target);
  return result;
}`,
    examples: [{ input: 'candidates = [2,3,6,7], target = 7', expected: '[[2,2,3],[7]]' }]
  },
  {
    title: 'Word Search',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'Array', 'Matrix'],
    acceptanceRate: 40.5,
    visualizationType: 'Graph',
    description: 'Determine if a word exists in a 2D grid of characters. Path cannot reuse cells.',
    starterCode: `function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  
  function backtrack(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[index]) return false;
    
    // Mark as visited
    const temp = board[r][c];
    board[r][c] = '#';
    
    // Explore 4 directions
    const found = backtrack(r+1, c, index+1) ||
                  backtrack(r-1, c, index+1) ||
                  backtrack(r, c+1, index+1) ||
                  backtrack(r, c-1, index+1);
    
    // Restore
    board[r][c] = temp;
    return found;
  }
  
  // Try starting from each cell
  // Your code here
}`,
    examples: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expected: 'true' }]
  },
  {
    title: 'N-Queens',
    difficulty: 'Hard',
    tags: ['Backtracking', 'Recursion', 'Array'],
    acceptanceRate: 62.8,
    visualizationType: 'Graph',
    description: 'Place N queens on an N×N chessboard such that no two queens attack each other.',
    starterCode: `function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  function isValid(row, col) {
    // Check column, diagonals
    // Your code here
  }
  
  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return result;
}`,
    examples: [{ input: 'n = 4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' }]
  },
  {
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'String'],
    acceptanceRate: 72.5,
    visualizationType: 'Tree',
    description: 'Generate all combinations of n pairs of well-formed parentheses.',
    starterCode: `function generateParenthesis(n) {
  const result = [];
  
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    // Can add '(' if open < n
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    // Can add ')' if close < open
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }
  
  backtrack('', 0, 0);
  return result;
}`,
    examples: [{ input: 'n = 3', expected: '["((()))","(()())","(())()","()(())","()()()"]' }]
  },
  {
    title: 'Sudoku Solver',
    difficulty: 'Hard',
    tags: ['Backtracking', 'Recursion', 'Array', 'Matrix'],
    acceptanceRate: 56.4,
    visualizationType: 'Graph',
    description: 'Write a program to solve a Sudoku puzzle by filling empty cells.',
    starterCode: `function solveSudoku(board) {
  function isValid(row, col, num) {
    // Check row, column, and 3x3 box
    // Your code here
  }
  
  function solve() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          for (let num = 1; num <= 9; num++) {
            if (isValid(r, c, String(num))) {
              board[r][c] = String(num);
              if (solve()) return true;
              board[r][c] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  solve();
}`,
    examples: [{ input: 'board = [["5","3",".",".","7",".",".",".","."],...]', expected: 'Solved board' }]
  },
  {
    title: 'Palindrome Partitioning',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'String', 'DP'],
    acceptanceRate: 62.3,
    visualizationType: 'Tree',
    description: 'Partition a string such that every substring is a palindrome. Return all possible partitions.',
    starterCode: `function partition(s) {
  const result = [];
  
  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left++] !== str[right--]) return false;
    }
    return true;
  }
  
  function backtrack(start, current) {
    if (start === s.length) {
      result.push([...current]);
      return;
    }
    
    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        current.push(s.slice(start, end + 1));
        backtrack(end + 1, current);
        current.pop();
      }
    }
  }
  
  backtrack(0, []);
  return result;
}`,
    examples: [{ input: 's = "aab"', expected: '[["a","a","b"],["aa","b"]]' }]
  },
  {
    title: 'Letter Combinations of Phone Number',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'String', 'Hash Table'],
    acceptanceRate: 56.5,
    visualizationType: 'Tree',
    description: 'Return all possible letter combinations that a phone number could represent.',
    starterCode: `function letterCombinations(digits) {
  if (!digits) return [];
  
  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  
  const result = [];
  
  function backtrack(index, current) {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    
    const letters = phone[digits[index]];
    for (const letter of letters) {
      backtrack(index + 1, current + letter);
    }
  }
  
  backtrack(0, '');
  return result;
}`,
    examples: [{ input: 'digits = "23"', expected: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }]
  },
  {
    title: 'Restore IP Addresses',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Recursion', 'String'],
    acceptanceRate: 43.8,
    visualizationType: 'Tree',
    description: 'Generate all possible valid IP addresses from a string of digits.',
    starterCode: `function restoreIpAddresses(s) {
  const result = [];
  
  function isValid(segment) {
    if (segment.length > 3) return false;
    if (segment.length > 1 && segment[0] === '0') return false;
    return parseInt(segment) <= 255;
  }
  
  function backtrack(start, parts) {
    if (parts.length === 4) {
      if (start === s.length) {
        result.push(parts.join('.'));
      }
      return;
    }
    
    for (let len = 1; len <= 3; len++) {
      if (start + len > s.length) break;
      const segment = s.slice(start, start + len);
      if (isValid(segment)) {
        parts.push(segment);
        backtrack(start + len, parts);
        parts.pop();
      }
    }
  }
  
  backtrack(0, []);
  return result;
}`,
    examples: [{ input: 's = "25525511135"', expected: '["255.255.11.135","255.255.111.35"]' }]
  },

  // ===== 5. Tree Data Structures (10 problems) =====
  {
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'BFS', 'Recursion'],
    acceptanceRate: 73.9,
    visualizationType: 'Tree',
    description: 'Find the number of nodes along the longest path from root to the farthest leaf node.',
    starterCode: `function maxDepth(root) {
  if (!root) return 0;
  
  // Recursive: 1 + max(left depth, right depth)
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', expected: '3' }]
  },
  {
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'BFS', 'Recursion'],
    acceptanceRate: 72.3,
    visualizationType: 'Tree',
    description: 'Swap the left and right children of every node in the tree.',
    starterCode: `function invertTree(root) {
  if (!root) return null;
  
  // Swap children
  [root.left, root.right] = [root.right, root.left];
  
  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);
  
  return root;
}`,
    examples: [{ input: 'root = [4,2,7,1,3,6,9]', expected: '[4,7,2,9,6,3,1]' }]
  },
  {
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'Stack', 'Recursion'],
    acceptanceRate: 73.5,
    visualizationType: 'Tree',
    description: 'Implement both recursive and iterative in-order traversal (Left, Root, Right).',
    starterCode: `// Recursive
function inorderRecursive(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

// Iterative with stack
function inorderIterative(root) {
  const result = [], stack = [];
  let current = root;
  
  while (current || stack.length) {
    // Go left as far as possible
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // Your code here
  }
  
  return result;
}`,
    examples: [{ input: 'root = [1,null,2,3]', expected: '[1,3,2]' }]
  },
  {
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    tags: ['Tree', 'BFS', 'Queue'],
    acceptanceRate: 63.2,
    visualizationType: 'Tree',
    description: 'Process nodes level-by-level using a queue (BFS). Return values grouped by level.',
    starterCode: `function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}`,
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' }]
  },
  {
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS', 'BST', 'Recursion'],
    acceptanceRate: 31.8,
    visualizationType: 'Tree',
    description: 'Check if a tree follows the BST property: left < root < right for all nodes.',
    starterCode: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}`,
    examples: [{ input: 'root = [2,1,3]', expected: 'true' }, { input: 'root = [5,1,4,null,null,3,6]', expected: 'false' }]
  },
  {
    title: 'Lowest Common Ancestor of BST',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS', 'BST', 'Recursion'],
    acceptanceRate: 60.5,
    visualizationType: 'Tree',
    description: 'Find the lowest node that is an ancestor to two given nodes in a BST.',
    starterCode: `function lowestCommonAncestor(root, p, q) {
  // In BST, if both p and q are smaller, go left
  // If both are larger, go right
  // Otherwise, current node is LCA
  
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  
  return null;
}`,
    examples: [{ input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', expected: '6' }]
  },
  {
    title: 'Balanced Binary Tree',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'Recursion'],
    acceptanceRate: 48.5,
    visualizationType: 'Tree',
    description: 'Determine if a tree is height-balanced (depth of subtrees differs by at most 1).',
    starterCode: `function isBalanced(root) {
  function getHeight(node) {
    if (!node) return 0;
    
    const leftHeight = getHeight(node.left);
    if (leftHeight === -1) return -1;
    
    const rightHeight = getHeight(node.right);
    if (rightHeight === -1) return -1;
    
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    
    return 1 + Math.max(leftHeight, rightHeight);
  }
  
  return getHeight(root) !== -1;
}`,
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', expected: 'true' }]
  },
  {
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'Recursion'],
    acceptanceRate: 56.3,
    visualizationType: 'Tree',
    description: 'Find the length of the longest path between any two nodes (may not pass through root).',
    starterCode: `function diameterOfBinaryTree(root) {
  let diameter = 0;
  
  function depth(node) {
    if (!node) return 0;
    
    const leftDepth = depth(node.left);
    const rightDepth = depth(node.right);
    
    // Update diameter (path through this node)
    diameter = Math.max(diameter, leftDepth + rightDepth);
    
    // Return depth of this subtree
    return 1 + Math.max(leftDepth, rightDepth);
  }
  
  depth(root);
  return diameter;
}`,
    examples: [{ input: 'root = [1,2,3,4,5]', expected: '3' }]
  },
  {
    title: 'Binary Tree Zigzag Level Order',
    difficulty: 'Medium',
    tags: ['Tree', 'BFS', 'Queue'],
    acceptanceRate: 55.8,
    visualizationType: 'Tree',
    description: 'Traverse the tree in a "zigzag" fashion: left-to-right, then right-to-left, alternating.',
    starterCode: `function zigzagLevelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  let leftToRight = true;
  
  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      
      // Add to level based on direction
      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
    leftToRight = !leftToRight;
  }
  
  return result;
}`,
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[20,9],[15,7]]' }]
  },
  {
    title: 'Construct Binary Tree from Preorder and Inorder',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS', 'Recursion', 'Hash Table'],
    acceptanceRate: 61.5,
    visualizationType: 'Tree',
    description: 'Rebuild a binary tree using its Pre-order and In-order traversal results.',
    starterCode: `function buildTree(preorder, inorder) {
  // Preorder: [root, ...left, ...right]
  // Inorder: [...left, root, ...right]
  
  const inorderMap = new Map();
  inorder.forEach((val, idx) => inorderMap.set(val, idx));
  
  let preIndex = 0;
  
  function build(left, right) {
    if (left > right) return null;
    
    const rootVal = preorder[preIndex++];
    const root = { val: rootVal, left: null, right: null };
    
    const inorderIndex = inorderMap.get(rootVal);
    
    // Build left subtree first (preorder visits left before right)
    root.left = build(left, inorderIndex - 1);
    root.right = build(inorderIndex + 1, right);
    
    return root;
  }
  
  return build(0, inorder.length - 1);
}`,
    examples: [{ input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', expected: '[3,9,20,null,null,15,7]' }]
  }
];

// ========================================
// PHASE 3: ADVANCED - Optimized Problem Solving
// ========================================

export const phase3Problems = [
  // ===== 1. Graph Algorithms (10 problems) =====
  {
    title: 'Number of Islands',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS', 'BFS', 'Matrix'],
    acceptanceRate: 56.2,
    visualizationType: 'Graph',
    description: 'Count connected components in a 2D grid using BFS/DFS. Each island is a group of connected 1s.',
    starterCode: `function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // Mark visited
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
    examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', expected: '2' }]
  },
  {
    title: 'Course Schedule',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS', 'BFS', 'Topological Sort'],
    acceptanceRate: 45.8,
    visualizationType: 'Graph',
    description: 'Use Topological Sort to determine if all courses can be finished given prerequisites.',
    starterCode: `function canFinish(numCourses, prerequisites) {
  const graph = new Map();
  const inDegree = new Array(numCourses).fill(0);
  
  for (const [course, prereq] of prerequisites) {
    if (!graph.has(prereq)) graph.set(prereq, []);
    graph.get(prereq).push(course);
    inDegree[course]++;
  }
  
  // BFS with nodes having inDegree 0
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  // Your code here
}`,
    examples: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', expected: 'true' }]
  },

  {
    title: "Dijkstra's Shortest Path",
    difficulty: 'Medium',
    tags: ['Graph', 'Shortest Path', 'Heap', 'Priority Queue'],
    acceptanceRate: 42.3,
    visualizationType: 'Graph',
    description: 'Find the shortest path from a source to all other nodes in a weighted graph using Dijkstra\'s algorithm.',
    starterCode: `function dijkstra(graph, start) {
  const dist = new Array(graph.length).fill(Infinity);
  dist[start] = 0;
  const pq = [[0, start]]; // [distance, node]
  
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    
    for (const [v, weight] of graph[u]) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,
    examples: [{ input: 'graph with 5 nodes, start = 0', expected: 'shortest distances array' }]
  },
  {
    title: 'Network Delay Time',
    difficulty: 'Medium',
    tags: ['Graph', 'Shortest Path', 'DFS', 'BFS', 'Heap'],
    acceptanceRate: 51.4,
    visualizationType: 'Graph',
    description: 'Calculate the time for all nodes to receive a signal using Dijkstra\'s algorithm.',
    starterCode: `function networkDelayTime(times, n, k) {
  const graph = new Map();
  for (const [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push([v, w]);
  }
  
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq = [[0, k]];
  // Your code here - return max distance or -1 if unreachable
}`,
    examples: [{ input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', expected: '2' }]
  },

  {
    title: 'Word Ladder',
    difficulty: 'Hard',
    tags: ['Graph', 'BFS', 'String', 'Hash Table'],
    acceptanceRate: 36.5,
    visualizationType: 'Graph',
    description: 'Find the shortest transformation sequence from beginWord to endWord using BFS.',
    starterCode: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  
  while (queue.length) {
    const [word, level] = queue.shift();
    if (word === endWord) return level;
    
    // Try changing each character
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        // Your code here
      }
    }
  }
  return 0;
}`,
    examples: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expected: '5' }]
  },
  {
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS', 'BFS', 'Matrix'],
    acceptanceRate: 53.8,
    visualizationType: 'Graph',
    description: 'Find grid cells that can flow to both Pacific and Atlantic oceans using DFS/BFS.',
    starterCode: `function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const pacific = new Set(), atlantic = new Set();
  
  function dfs(r, c, visited, prevHeight) {
    const key = r + ',' + c;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (visited.has(key) || heights[r][c] < prevHeight) return;
    visited.add(key);
    dfs(r+1, c, visited, heights[r][c]);
    dfs(r-1, c, visited, heights[r][c]);
    dfs(r, c+1, visited, heights[r][c]);
    dfs(r, c-1, visited, heights[r][c]);
  }
  // Start DFS from ocean borders
  // Your code here
}`,
    examples: [{ input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', expected: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' }]
  },

  {
    title: 'Is Graph Bipartite?',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS', 'BFS'],
    acceptanceRate: 52.6,
    visualizationType: 'Graph',
    description: 'Check if a graph can be colored with two colors such that no adjacent nodes share the same color.',
    starterCode: `function isBipartite(graph) {
  const n = graph.length;
  const colors = new Array(n).fill(0); // 0: uncolored, 1: color A, -1: color B
  
  function bfs(start) {
    const queue = [start];
    colors[start] = 1;
    while (queue.length) {
      const node = queue.shift();
      for (const neighbor of graph[node]) {
        if (colors[neighbor] === colors[node]) return false;
        if (colors[neighbor] === 0) {
          colors[neighbor] = -colors[node];
          queue.push(neighbor);
        }
      }
    }
    return true;
  }
  
  for (let i = 0; i < n; i++) {
    if (colors[i] === 0 && !bfs(i)) return false;
  }
  return true;
}`,
    examples: [{ input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', expected: 'true' }]
  },
  {
    title: "Minimum Spanning Tree (Prim's)",
    difficulty: 'Medium',
    tags: ['Graph', 'Heap', 'Priority Queue'],
    acceptanceRate: 48.2,
    visualizationType: 'Graph',
    description: 'Connect all nodes with the minimum total edge weight using Prim\'s algorithm.',
    starterCode: `function minCostConnectPoints(points) {
  const n = points.length;
  const visited = new Set();
  const pq = [[0, 0]]; // [cost, point index]
  let totalCost = 0;
  
  while (visited.size < n) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, u] = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u);
    totalCost += cost;
    
    for (let v = 0; v < n; v++) {
      if (!visited.has(v)) {
        const dist = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
        pq.push([dist, v]);
      }
    }
  }
  return totalCost;
}`,
    examples: [{ input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]', expected: '20' }]
  },

  {
    title: 'Bellman-Ford Algorithm',
    difficulty: 'Medium',
    tags: ['Graph', 'Shortest Path', 'DP'],
    acceptanceRate: 44.7,
    visualizationType: 'Graph',
    description: 'Find shortest paths in a graph with negative edge weights. Detect negative cycles.',
    starterCode: `function bellmanFord(n, edges, src) {
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  
  // Relax all edges n-1 times
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  
  // Check for negative cycles
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return null; // Negative cycle detected
    }
  }
  return dist;
}`,
    examples: [{ input: 'n = 5, edges with weights, src = 0', expected: 'shortest distances array' }]
  },
  {
    title: 'Bridges in a Graph',
    difficulty: 'Hard',
    tags: ['Graph', 'DFS'],
    acceptanceRate: 54.3,
    visualizationType: 'Graph',
    description: 'Find edges whose removal increases the number of connected components (critical connections).',
    starterCode: `function criticalConnections(n, connections) {
  const graph = new Map();
  for (let i = 0; i < n; i++) graph.set(i, []);
  for (const [u, v] of connections) {
    graph.get(u).push(v);
    graph.get(v).push(u);
  }
  
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const bridges = [];
  let time = 0;
  
  function dfs(node, parent) {
    disc[node] = low[node] = time++;
    for (const neighbor of graph.get(node)) {
      if (neighbor === parent) continue;
      if (disc[neighbor] === -1) {
        dfs(neighbor, node);
        low[node] = Math.min(low[node], low[neighbor]);
        if (low[neighbor] > disc[node]) bridges.push([node, neighbor]);
      } else {
        low[node] = Math.min(low[node], disc[neighbor]);
      }
    }
  }
  
  dfs(0, -1);
  return bridges;
}`,
    examples: [{ input: 'n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]', expected: '[[1,3]]' }]
  },

  // ===== 2. Dynamic Programming (10 problems) =====

  {
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    tags: ['DP', 'Dynamic Programming', 'Math'],
    acceptanceRate: 51.8,
    visualizationType: 'DP',
    description: 'Find the number of distinct ways to climb n stairs, taking 1 or 2 steps at a time.',
    starterCode: `function climbStairs(n) {
  if (n <= 2) return n;
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
    examples: [{ input: 'n = 5', expected: '8' }]
  },
  {
    title: 'Coin Change',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'Array', 'BFS'],
    acceptanceRate: 42.1,
    visualizationType: 'DP',
    description: 'Find the fewest number of coins needed to make up a given amount.',
    starterCode: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    examples: [{ input: 'coins = [1,2,5], amount = 11', expected: '3' }]
  },

  {
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'String'],
    acceptanceRate: 58.4,
    visualizationType: 'DP',
    description: 'Find the length of the longest subsequence common to two strings.',
    starterCode: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}`,
    examples: [{ input: 'text1 = "abcde", text2 = "ace"', expected: '3' }]
  },
  {
    title: '0/1 Knapsack Problem',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'Array'],
    acceptanceRate: 46.5,
    visualizationType: 'DP',
    description: 'Maximize value within a weight limit without repeating items.',
    starterCode: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          dp[i-1][w],
          dp[i-1][w - weights[i-1]] + values[i-1]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
    examples: [{ input: 'weights = [1,2,3], values = [6,10,12], capacity = 5', expected: '22' }]
  },

  {
    title: 'House Robber',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'Array'],
    acceptanceRate: 48.7,
    visualizationType: 'DP',
    description: 'Find the maximum money you can rob without robbing adjacent houses.',
    starterCode: `function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    examples: [{ input: 'nums = [2,7,9,3,1]', expected: '12' }]
  },
  {
    title: 'Word Break',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'String', 'Hash Table', 'Trie'],
    acceptanceRate: 45.3,
    visualizationType: 'DP',
    description: 'Determine if a string can be segmented into space-separated dictionary words.',
    starterCode: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
    examples: [{ input: 's = "leetcode", wordDict = ["leet","code"]', expected: 'true' }]
  },

  {
    title: 'Edit Distance',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'String'],
    acceptanceRate: 53.8,
    visualizationType: 'DP',
    description: 'Calculate the minimum operations (insert, delete, replace) to convert one string to another.',
    starterCode: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i-1] === word2[j-1]) {
        dp[i][j] = dp[i-1][j-1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
  }
  return dp[m][n];
}`,
    examples: [{ input: 'word1 = "horse", word2 = "ros"', expected: '3' }]
  },
  {
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'Array', 'Binary Search'],
    acceptanceRate: 52.1,
    visualizationType: 'DP',
    description: 'Find the length of the longest strictly increasing subsequence.',
    starterCode: `function lengthOfLIS(nums) {
  // O(n log n) solution using binary search
  const tails = [];
  
  for (const num of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    if (left === tails.length) tails.push(num);
    else tails[left] = num;
  }
  return tails.length;
}`,
    examples: [{ input: 'nums = [10,9,2,5,3,7,101,18]', expected: '4' }]
  },

  {
    title: 'Unique Paths',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'Math', 'Matrix'],
    acceptanceRate: 62.4,
    visualizationType: 'DP',
    description: 'Find the total number of unique paths from top-left to bottom-right in a grid.',
    starterCode: `function uniquePaths(m, n) {
  const dp = Array(m).fill(null).map(() => Array(n).fill(1));
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }
  return dp[m-1][n-1];
}`,
    examples: [{ input: 'm = 3, n = 7', expected: '28' }]
  },
  {
    title: 'Partition Equal Subset Sum',
    difficulty: 'Medium',
    tags: ['DP', 'Dynamic Programming', 'Array'],
    acceptanceRate: 46.8,
    visualizationType: 'DP',
    description: 'Determine if an array can be partitioned into two subsets with equal sum.',
    starterCode: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}`,
    examples: [{ input: 'nums = [1,5,11,5]', expected: 'true' }]
  },

  // ===== 3. Heaps & Priority Queues (10 problems) =====

  {
    title: 'Kth Largest Element in Array',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Array', 'Sorting'],
    acceptanceRate: 65.8,
    visualizationType: 'Heap',
    description: 'Find the kth largest element using a Min-Heap of size k.',
    starterCode: `function findKthLargest(nums, k) {
  // Use a min-heap of size k
  const minHeap = [];
  
  function heapPush(val) {
    minHeap.push(val);
    let i = minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (minHeap[parent] <= minHeap[i]) break;
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  }
  
  function heapPop() {
    const min = minHeap[0];
    minHeap[0] = minHeap.pop();
    // Heapify down - your code here
    return min;
  }
  
  for (const num of nums) {
    heapPush(num);
    if (minHeap.length > k) heapPop();
  }
  return minHeap[0];
}`,
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', expected: '5' }]
  },
  {
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    tags: ['Heap', 'Priority Queue', 'Linked List', 'Divide and Conquer'],
    acceptanceRate: 49.8,
    visualizationType: 'Heap',
    description: 'Combine k sorted linked lists into one sorted list using a Priority Queue.',
    starterCode: `function mergeKLists(lists) {
  // Use min-heap to always get smallest element
  const pq = [];
  
  // Add first node from each list
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) pq.push([lists[i].val, i, lists[i]]);
  }
  
  const dummy = { next: null };
  let curr = dummy;
  
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [val, idx, node] = pq.shift();
    curr.next = node;
    curr = curr.next;
    if (node.next) pq.push([node.next.val, idx, node.next]);
  }
  return dummy.next;
}`,
    examples: [{ input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' }]
  },

  {
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    tags: ['Heap', 'Priority Queue', 'Design', 'Two Pointers'],
    acceptanceRate: 51.2,
    visualizationType: 'Heap',
    description: 'Use Two Heaps (max-heap for lower half, min-heap for upper half) to find median in real-time.',
    starterCode: `class MedianFinder {
  constructor() {
    this.maxHeap = []; // Lower half (store negatives for max behavior)
    this.minHeap = []; // Upper half
  }
  
  addNum(num) {
    // Add to maxHeap first, then balance
    this.maxHeap.push(-num);
    this.maxHeap.sort((a, b) => a - b);
    
    // Move largest from maxHeap to minHeap
    this.minHeap.push(-this.maxHeap.shift());
    this.minHeap.sort((a, b) => a - b);
    
    // Balance sizes
    if (this.minHeap.length > this.maxHeap.length) {
      this.maxHeap.push(-this.minHeap.shift());
      this.maxHeap.sort((a, b) => a - b);
    }
  }
  
  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return -this.maxHeap[0];
    }
    return (-this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}`,
    examples: [{ input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()', expected: '1.5, 2.0' }]
  },
  {
    title: 'Task Scheduler',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Array', 'Greedy'],
    acceptanceRate: 57.4,
    visualizationType: 'Array',
    description: 'Find the minimum time to finish all tasks with a cooling period between same tasks.',
    starterCode: `function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }
  
  freq.sort((a, b) => b - a);
  const maxFreq = freq[0];
  let idleSlots = (maxFreq - 1) * n;
  
  for (let i = 1; i < 26 && freq[i] > 0; i++) {
    idleSlots -= Math.min(freq[i], maxFreq - 1);
  }
  
  return tasks.length + Math.max(0, idleSlots);
}`,
    examples: [{ input: 'tasks = ["A","A","A","B","B","B"], n = 2', expected: '8' }]
  },

  {
    title: 'Top K Frequent Words',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Hash Table', 'String', 'Sorting'],
    acceptanceRate: 56.8,
    visualizationType: 'Heap',
    description: 'Return the k most frequent words sorted by frequency and alphabetically.',
    starterCode: `function topKFrequent(words, k) {
  const freq = new Map();
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }
  
  const sorted = [...freq.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
  
  return sorted.slice(0, k).map(([word]) => word);
}`,
    examples: [{ input: 'words = ["i","love","leetcode","i","love","coding"], k = 2', expected: '["i","love"]' }]
  },
  {
    title: 'K Closest Points to Origin',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Array', 'Math', 'Sorting'],
    acceptanceRate: 65.4,
    visualizationType: 'Heap',
    description: 'Find the k points nearest to the origin (0, 0).',
    starterCode: `function kClosest(points, k) {
  // Use max-heap of size k
  const maxHeap = [];
  
  const dist = (p) => p[0] * p[0] + p[1] * p[1];
  
  for (const point of points) {
    const d = dist(point);
    if (maxHeap.length < k) {
      maxHeap.push([d, point]);
      maxHeap.sort((a, b) => b[0] - a[0]);
    } else if (d < maxHeap[0][0]) {
      maxHeap[0] = [d, point];
      maxHeap.sort((a, b) => b[0] - a[0]);
    }
  }
  
  return maxHeap.map(([_, point]) => point);
}`,
    examples: [{ input: 'points = [[1,3],[-2,2]], k = 1', expected: '[[-2,2]]' }]
  },

  {
    title: 'The Skyline Problem',
    difficulty: 'Hard',
    tags: ['Heap', 'Priority Queue', 'Array', 'Divide and Conquer'],
    acceptanceRate: 41.5,
    visualizationType: 'Array',
    description: 'Find the collective outline of buildings in a city skyline.',
    starterCode: `function getSkyline(buildings) {
  const events = [];
  for (const [left, right, height] of buildings) {
    events.push([left, -height, right]); // Start event
    events.push([right, 0, 0]); // End event
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  
  const result = [];
  const heights = [[0, Infinity]]; // [height, end]
  
  for (const [x, negH, end] of events) {
    while (heights[0][1] <= x) heights.shift();
    if (negH !== 0) {
      heights.push([-negH, end]);
      heights.sort((a, b) => b[0] - a[0]);
    }
    if (!result.length || result[result.length - 1][1] !== heights[0][0]) {
      result.push([x, heights[0][0]]);
    }
  }
  return result;
}`,
    examples: [{ input: 'buildings = [[2,9,10],[3,7,15],[5,12,12]]', expected: '[[2,10],[3,15],[7,12],[12,0]]' }]
  },
  {
    title: 'Rearrange String k Distance Apart',
    difficulty: 'Hard',
    tags: ['Heap', 'Priority Queue', 'Hash Table', 'String', 'Greedy'],
    acceptanceRate: 37.2,
    visualizationType: 'Array',
    description: 'Reorder a string so that same characters are at least k distance apart.',
    starterCode: `function rearrangeString(s, k) {
  if (k <= 1) return s;
  
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);
  
  const pq = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const result = [];
  const cooldown = [];
  
  while (pq.length || cooldown.length) {
    if (cooldown.length && cooldown[0][2] <= result.length) {
      const [char, count] = cooldown.shift();
      if (count > 0) pq.push([char, count]);
      pq.sort((a, b) => b[1] - a[1]);
    }
    
    if (!pq.length) return '';
    const [char, count] = pq.shift();
    result.push(char);
    if (count > 1) cooldown.push([char, count - 1, result.length + k - 1]);
  }
  return result.join('');
}`,
    examples: [{ input: 's = "aabbcc", k = 3', expected: '"abcabc"' }]
  },

  {
    title: 'Furthest Building You Can Reach',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Array', 'Greedy'],
    acceptanceRate: 48.6,
    visualizationType: 'Heap',
    description: 'Determine the furthest building you can reach using bricks and ladders optimally.',
    starterCode: `function furthestBuilding(heights, bricks, ladders) {
  const minHeap = []; // Track ladder uses
  
  for (let i = 0; i < heights.length - 1; i++) {
    const diff = heights[i + 1] - heights[i];
    if (diff <= 0) continue;
    
    minHeap.push(diff);
    minHeap.sort((a, b) => a - b);
    
    if (minHeap.length > ladders) {
      bricks -= minHeap.shift();
      if (bricks < 0) return i;
    }
  }
  return heights.length - 1;
}`,
    examples: [{ input: 'heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1', expected: '4' }]
  },
  {
    title: 'Minimum Cost to Connect Sticks',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Greedy'],
    acceptanceRate: 67.3,
    visualizationType: 'Heap',
    description: 'Use a Min-Heap to greedily combine sticks with the lowest cost.',
    starterCode: `function connectSticks(sticks) {
  if (sticks.length <= 1) return 0;
  
  const minHeap = [...sticks].sort((a, b) => a - b);
  let totalCost = 0;
  
  while (minHeap.length > 1) {
    const first = minHeap.shift();
    const second = minHeap.shift();
    const cost = first + second;
    totalCost += cost;
    
    // Insert back and maintain heap order
    let i = 0;
    while (i < minHeap.length && minHeap[i] < cost) i++;
    minHeap.splice(i, 0, cost);
  }
  return totalCost;
}`,
    examples: [{ input: 'sticks = [2,4,3]', expected: '14' }]
  },

  // ===== 4. Tries & Advanced Trees (10 problems) =====

  {
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    tags: ['Trie', 'Design', 'String', 'Hash Table'],
    acceptanceRate: 61.5,
    visualizationType: 'Tree',
    description: 'Build a Trie data structure supporting insert, search, and startsWith operations.',
    starterCode: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }
  
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEnd;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}`,
    examples: [{ input: 'insert("apple"), search("apple"), search("app"), startsWith("app")', expected: 'true, false, true' }]
  },
  {
    title: 'Word Search II',
    difficulty: 'Hard',
    tags: ['Trie', 'Backtracking', 'Array', 'Matrix', 'String'],
    acceptanceRate: 36.8,
    visualizationType: 'Graph',
    description: 'Search for a list of words in a 2D grid using a Trie and Backtracking.',
    starterCode: `function findWords(board, words) {
  const root = {};
  for (const word of words) {
    let node = root;
    for (const c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.word = word;
  }
  
  const result = [];
  const rows = board.length, cols = board[0].length;
  
  function dfs(r, c, node) {
    const char = board[r][c];
    if (!node[char]) return;
    node = node[char];
    if (node.word) {
      result.push(node.word);
      node.word = null; // Avoid duplicates
    }
    board[r][c] = '#';
    if (r > 0) dfs(r-1, c, node);
    if (r < rows-1) dfs(r+1, c, node);
    if (c > 0) dfs(r, c-1, node);
    if (c < cols-1) dfs(r, c+1, node);
    board[r][c] = char;
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }
  return result;
}`,
    examples: [{ input: 'board = [["o","a","a","n"],["e","t","a","e"]], words = ["oath","pea","eat","rain"]', expected: '["eat","oath"]' }]
  },

  {
    title: 'Range Sum Query - Mutable',
    difficulty: 'Medium',
    tags: ['Segment Tree', 'Array', 'Design'],
    acceptanceRate: 40.5,
    visualizationType: 'Tree',
    description: 'Use a Segment Tree or Fenwick Tree for efficient range sum queries with updates.',
    starterCode: `class NumArray {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(2 * this.n).fill(0);
    // Build tree
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = nums[i];
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[2*i] + this.tree[2*i + 1];
    }
  }
  
  update(index, val) {
    let i = index + this.n;
    this.tree[i] = val;
    while (i > 1) {
      i = Math.floor(i / 2);
      this.tree[i] = this.tree[2*i] + this.tree[2*i + 1];
    }
  }
  
  sumRange(left, right) {
    let sum = 0;
    left += this.n;
    right += this.n + 1;
    while (left < right) {
      if (left % 2 === 1) sum += this.tree[left++];
      if (right % 2 === 1) sum += this.tree[--right];
      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }
    return sum;
  }
}`,
    examples: [{ input: 'NumArray([1,3,5]), sumRange(0,2), update(1,2), sumRange(0,2)', expected: '9, 8' }]
  },
  {
    title: 'Longest Word in Dictionary',
    difficulty: 'Medium',
    tags: ['Trie', 'Array', 'Hash Table', 'String', 'Sorting'],
    acceptanceRate: 51.4,
    visualizationType: 'Tree',
    description: 'Find the longest word that can be built one character at a time from other words.',
    starterCode: `function longestWord(words) {
  words.sort();
  const built = new Set(['']);
  let result = '';
  
  for (const word of words) {
    const prefix = word.slice(0, -1);
    if (built.has(prefix)) {
      built.add(word);
      if (word.length > result.length) {
        result = word;
      }
    }
  }
  return result;
}`,
    examples: [{ input: 'words = ["w","wo","wor","worl","world"]', expected: '"world"' }]
  },

  {
    title: 'Maximum XOR of Two Numbers',
    difficulty: 'Medium',
    tags: ['Trie', 'Array', 'Hash Table', 'Bit Manipulation'],
    acceptanceRate: 54.2,
    visualizationType: 'Tree',
    description: 'Use a Trie to find the maximum XOR result of any two numbers in an array.',
    starterCode: `function findMaximumXOR(nums) {
  // Build trie of binary representations
  const root = {};
  
  function insert(num) {
    let node = root;
    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;
      if (!node[bit]) node[bit] = {};
      node = node[bit];
    }
  }
  
  function query(num) {
    let node = root, xor = 0;
    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;
      const toggle = 1 - bit;
      if (node[toggle]) {
        xor |= (1 << i);
        node = node[toggle];
      } else {
        node = node[bit];
      }
    }
    return xor;
  }
  
  let maxXor = 0;
  for (const num of nums) {
    insert(num);
    maxXor = Math.max(maxXor, query(num));
  }
  return maxXor;
}`,
    examples: [{ input: 'nums = [3,10,5,25,2,8]', expected: '28' }]
  },
  {
    title: 'Stream of Characters',
    difficulty: 'Hard',
    tags: ['Trie', 'Design', 'String', 'Array'],
    acceptanceRate: 51.8,
    visualizationType: 'Tree',
    description: 'Check if a suffix of the stream matches any word in a dictionary using reverse Trie.',
    starterCode: `class StreamChecker {
  constructor(words) {
    this.root = {};
    this.stream = [];
    
    // Build reverse trie
    for (const word of words) {
      let node = this.root;
      for (let i = word.length - 1; i >= 0; i--) {
        const c = word[i];
        if (!node[c]) node[c] = {};
        node = node[c];
      }
      node.isEnd = true;
    }
  }
  
  query(letter) {
    this.stream.push(letter);
    let node = this.root;
    
    for (let i = this.stream.length - 1; i >= 0; i--) {
      const c = this.stream[i];
      if (!node[c]) return false;
      node = node[c];
      if (node.isEnd) return true;
    }
    return false;
  }
}`,
    examples: [{ input: 'StreamChecker(["cd","f","kl"]), query("a"), query("b"), query("c"), query("d")', expected: 'false, false, false, true' }]
  },

  {
    title: 'Count of Range Sum',
    difficulty: 'Hard',
    tags: ['Segment Tree', 'Array', 'Binary Search', 'Divide and Conquer'],
    acceptanceRate: 36.4,
    visualizationType: 'Tree',
    description: 'Find the number of subarray sums that fall within a given range [lower, upper].',
    starterCode: `function countRangeSum(nums, lower, upper) {
  const prefix = [0];
  for (const num of nums) prefix.push(prefix[prefix.length - 1] + num);
  
  function mergeSort(arr, left, right) {
    if (left >= right) return 0;
    const mid = Math.floor((left + right) / 2);
    let count = mergeSort(arr, left, mid) + mergeSort(arr, mid + 1, right);
    
    // Count valid pairs
    let j = mid + 1, k = mid + 1;
    for (let i = left; i <= mid; i++) {
      while (j <= right && arr[j] - arr[i] < lower) j++;
      while (k <= right && arr[k] - arr[i] <= upper) k++;
      count += k - j;
    }
    
    // Merge
    const sorted = [];
    let p1 = left, p2 = mid + 1;
    while (p1 <= mid || p2 <= right) {
      if (p1 > mid) sorted.push(arr[p2++]);
      else if (p2 > right) sorted.push(arr[p1++]);
      else sorted.push(arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]);
    }
    for (let i = left; i <= right; i++) arr[i] = sorted[i - left];
    return count;
  }
  
  return mergeSort(prefix, 0, prefix.length - 1);
}`,
    examples: [{ input: 'nums = [-2,5,-1], lower = -2, upper = 2', expected: '3' }]
  },
  {
    title: 'Replace Words',
    difficulty: 'Medium',
    tags: ['Trie', 'Array', 'Hash Table', 'String'],
    acceptanceRate: 62.8,
    visualizationType: 'Tree',
    description: 'Replace words in a sentence with their shortest root from a dictionary using a Trie.',
    starterCode: `function replaceWords(dictionary, sentence) {
  const root = {};
  for (const word of dictionary) {
    let node = root;
    for (const c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.isEnd = true;
  }
  
  function findRoot(word) {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      if (!node[word[i]]) return word;
      node = node[word[i]];
      if (node.isEnd) return word.slice(0, i + 1);
    }
    return word;
  }
  
  return sentence.split(' ').map(findRoot).join(' ');
}`,
    examples: [{ input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"', expected: '"the cat was rat by the bat"' }]
  },

  {
    title: 'Map Sum Pairs',
    difficulty: 'Medium',
    tags: ['Trie', 'Design', 'Hash Table', 'String'],
    acceptanceRate: 56.7,
    visualizationType: 'Tree',
    description: 'Implement a map where you can query the sum of values for all keys with a given prefix.',
    starterCode: `class MapSum {
  constructor() {
    this.map = new Map();
    this.root = {};
  }
  
  insert(key, val) {
    const delta = val - (this.map.get(key) || 0);
    this.map.set(key, val);
    
    let node = this.root;
    for (const c of key) {
      if (!node[c]) node[c] = { sum: 0 };
      node = node[c];
      node.sum += delta;
    }
  }
  
  sum(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node[c]) return 0;
      node = node[c];
    }
    return node.sum;
  }
}`,
    examples: [{ input: 'insert("apple", 3), sum("ap"), insert("app", 2), sum("ap")', expected: '3, 5' }]
  },
  {
    title: 'Design Autocomplete System',
    difficulty: 'Hard',
    tags: ['Trie', 'Design', 'String', 'Heap'],
    acceptanceRate: 48.5,
    visualizationType: 'Tree',
    description: 'Design a system that returns the top 3 historical sentences based on prefix.',
    starterCode: `class AutocompleteSystem {
  constructor(sentences, times) {
    this.root = {};
    this.current = '';
    
    for (let i = 0; i < sentences.length; i++) {
      this.addSentence(sentences[i], times[i]);
    }
  }
  
  addSentence(sentence, count) {
    let node = this.root;
    for (const c of sentence) {
      if (!node[c]) node[c] = { sentences: new Map() };
      node = node[c];
      node.sentences.set(sentence, (node.sentences.get(sentence) || 0) + count);
    }
  }
  
  input(c) {
    if (c === '#') {
      this.addSentence(this.current, 1);
      this.current = '';
      return [];
    }
    
    this.current += c;
    let node = this.root;
    for (const char of this.current) {
      if (!node[char]) return [];
      node = node[char];
    }
    
    const results = [...node.sentences.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 3)
      .map(([s]) => s);
    return results;
  }
}`,
    examples: [{ input: 'AutocompleteSystem(["i love you","island"], [5,3]), input("i")', expected: '["i love you","island"]' }]
  },

  // ===== 5. Disjoint Set / Union-Find (10 problems) =====

  {
    title: 'Number of Connected Components',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Graph', 'DFS', 'BFS'],
    acceptanceRate: 62.4,
    visualizationType: 'Graph',
    description: 'Find how many separate connected components exist in an undirected graph.',
    starterCode: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }
  
  let components = n;
  for (const [u, v] of edges) {
    if (union(u, v)) components--;
  }
  return components;
}`,
    examples: [{ input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', expected: '2' }]
  },
  {
    title: 'Redundant Connection',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Graph', 'DFS', 'BFS'],
    acceptanceRate: 62.1,
    visualizationType: 'Graph',
    description: 'Find the edge that can be removed to turn a graph into a tree (no cycles).',
    starterCode: `function findRedundantConnection(edges) {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  for (const [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return [u, v]; // Cycle detected
    parent[pu] = pv;
  }
  return [];
}`,
    examples: [{ input: 'edges = [[1,2],[1,3],[2,3]]', expected: '[2,3]' }]
  },

  {
    title: 'Accounts Merge',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Array', 'Hash Table', 'String', 'DFS', 'BFS'],
    acceptanceRate: 56.3,
    visualizationType: 'Graph',
    description: 'Merge email accounts belonging to the same person using Union-Find.',
    starterCode: `function accountsMerge(accounts) {
  const parent = {};
  const emailToName = {};
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  function union(x, y) {
    parent[find(x)] = find(y);
  }
  
  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      if (!parent[email]) parent[email] = email;
      emailToName[email] = name;
      union(email, emails[0]);
    }
  }
  
  const groups = {};
  for (const email of Object.keys(parent)) {
    const root = find(email);
    if (!groups[root]) groups[root] = [];
    groups[root].push(email);
  }
  
  return Object.values(groups).map(emails => {
    emails.sort();
    return [emailToName[emails[0]], ...emails];
  });
}`,
    examples: [{ input: 'accounts = [["John","john@mail.com","john_work@mail.com"],["John","john@mail.com","john_home@mail.com"]]', expected: '[["John","john@mail.com","john_home@mail.com","john_work@mail.com"]]' }]
  },
  {
    title: 'Smallest String With Swaps',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Array', 'Hash Table', 'String', 'DFS', 'BFS', 'Sorting'],
    acceptanceRate: 57.4,
    visualizationType: 'Graph',
    description: 'Find the lexicographically smallest string by swapping characters at given index pairs.',
    starterCode: `function smallestStringWithSwaps(s, pairs) {
  const n = s.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  for (const [i, j] of pairs) {
    parent[find(i)] = find(j);
  }
  
  const groups = {};
  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!groups[root]) groups[root] = [];
    groups[root].push(i);
  }
  
  const result = [...s];
  for (const indices of Object.values(groups)) {
    const chars = indices.map(i => s[i]).sort();
    indices.sort((a, b) => a - b);
    for (let i = 0; i < indices.length; i++) {
      result[indices[i]] = chars[i];
    }
  }
  return result.join('');
}`,
    examples: [{ input: 's = "dcab", pairs = [[0,3],[1,2]]', expected: '"bacd"' }]
  },

  {
    title: 'Path with Minimum Effort',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Array', 'Binary Search', 'DFS', 'BFS', 'Heap'],
    acceptanceRate: 55.2,
    visualizationType: 'Graph',
    description: 'Find the path that minimizes the maximum absolute height difference between consecutive cells.',
    starterCode: `function minimumEffortPath(heights) {
  const rows = heights.length, cols = heights[0].length;
  const edges = [];
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (r + 1 < rows) {
        edges.push([Math.abs(heights[r][c] - heights[r+1][c]), idx, idx + cols]);
      }
      if (c + 1 < cols) {
        edges.push([Math.abs(heights[r][c] - heights[r][c+1]), idx, idx + 1]);
      }
    }
  }
  
  edges.sort((a, b) => a[0] - b[0]);
  const parent = Array.from({ length: rows * cols }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  for (const [effort, u, v] of edges) {
    parent[find(u)] = find(v);
    if (find(0) === find(rows * cols - 1)) return effort;
  }
  return 0;
}`,
    examples: [{ input: 'heights = [[1,2,2],[3,8,2],[5,3,5]]', expected: '2' }]
  },
  {
    title: 'Satisfiability of Equality Equations',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Array', 'String', 'Graph'],
    acceptanceRate: 50.8,
    visualizationType: 'Graph',
    description: 'Check if variable equations (e.g., a==b, b!=c) are consistent.',
    starterCode: `function equationsPossible(equations) {
  const parent = {};
  for (let i = 0; i < 26; i++) {
    parent[String.fromCharCode(97 + i)] = String.fromCharCode(97 + i);
  }
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  // Process == equations first
  for (const eq of equations) {
    if (eq[1] === '=') {
      parent[find(eq[0])] = find(eq[3]);
    }
  }
  
  // Check != equations
  for (const eq of equations) {
    if (eq[1] === '!' && find(eq[0]) === find(eq[3])) {
      return false;
    }
  }
  return true;
}`,
    examples: [{ input: 'equations = ["a==b","b!=a"]', expected: 'false' }]
  },

  {
    title: 'Number of Operations to Make Network Connected',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Graph', 'DFS', 'BFS'],
    acceptanceRate: 58.6,
    visualizationType: 'Graph',
    description: 'Find minimum cables to move to connect all computers. Return -1 if impossible.',
    starterCode: `function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;
  
  const parent = Array.from({ length: n }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  let components = n;
  for (const [u, v] of connections) {
    const pu = find(u), pv = find(v);
    if (pu !== pv) {
      parent[pu] = pv;
      components--;
    }
  }
  return components - 1;
}`,
    examples: [{ input: 'n = 4, connections = [[0,1],[0,2],[1,2]]', expected: '1' }]
  },
  {
    title: 'Regions Cut By Slashes',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Array', 'Hash Table', 'DFS', 'BFS', 'Matrix'],
    acceptanceRate: 69.5,
    visualizationType: 'Graph',
    description: 'Count how many regions are formed by slashes in an n x n grid.',
    starterCode: `function regionsBySlashes(grid) {
  const n = grid.length;
  const size = n * n * 4;
  const parent = Array.from({ length: size }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  function union(x, y) {
    parent[find(x)] = find(y);
  }
  
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const base = (r * n + c) * 4;
      const char = grid[r][c];
      
      // Connect within cell
      if (char !== '/') { union(base, base + 1); union(base + 2, base + 3); }
      if (char !== '\\\\') { union(base, base + 3); union(base + 1, base + 2); }
      
      // Connect with neighbors
      if (r + 1 < n) union(base + 2, base + 4 * n);
      if (c + 1 < n) union(base + 1, base + 4 + 3);
    }
  }
  
  let regions = 0;
  for (let i = 0; i < size; i++) if (find(i) === i) regions++;
  return regions;
}`,
    examples: [{ input: 'grid = [" /","/ "]', expected: '2' }]
  },

  {
    title: 'Min Cost to Connect All Points',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Array', 'Graph'],
    acceptanceRate: 64.8,
    visualizationType: 'Graph',
    description: 'Find the minimum cost to connect all points using Manhattan distance (Kruskal\'s MST).',
    starterCode: `function minCostConnectPoints(points) {
  const n = points.length;
  const edges = [];
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      edges.push([dist, i, j]);
    }
  }
  
  edges.sort((a, b) => a[0] - b[0]);
  const parent = Array.from({ length: n }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  let cost = 0, edgesUsed = 0;
  for (const [dist, u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu !== pv) {
      parent[pu] = pv;
      cost += dist;
      if (++edgesUsed === n - 1) break;
    }
  }
  return cost;
}`,
    examples: [{ input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]', expected: '20' }]
  },
  {
    title: 'Graph Valid Tree',
    difficulty: 'Medium',
    tags: ['Union Find', 'DSU', 'Graph', 'DFS', 'BFS'],
    acceptanceRate: 45.8,
    visualizationType: 'Graph',
    description: 'Check if a graph is a valid tree (no cycles and fully connected).',
    starterCode: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  
  const parent = Array.from({ length: n }, (_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  for (const [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return false; // Cycle detected
    parent[pu] = pv;
  }
  return true;
}`,
    examples: [{ input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', expected: 'true' }]
  }
];


// ========================================
// PHASE 4: MASTERY - Practice & Patterns
// ========================================

export const phase4Problems = [
  // ===== 1. Sliding Window (10 problems) =====
  {
    title: 'Maximum Sum Subarray of Size K',
    difficulty: 'Easy',
    tags: ['Sliding Window', 'Array'],
    acceptanceRate: 68.5,
    visualizationType: 'Array',
    description: 'Find the largest sum of k consecutive elements using a fixed-size sliding window.',
    starterCode: `function maxSumSubarray(arr, k) {
  let windowSum = 0, maxSum = 0;
  
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k + 1];
    }
  }
  return maxSum;
}`,
    examples: [{ input: 'arr = [2,1,5,1,3,2], k = 3', expected: '9' }]
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    acceptanceRate: 33.8,
    visualizationType: 'Array',
    description: 'Find the length of the longest substring without repeating characters.',
    starterCode: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right]) >= left) {
      left = seen.get(s[right]) + 1;
    }
    seen.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    examples: [{ input: 's = "abcabcbb"', expected: '3' }]
  },

  {
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Array', 'Binary Search', 'Prefix Sum'],
    acceptanceRate: 45.2,
    visualizationType: 'Array',
    description: 'Find the smallest subarray with a sum greater than or equal to target.',
    starterCode: `function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, minLen = Infinity;
  
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
    examples: [{ input: 'target = 7, nums = [2,3,1,2,4,3]', expected: '2' }]
  },
  {
    title: 'Permutation in String',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Table', 'String', 'Two Pointers'],
    acceptanceRate: 43.8,
    visualizationType: 'Array',
    description: 'Check if one string contains a permutation of another string.',
    starterCode: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  
  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);
  
  for (const c of s1) count1[c.charCodeAt(0) - 97]++;
  
  for (let i = 0; i < s2.length; i++) {
    count2[s2.charCodeAt(i) - 97]++;
    if (i >= s1.length) count2[s2.charCodeAt(i - s1.length) - 97]--;
    if (count1.join() === count2.join()) return true;
  }
  return false;
}`,
    examples: [{ input: 's1 = "ab", s2 = "eidbaooo"', expected: 'true' }]
  },

  {
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    tags: ['Sliding Window', 'Array', 'Queue', 'Heap', 'Monotonic Queue'],
    acceptanceRate: 46.5,
    visualizationType: 'Array',
    description: 'Find the maximum element in every window of size k using a monotonic deque.',
    starterCode: `function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Store indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    
    // Remove smaller elements
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
    examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expected: '[3,3,5,5,6,7]' }]
  },
  {
    title: 'Fruit Into Baskets',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Array', 'Hash Table'],
    acceptanceRate: 43.6,
    visualizationType: 'Array',
    description: 'Find the longest subarray with at most two distinct elements (fruit types).',
    starterCode: `function totalFruit(fruits) {
  const basket = new Map();
  let left = 0, maxFruits = 0;
  
  for (let right = 0; right < fruits.length; right++) {
    basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);
    
    while (basket.size > 2) {
      basket.set(fruits[left], basket.get(fruits[left]) - 1);
      if (basket.get(fruits[left]) === 0) basket.delete(fruits[left]);
      left++;
    }
    
    maxFruits = Math.max(maxFruits, right - left + 1);
  }
  return maxFruits;
}`,
    examples: [{ input: 'fruits = [1,2,1,2,3]', expected: '4' }]
  },

  {
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    acceptanceRate: 52.4,
    visualizationType: 'Array',
    description: 'Find the longest substring with same letters after at most k character replacements.',
    starterCode: `function characterReplacement(s, k) {
  const count = new Array(26).fill(0);
  let left = 0, maxCount = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    count[s.charCodeAt(right) - 65]++;
    maxCount = Math.max(maxCount, count[s.charCodeAt(right) - 65]);
    
    while (right - left + 1 - maxCount > k) {
      count[s.charCodeAt(left) - 65]--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    examples: [{ input: 's = "AABABBA", k = 1', expected: '4' }]
  },
  {
    title: 'Subarrays with K Different Integers',
    difficulty: 'Hard',
    tags: ['Sliding Window', 'Array', 'Hash Table', 'Counting'],
    acceptanceRate: 54.8,
    visualizationType: 'Array',
    description: 'Count subarrays having exactly k different integers.',
    starterCode: `function subarraysWithKDistinct(nums, k) {
  function atMostK(k) {
    const count = new Map();
    let left = 0, result = 0;
    
    for (let right = 0; right < nums.length; right++) {
      count.set(nums[right], (count.get(nums[right]) || 0) + 1);
      
      while (count.size > k) {
        count.set(nums[left], count.get(nums[left]) - 1);
        if (count.get(nums[left]) === 0) count.delete(nums[left]);
        left++;
      }
      
      result += right - left + 1;
    }
    return result;
  }
  
  return atMostK(k) - atMostK(k - 1);
}`,
    examples: [{ input: 'nums = [1,2,1,2,3], k = 2', expected: '7' }]
  },

  {
    title: 'Grumpy Bookstore Owner',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Array'],
    acceptanceRate: 57.3,
    visualizationType: 'Array',
    description: 'Maximize satisfied customers using a "calm" window of size minutes.',
    starterCode: `function maxSatisfied(customers, grumpy, minutes) {
  let satisfied = 0, maxExtra = 0, windowExtra = 0;
  
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) satisfied += customers[i];
    else windowExtra += customers[i];
    
    if (i >= minutes) {
      if (grumpy[i - minutes] === 1) windowExtra -= customers[i - minutes];
    }
    
    maxExtra = Math.max(maxExtra, windowExtra);
  }
  return satisfied + maxExtra;
}`,
    examples: [{ input: 'customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3', expected: '16' }]
  },
  {
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    acceptanceRate: 40.5,
    visualizationType: 'Array',
    description: 'Find the smallest window in s containing all characters of t.',
    starterCode: `function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  
  let left = 0, have = 0, required = need.size;
  let minLen = Infinity, minStart = 0;
  const window = new Map();
  
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    
    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) have--;
      left++;
    }
  }
  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
}`,
    examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', expected: '"BANC"' }]
  },

  // ===== 2. Two Pointers (10 problems) =====

  {
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    tags: ['Two Pointers', 'String'],
    acceptanceRate: 44.2,
    visualizationType: 'Array',
    description: 'Check if a string is a palindrome after removing non-alphanumeric characters.',
    starterCode: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  
  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}

function isAlphaNum(c) {
  return /[a-zA-Z0-9]/.test(c);
}`,
    examples: [{ input: 's = "A man, a plan, a canal: Panama"', expected: 'true' }]
  },
  {
    title: 'Two Sum II - Sorted Array',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array', 'Binary Search'],
    acceptanceRate: 60.5,
    visualizationType: 'Array',
    description: 'Find two numbers that add to a target in a sorted array using two pointers.',
    starterCode: `function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}`,
    examples: [{ input: 'numbers = [2,7,11,15], target = 9', expected: '[1,2]' }]
  },

  {
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    tags: ['Two Pointers', 'Array'],
    acceptanceRate: 52.3,
    visualizationType: 'Array',
    description: 'Remove duplicates from a sorted array in-place using O(1) extra space.',
    starterCode: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let insertPos = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[insertPos++] = nums[i];
    }
  }
  return insertPos;
}`,
    examples: [{ input: 'nums = [1,1,2]', expected: '2, nums = [1,2,_]' }]
  },
  {
    title: 'Container With Most Water',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array', 'Greedy'],
    acceptanceRate: 54.3,
    visualizationType: 'Array',
    description: 'Find two lines that together with the x-axis form a container holding the most water.',
    starterCode: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  
  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);
    
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}`,
    examples: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' }]
  },

  {
    title: '3Sum',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array', 'Sorting'],
    acceptanceRate: 32.5,
    visualizationType: 'Array',
    description: 'Find all unique triplets in the array that sum to zero.',
    starterCode: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
    examples: [{ input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' }]
  },
  {
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Array', 'Stack', 'DP', 'Monotonic Stack'],
    acceptanceRate: 58.8,
    visualizationType: 'Array',
    description: 'Calculate how much water can be trapped between bars after raining.',
    starterCode: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
    examples: [{ input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' }]
  },

  {
    title: 'Sort Colors (Dutch National Flag)',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array', 'Sorting'],
    acceptanceRate: 58.4,
    visualizationType: 'Array',
    description: 'Sort an array of 0s, 1s, and 2s in-place using three pointers.',
    starterCode: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}`,
    examples: [{ input: 'nums = [2,0,2,1,1,0]', expected: '[0,0,1,1,2,2]' }]
  },
  {
    title: 'Squares of a Sorted Array',
    difficulty: 'Easy',
    tags: ['Two Pointers', 'Array', 'Sorting'],
    acceptanceRate: 71.8,
    visualizationType: 'Array',
    description: 'Return a sorted array of squares for a sorted input array (may contain negatives).',
    starterCode: `function sortedSquares(nums) {
  const n = nums.length;
  const result = new Array(n);
  let left = 0, right = n - 1;
  
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      result[i] = nums[left] * nums[left];
      left++;
    } else {
      result[i] = nums[right] * nums[right];
      right--;
    }
  }
  return result;
}`,
    examples: [{ input: 'nums = [-4,-1,0,3,10]', expected: '[0,1,9,16,100]' }]
  },

  {
    title: 'Bag of Tokens',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array', 'Greedy', 'Sorting'],
    acceptanceRate: 52.6,
    visualizationType: 'Array',
    description: 'Maximize your score by trading tokens using power and score strategically.',
    starterCode: `function bagOfTokensScore(tokens, power) {
  tokens.sort((a, b) => a - b);
  let left = 0, right = tokens.length - 1;
  let score = 0, maxScore = 0;
  
  while (left <= right) {
    if (power >= tokens[left]) {
      power -= tokens[left++];
      score++;
      maxScore = Math.max(maxScore, score);
    } else if (score > 0) {
      power += tokens[right--];
      score--;
    } else {
      break;
    }
  }
  return maxScore;
}`,
    examples: [{ input: 'tokens = [100,200,300,400], power = 200', expected: '2' }]
  },
  {
    title: 'Longest Mountain in Array',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array', 'DP', 'Enumeration'],
    acceptanceRate: 40.5,
    visualizationType: 'Array',
    description: 'Find the length of the longest mountain subarray (strictly increasing then decreasing).',
    starterCode: `function longestMountain(arr) {
  const n = arr.length;
  if (n < 3) return 0;
  
  let maxLen = 0;
  for (let i = 1; i < n - 1; i++) {
    if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
      let left = i, right = i;
      while (left > 0 && arr[left-1] < arr[left]) left--;
      while (right < n-1 && arr[right] > arr[right+1]) right++;
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }
  return maxLen;
}`,
    examples: [{ input: 'arr = [2,1,4,7,3,2,5]', expected: '5' }]
  },

  // ===== 3. Intervals & Merging (10 problems) =====

  {
    title: 'Merge Intervals',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array', 'Sorting'],
    acceptanceRate: 46.5,
    visualizationType: 'Array',
    description: 'Combine all overlapping intervals into one.',
    starterCode: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}`,
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' }]
  },
  {
    title: 'Insert Interval',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array'],
    acceptanceRate: 39.2,
    visualizationType: 'Array',
    description: 'Add a new interval into a sorted list and merge if necessary.',
    starterCode: `function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  
  // Add all intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }
  
  // Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  
  // Add remaining intervals
  while (i < intervals.length) result.push(intervals[i++]);
  return result;
}`,
    examples: [{ input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', expected: '[[1,5],[6,9]]' }]
  },

  {
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array', 'Greedy', 'Sorting', 'DP'],
    acceptanceRate: 51.8,
    visualizationType: 'Array',
    description: 'Find the minimum number of intervals to remove to avoid any overlap.',
    starterCode: `function eraseOverlapIntervals(intervals) {
  if (intervals.length <= 1) return 0;
  
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, prevEnd = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      count++;
    } else {
      prevEnd = intervals[i][1];
    }
  }
  return count;
}`,
    examples: [{ input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', expected: '1' }]
  },
  {
    title: 'Meeting Rooms II',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array', 'Heap', 'Sorting', 'Prefix Sum'],
    acceptanceRate: 50.4,
    visualizationType: 'Array',
    description: 'Find the minimum number of conference rooms required for all meetings.',
    starterCode: `function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  
  let rooms = 0, endPtr = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[endPtr]) {
      rooms++;
    } else {
      endPtr++;
    }
  }
  return rooms;
}`,
    examples: [{ input: 'intervals = [[0,30],[5,10],[15,20]]', expected: '2' }]
  },

  {
    title: 'Interval List Intersections',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array', 'Two Pointers'],
    acceptanceRate: 71.5,
    visualizationType: 'Array',
    description: 'Find the intersection of two sets of sorted intervals.',
    starterCode: `function intervalIntersection(firstList, secondList) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < firstList.length && j < secondList.length) {
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);
    
    if (start <= end) result.push([start, end]);
    
    if (firstList[i][1] < secondList[j][1]) i++;
    else j++;
  }
  return result;
}`,
    examples: [{ input: 'firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]', expected: '[[1,2],[5,5],[8,10]]' }]
  },
  {
    title: 'Employee Free Time',
    difficulty: 'Hard',
    tags: ['Intervals', 'Array', 'Heap', 'Sorting'],
    acceptanceRate: 71.8,
    visualizationType: 'Array',
    description: 'Find the common free time for all employees given their schedules.',
    starterCode: `function employeeFreeTime(schedule) {
  const intervals = schedule.flat().sort((a, b) => a[0] - b[0]);
  const result = [];
  let prevEnd = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > prevEnd) {
      result.push([prevEnd, intervals[i][0]]);
    }
    prevEnd = Math.max(prevEnd, intervals[i][1]);
  }
  return result;
}`,
    examples: [{ input: 'schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]', expected: '[[3,4]]' }]
  },

  {
    title: 'Car Pooling',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array', 'Heap', 'Sorting', 'Prefix Sum', 'Simulation'],
    acceptanceRate: 57.4,
    visualizationType: 'Array',
    description: 'Determine if you can pick up and drop off all passengers without exceeding capacity.',
    starterCode: `function carPooling(trips, capacity) {
  const changes = new Array(1001).fill(0);
  
  for (const [passengers, from, to] of trips) {
    changes[from] += passengers;
    changes[to] -= passengers;
  }
  
  let current = 0;
  for (const change of changes) {
    current += change;
    if (current > capacity) return false;
  }
  return true;
}`,
    examples: [{ input: 'trips = [[2,1,5],[3,3,7]], capacity = 4', expected: 'false' }]
  },
  {
    title: 'Maximum CPU Load',
    difficulty: 'Hard',
    tags: ['Intervals', 'Array', 'Heap', 'Sorting'],
    acceptanceRate: 48.2,
    visualizationType: 'Array',
    description: 'Find the maximum CPU load at any time given overlapping tasks.',
    starterCode: `function maxCPULoad(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);
  const events = [];
  
  for (const [start, end, load] of jobs) {
    events.push([start, load]);
    events.push([end, -load]);
  }
  
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  
  let currentLoad = 0, maxLoad = 0;
  for (const [_, load] of events) {
    currentLoad += load;
    maxLoad = Math.max(maxLoad, currentLoad);
  }
  return maxLoad;
}`,
    examples: [{ input: 'jobs = [[1,4,3],[2,5,4],[7,9,6]]', expected: '7' }]
  },

  {
    title: 'Video Stitching',
    difficulty: 'Medium',
    tags: ['Intervals', 'Array', 'Greedy', 'DP'],
    acceptanceRate: 50.8,
    visualizationType: 'Array',
    description: 'Find the minimum number of clips to cover the entire timeline [0, time].',
    starterCode: `function videoStitching(clips, time) {
  clips.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  
  let count = 0, end = 0, farthest = 0, i = 0;
  
  while (end < time) {
    while (i < clips.length && clips[i][0] <= end) {
      farthest = Math.max(farthest, clips[i][1]);
      i++;
    }
    
    if (farthest === end) return -1;
    count++;
    end = farthest;
  }
  return count;
}`,
    examples: [{ input: 'clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10', expected: '3' }]
  },
  {
    title: 'My Calendar I',
    difficulty: 'Medium',
    tags: ['Intervals', 'Design', 'Segment Tree', 'Binary Search'],
    acceptanceRate: 56.4,
    visualizationType: 'Array',
    description: 'Design a booking system that checks for double bookings.',
    starterCode: `class MyCalendar {
  constructor() {
    this.bookings = [];
  }
  
  book(start, end) {
    for (const [s, e] of this.bookings) {
      if (start < e && end > s) return false;
    }
    this.bookings.push([start, end]);
    return true;
  }
}`,
    examples: [{ input: 'book(10,20), book(15,25), book(20,30)', expected: 'true, false, true' }]
  },

  // ===== 4. Greedy Algorithms (10 problems) =====

  {
    title: 'Assign Cookies',
    difficulty: 'Easy',
    tags: ['Greedy', 'Array', 'Sorting', 'Two Pointers'],
    acceptanceRate: 50.8,
    visualizationType: 'Array',
    description: 'Maximize content children by giving them the right cookie size.',
    starterCode: `function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  
  let child = 0, cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child++;
    cookie++;
  }
  return child;
}`,
    examples: [{ input: 'g = [1,2,3], s = [1,1]', expected: '1' }]
  },
  {
    title: 'Jump Game',
    difficulty: 'Medium',
    tags: ['Greedy', 'Array', 'DP'],
    acceptanceRate: 38.5,
    visualizationType: 'Array',
    description: 'Determine if you can reach the last index of an array.',
    starterCode: `function canJump(nums) {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`,
    examples: [{ input: 'nums = [2,3,1,1,4]', expected: 'true' }]
  },

  {
    title: 'Gas Station',
    difficulty: 'Medium',
    tags: ['Greedy', 'Array'],
    acceptanceRate: 45.2,
    visualizationType: 'Array',
    description: 'Find the starting station to complete a circular circuit.',
    starterCode: `function canCompleteCircuit(gas, cost) {
  let totalTank = 0, currentTank = 0, startStation = 0;
  
  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currentTank += gas[i] - cost[i];
    
    if (currentTank < 0) {
      startStation = i + 1;
      currentTank = 0;
    }
  }
  return totalTank >= 0 ? startStation : -1;
}`,
    examples: [{ input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', expected: '3' }]
  },
  {
    title: 'Candy',
    difficulty: 'Hard',
    tags: ['Greedy', 'Array'],
    acceptanceRate: 40.8,
    visualizationType: 'Array',
    description: 'Distribute the minimum number of candies based on children\'s ratings.',
    starterCode: `function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  
  // Left to right pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  
  // Right to left pass
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }
  
  return candies.reduce((a, b) => a + b, 0);
}`,
    examples: [{ input: 'ratings = [1,0,2]', expected: '5' }]
  },

  {
    title: 'Partition Labels',
    difficulty: 'Medium',
    tags: ['Greedy', 'Hash Table', 'String', 'Two Pointers'],
    acceptanceRate: 79.8,
    visualizationType: 'Array',
    description: 'Partition a string into as many parts as possible where each letter appears in at most one part.',
    starterCode: `function partitionLabels(s) {
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }
  
  const result = [];
  let start = 0, end = 0;
  
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIndex[s[i]]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  return result;
}`,
    examples: [{ input: 's = "ababcbacadefegdehijhklij"', expected: '[9,7,8]' }]
  },
  {
    title: 'Queue Reconstruction by Height',
    difficulty: 'Medium',
    tags: ['Greedy', 'Array', 'Sorting'],
    acceptanceRate: 72.5,
    visualizationType: 'Array',
    description: 'Reorder people based on their height and the number of people in front who are taller.',
    starterCode: `function reconstructQueue(people) {
  // Sort by height descending, then by k ascending
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  
  const result = [];
  for (const person of people) {
    result.splice(person[1], 0, person);
  }
  return result;
}`,
    examples: [{ input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]', expected: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]' }]
  },

  {
    title: 'Task Scheduler',
    difficulty: 'Medium',
    tags: ['Greedy', 'Array', 'Hash Table', 'Heap', 'Sorting', 'Counting'],
    acceptanceRate: 57.4,
    visualizationType: 'Array',
    description: 'Organize tasks with cooling time to minimize total idle time.',
    starterCode: `function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }
  
  freq.sort((a, b) => b - a);
  const maxFreq = freq[0];
  let idleSlots = (maxFreq - 1) * n;
  
  for (let i = 1; i < 26 && freq[i] > 0; i++) {
    idleSlots -= Math.min(freq[i], maxFreq - 1);
  }
  
  return tasks.length + Math.max(0, idleSlots);
}`,
    examples: [{ input: 'tasks = ["A","A","A","B","B","B"], n = 2', expected: '8' }]
  },
  {
    title: 'Wildcard Matching',
    difficulty: 'Hard',
    tags: ['Greedy', 'String', 'DP', 'Recursion'],
    acceptanceRate: 26.8,
    visualizationType: 'DP',
    description: 'Check if a string matches a pattern with ? (single char) and * (any sequence).',
    starterCode: `function isMatch(s, p) {
  let sIdx = 0, pIdx = 0;
  let starIdx = -1, sTmpIdx = -1;
  
  while (sIdx < s.length) {
    if (pIdx < p.length && (p[pIdx] === '?' || p[pIdx] === s[sIdx])) {
      sIdx++;
      pIdx++;
    } else if (pIdx < p.length && p[pIdx] === '*') {
      starIdx = pIdx;
      sTmpIdx = sIdx;
      pIdx++;
    } else if (starIdx !== -1) {
      pIdx = starIdx + 1;
      sTmpIdx++;
      sIdx = sTmpIdx;
    } else {
      return false;
    }
  }
  
  while (pIdx < p.length && p[pIdx] === '*') pIdx++;
  return pIdx === p.length;
}`,
    examples: [{ input: 's = "adceb", p = "*a*b"', expected: 'true' }]
  },

  {
    title: 'Reorganize String',
    difficulty: 'Medium',
    tags: ['Greedy', 'Hash Table', 'String', 'Heap', 'Sorting', 'Counting'],
    acceptanceRate: 52.8,
    visualizationType: 'Array',
    description: 'Rearrange characters so no two adjacent characters are the same.',
    starterCode: `function reorganizeString(s) {
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);
  
  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] > Math.ceil(s.length / 2)) return '';
  
  const result = new Array(s.length);
  let idx = 0;
  
  for (const [char, count] of sorted) {
    for (let i = 0; i < count; i++) {
      if (idx >= s.length) idx = 1;
      result[idx] = char;
      idx += 2;
    }
  }
  return result.join('');
}`,
    examples: [{ input: 's = "aab"', expected: '"aba"' }]
  },
  {
    title: 'Lemonade Change',
    difficulty: 'Easy',
    tags: ['Greedy', 'Array'],
    acceptanceRate: 52.6,
    visualizationType: 'Array',
    description: 'Provide correct change for customers using only collected bills.',
    starterCode: `function lemonadeChange(bills) {
  let fives = 0, tens = 0;
  
  for (const bill of bills) {
    if (bill === 5) {
      fives++;
    } else if (bill === 10) {
      if (fives === 0) return false;
      fives--;
      tens++;
    } else {
      if (tens > 0 && fives > 0) {
        tens--;
        fives--;
      } else if (fives >= 3) {
        fives -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}`,
    examples: [{ input: 'bills = [5,5,5,10,20]', expected: 'true' }]
  },

  // ===== 5. Bit Manipulation (10 problems) =====

  {
    title: 'Number of 1 Bits',
    difficulty: 'Easy',
    tags: ['Bit Manipulation'],
    acceptanceRate: 66.5,
    visualizationType: 'Array',
    description: 'Count how many bits are set to 1 (Hamming Weight).',
    starterCode: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
}`,
    examples: [{ input: 'n = 11 (binary: 1011)', expected: '3' }]
  },
  {
    title: 'Counting Bits',
    difficulty: 'Easy',
    tags: ['Bit Manipulation', 'DP'],
    acceptanceRate: 75.8,
    visualizationType: 'Array',
    description: 'Return an array of 1-bit counts for every number from 0 to n.',
    starterCode: `function countBits(n) {
  const result = new Array(n + 1).fill(0);
  
  for (let i = 1; i <= n; i++) {
    // i >> 1 removes last bit, i & 1 checks if last bit is 1
    result[i] = result[i >> 1] + (i & 1);
  }
  return result;
}`,
    examples: [{ input: 'n = 5', expected: '[0,1,1,2,1,2]' }]
  },

  {
    title: 'Single Number',
    difficulty: 'Easy',
    tags: ['Bit Manipulation', 'Array'],
    acceptanceRate: 70.5,
    visualizationType: 'Array',
    description: 'Find the element that appears only once (all others appear twice) using XOR.',
    starterCode: `function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}`,
    examples: [{ input: 'nums = [4,1,2,1,2]', expected: '4' }]
  },
  {
    title: 'Reverse Bits',
    difficulty: 'Easy',
    tags: ['Bit Manipulation', 'Divide and Conquer'],
    acceptanceRate: 52.8,
    visualizationType: 'Array',
    description: 'Reverse the bits of a given 32-bit unsigned integer.',
    starterCode: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}`,
    examples: [{ input: 'n = 43261596', expected: '964176192' }]
  },

  {
    title: 'Sum of Two Integers',
    difficulty: 'Medium',
    tags: ['Bit Manipulation', 'Math'],
    acceptanceRate: 50.5,
    visualizationType: 'Array',
    description: 'Add two integers without using + or - operators.',
    starterCode: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
    examples: [{ input: 'a = 1, b = 2', expected: '3' }]
  },
  {
    title: 'Bitwise AND of Numbers Range',
    difficulty: 'Medium',
    tags: ['Bit Manipulation'],
    acceptanceRate: 42.5,
    visualizationType: 'Array',
    description: 'Find the bitwise AND of all numbers in a range [left, right].',
    starterCode: `function rangeBitwiseAnd(left, right) {
  let shift = 0;
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
}`,
    examples: [{ input: 'left = 5, right = 7', expected: '4' }]
  },

  {
    title: 'Power of Two',
    difficulty: 'Easy',
    tags: ['Bit Manipulation', 'Math', 'Recursion'],
    acceptanceRate: 46.2,
    visualizationType: 'Array',
    description: 'Check if a number is a power of two in O(1) time.',
    starterCode: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    examples: [{ input: 'n = 16', expected: 'true' }, { input: 'n = 3', expected: 'false' }]
  },
  {
    title: 'Maximum Product of Word Lengths',
    difficulty: 'Medium',
    tags: ['Bit Manipulation', 'Array', 'String'],
    acceptanceRate: 60.2,
    visualizationType: 'Array',
    description: 'Find max length product of two words with no common letters using bitmasks.',
    starterCode: `function maxProduct(words) {
  const masks = words.map(word => {
    let mask = 0;
    for (const c of word) {
      mask |= 1 << (c.charCodeAt(0) - 97);
    }
    return mask;
  });
  
  let maxProd = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if ((masks[i] & masks[j]) === 0) {
        maxProd = Math.max(maxProd, words[i].length * words[j].length);
      }
    }
  }
  return maxProd;
}`,
    examples: [{ input: 'words = ["abcw","baz","foo","bar","xtfn","abcdef"]', expected: '16' }]
  },

  {
    title: 'UTF-8 Validation',
    difficulty: 'Medium',
    tags: ['Bit Manipulation', 'Array'],
    acceptanceRate: 45.8,
    visualizationType: 'Array',
    description: 'Determine if a given array of integers is a valid UTF-8 encoding.',
    starterCode: `function validUtf8(data) {
  let remaining = 0;
  
  for (const byte of data) {
    if (remaining === 0) {
      if ((byte >> 7) === 0) remaining = 0;
      else if ((byte >> 5) === 0b110) remaining = 1;
      else if ((byte >> 4) === 0b1110) remaining = 2;
      else if ((byte >> 3) === 0b11110) remaining = 3;
      else return false;
    } else {
      if ((byte >> 6) !== 0b10) return false;
      remaining--;
    }
  }
  return remaining === 0;
}`,
    examples: [{ input: 'data = [197,130,1]', expected: 'true' }]
  },
  {
    title: 'Subsets Using Bitmask',
    difficulty: 'Medium',
    tags: ['Bit Manipulation', 'Array', 'Backtracking'],
    acceptanceRate: 74.5,
    visualizationType: 'Array',
    description: 'Generate all subsets of an array using bitmask enumeration.',
    starterCode: `function subsets(nums) {
  const n = nums.length;
  const result = [];
  
  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }
    result.push(subset);
  }
  return result;
}`,
    examples: [{ input: 'nums = [1,2,3]', expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }]
  }
];