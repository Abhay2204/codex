import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ChevronRight, ArrowLeft, Database, Code, Table, Key,
  FileText, Search, Filter, Layers, GitBranch, Zap, Lock, BarChart3,
  Play, CheckCircle, XCircle, Copy, BookOpen, Terminal, Settings, Eye
} from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface Example {
  title: string;
  code: string;
  output?: string;
  explanation?: string;
}

interface PracticeQuestion {
  id: string;
  question: string;
  hint?: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Concept {
  id: string;
  name: string;
  description: string;
  syntax?: string;
  examples: Example[];
  visualData?: any;
  practiceQuestions?: PracticeQuestion[];
}

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  concepts: Concept[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  topics: Topic[];
}

// ============================================
// SQL ROADMAP DATA
// ============================================
const sqlSections: Section[] = [
  // SECTION 1: BASICS
  {
    id: 'basics',
    title: 'SQL Fundamentals',
    description: 'Learn the basics of relational databases and SQL syntax',
    icon: BookOpen,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    topics: [
      {
        id: 'intro',
        name: 'Introduction to Databases',
        description: 'Understanding relational databases and SQL',
        icon: Database,
        color: 'text-cyan-400',
        concepts: [
          {
            id: 'what-is-rdbms',
            name: 'What is a Relational Database?',
            description: 'A relational database stores data in tables with rows and columns, connected through relationships.',
            examples: [
              {
                title: 'Table Structure',
                code: `┌─────────────────────────────────────────┐
│              EMPLOYEES                  │
├────────┬──────────┬───────────┬─────────┤
│ emp_id │ name     │ dept_id   │ salary  │
├────────┼──────────┼───────────┼─────────┤
│ 1      │ John     │ 101       │ 50000   │
│ 2      │ Jane     │ 102       │ 60000   │
│ 3      │ Bob      │ 101       │ 55000   │
└────────┴──────────┴───────────┴─────────┘`,
                explanation: 'Tables have columns (attributes) and rows (records). Each row represents one entity.'
              }
            ],
            visualData: {
              type: 'table',
              headers: ['emp_id', 'name', 'dept_id', 'salary'],
              rows: [
                ['1', 'John', '101', '50000'],
                ['2', 'Jane', '102', '60000'],
                ['3', 'Bob', '101', '55000']
              ]
            },
            practiceQuestions: [
              {
                id: 'q1',
                question: 'What is the primary purpose of a relational database?',
                hint: 'Think about how data is organized and connected',
                answer: 'To store data in structured tables with defined relationships between them',
                difficulty: 'easy'
              }
            ]
          },
          {
            id: 'sql-vs-nosql',
            name: 'SQL vs NoSQL',
            description: 'Understanding when to use SQL vs NoSQL databases',
            examples: [
              {
                title: 'Comparison',
                code: `SQL (Relational)          NoSQL (Non-Relational)
─────────────────────────────────────────────────
✓ Structured data         ✓ Unstructured data
✓ ACID compliance         ✓ Flexible schema
✓ Complex queries         ✓ Horizontal scaling
✓ Data integrity          ✓ High performance
                          
Examples:                 Examples:
MySQL, PostgreSQL         MongoDB, Redis
Oracle, SQL Server        Cassandra, DynamoDB`,
                explanation: 'Choose SQL for complex queries and data integrity. Choose NoSQL for flexibility and scale.'
              }
            ]
          },
          {
            id: 'rdbms-benefits',
            name: 'RDBMS Benefits & Limitations',
            description: 'Pros and cons of relational database systems',
            examples: [
              {
                title: 'Benefits',
                code: `✅ BENEFITS:
• Data Integrity - Enforces constraints
• ACID Transactions - Reliable operations
• Standardized Language - SQL is universal
• Complex Queries - JOINs, subqueries
• Data Security - Fine-grained access control

❌ LIMITATIONS:
• Vertical Scaling - Limited horizontal scale
• Schema Changes - Can be complex
• Object-Relational Mismatch
• Performance with huge datasets`,
                explanation: 'RDBMS excels at structured data with complex relationships'
              }
            ]
          }
        ]
      },
      {
        id: 'sql-keywords',
        name: 'SQL Keywords & Syntax',
        description: 'Essential SQL keywords and basic syntax rules',
        icon: Code,
        color: 'text-cyan-400',
        concepts: [
          {
            id: 'keywords',
            name: 'SQL Keywords',
            description: 'Reserved words that have special meaning in SQL',
            syntax: 'Keywords are case-insensitive but conventionally written in UPPERCASE',
            examples: [
              {
                title: 'Common Keywords',
                code: `-- Data Query
SELECT, FROM, WHERE, ORDER BY, GROUP BY, HAVING

-- Data Manipulation  
INSERT, UPDATE, DELETE

-- Data Definition
CREATE, ALTER, DROP, TRUNCATE

-- Joins & Sets
JOIN, INNER, LEFT, RIGHT, FULL, UNION

-- Conditions
AND, OR, NOT, IN, BETWEEN, LIKE, IS NULL

-- Functions
COUNT, SUM, AVG, MIN, MAX`,
                explanation: 'These keywords form the foundation of all SQL queries'
              }
            ],
            practiceQuestions: [
              {
                id: 'kw1',
                question: 'Which keyword is used to filter rows in a SELECT statement?',
                answer: 'WHERE',
                difficulty: 'easy'
              },
              {
                id: 'kw2',
                question: 'Which keyword removes all rows from a table without logging individual deletions?',
                answer: 'TRUNCATE',
                difficulty: 'medium'
              }
            ]
          },
          {
            id: 'operators',
            name: 'SQL Operators',
            description: 'Arithmetic, comparison, and logical operators',
            examples: [
              {
                title: 'Operators Overview',
                code: `-- Arithmetic Operators
+   Addition        SELECT price + tax
-   Subtraction     SELECT price - discount
*   Multiplication  SELECT qty * price
/   Division        SELECT total / count
%   Modulo          SELECT 10 % 3  -- Returns 1

-- Comparison Operators
=   Equal           WHERE status = 'active'
<>  Not Equal       WHERE status <> 'deleted'
>   Greater Than    WHERE age > 18
<   Less Than       WHERE price < 100
>=  Greater/Equal   WHERE score >= 90
<=  Less/Equal      WHERE qty <= 0

-- Logical Operators
AND  Both true      WHERE a > 5 AND b < 10
OR   Either true    WHERE status = 'A' OR status = 'B'
NOT  Negation       WHERE NOT deleted`,
                explanation: 'Operators are used to perform operations and comparisons in SQL'
              }
            ]
          }
        ]
      },
      {
        id: 'data-types',
        name: 'Data Types',
        description: 'SQL data types for different kinds of values',
        icon: Layers,
        color: 'text-cyan-400',
        concepts: [
          {
            id: 'numeric-types',
            name: 'Numeric Data Types',
            description: 'Types for storing numbers',
            examples: [
              {
                title: 'Numeric Types',
                code: `-- Integer Types
TINYINT      -128 to 127 (1 byte)
SMALLINT     -32,768 to 32,767 (2 bytes)
INT          -2.1B to 2.1B (4 bytes)
BIGINT       Very large integers (8 bytes)

-- Decimal Types
DECIMAL(p,s) Exact precision (p=total digits, s=decimal places)
NUMERIC(p,s) Same as DECIMAL
FLOAT        Approximate, 4 bytes
DOUBLE       Approximate, 8 bytes

-- Example Usage
CREATE TABLE products (
    id INT,
    price DECIMAL(10,2),    -- 99999999.99
    weight FLOAT,
    quantity SMALLINT
);`,
                explanation: 'Use INT for IDs, DECIMAL for money, FLOAT for scientific calculations'
              }
            ],
            practiceQuestions: [
              {
                id: 'dt1',
                question: 'Which data type should you use for storing currency values?',
                hint: 'You need exact precision for money',
                answer: 'DECIMAL or NUMERIC - they provide exact precision unlike FLOAT',
                difficulty: 'easy'
              }
            ]
          },
          {
            id: 'string-types',
            name: 'String Data Types',
            description: 'Types for storing text',
            examples: [
              {
                title: 'String Types',
                code: `-- Fixed Length
CHAR(n)      Fixed length, padded with spaces
             CHAR(10) 'Hello' → 'Hello     '

-- Variable Length  
VARCHAR(n)   Variable length, max n characters
             VARCHAR(100) 'Hello' → 'Hello'

-- Large Text
TEXT         Large text (up to 65KB)
MEDIUMTEXT   Medium text (up to 16MB)
LONGTEXT     Long text (up to 4GB)

-- Example
CREATE TABLE users (
    id INT,
    username VARCHAR(50),      -- Variable, max 50
    country_code CHAR(2),      -- Fixed 2 chars: 'US', 'UK'
    bio TEXT                   -- Long description
);`,
                explanation: 'Use CHAR for fixed-length codes, VARCHAR for variable text, TEXT for long content'
              }
            ]
          },
          {
            id: 'date-types',
            name: 'Date & Time Types',
            description: 'Types for storing dates and times',
            examples: [
              {
                title: 'Date/Time Types',
                code: `-- Date Types
DATE         'YYYY-MM-DD'           '2024-01-15'
TIME         'HH:MM:SS'             '14:30:00'
DATETIME     'YYYY-MM-DD HH:MM:SS'  '2024-01-15 14:30:00'
TIMESTAMP    Same format, auto-updates
YEAR         'YYYY'                 '2024'

-- Example
CREATE TABLE orders (
    id INT,
    order_date DATE,
    order_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Date Functions
SELECT CURDATE();              -- Current date
SELECT NOW();                  -- Current datetime
SELECT DATEDIFF('2024-12-31', '2024-01-01');  -- Days between`,
                explanation: 'TIMESTAMP auto-updates, useful for tracking changes'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 2: DDL - Data Definition Language
  {
    id: 'ddl',
    title: 'Data Definition Language (DDL)',
    description: 'Create, modify, and delete database structures',
    icon: Table,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    topics: [
      {
        id: 'create-table',
        name: 'CREATE TABLE',
        description: 'Creating new tables in the database',
        icon: Table,
        color: 'text-yellow-400',
        concepts: [
          {
            id: 'create-basic',
            name: 'Basic CREATE TABLE',
            description: 'Syntax for creating a new table',
            syntax: 'CREATE TABLE table_name (column1 datatype, column2 datatype, ...);',
            examples: [
              {
                title: 'Create Employees Table',
                code: `CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE DEFAULT CURDATE(),
    salary DECIMAL(10,2),
    department_id INT,
    is_active BOOLEAN DEFAULT TRUE
);`,
                output: 'Table created successfully',
                explanation: 'Creates a table with various constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT'
              },
              {
                title: 'Create with Foreign Key',
                code: `CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT NOW(),
    total_amount DECIMAL(12,2),
    status ENUM('pending', 'shipped', 'delivered') DEFAULT 'pending',
    
    FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`,
                explanation: 'Foreign key creates relationship between tables. CASCADE means changes propagate.'
              }
            ],
            visualData: {
              type: 'diagram',
              title: 'Table Relationships',
              content: `
┌─────────────┐       ┌─────────────┐
│  customers  │       │   orders    │
├─────────────┤       ├─────────────┤
│ customer_id │◄──────│ customer_id │
│ name        │   FK  │ order_id    │
│ email       │       │ total       │
└─────────────┘       └─────────────┘
`
            },
            practiceQuestions: [
              {
                id: 'ct1',
                question: 'Create a table called "products" with: id (auto-increment primary key), name (required, max 100 chars), price (decimal with 2 places), stock (integer, default 0)',
                answer: `CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    stock INT DEFAULT 0
);`,
                difficulty: 'easy'
              },
              {
                id: 'ct2',
                question: 'Create a "reviews" table with foreign key to products table',
                answer: `CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);`,
                difficulty: 'medium'
              }
            ]
          }
        ]
      },
      {
        id: 'alter-table',
        name: 'ALTER TABLE',
        description: 'Modifying existing table structure',
        icon: Settings,
        color: 'text-yellow-400',
        concepts: [
          {
            id: 'alter-operations',
            name: 'ALTER Operations',
            description: 'Various ways to modify tables',
            examples: [
              {
                title: 'ADD Column',
                code: `-- Add single column
ALTER TABLE employees 
ADD phone VARCHAR(20);

-- Add multiple columns
ALTER TABLE employees 
ADD (
    address VARCHAR(200),
    city VARCHAR(50),
    zip_code VARCHAR(10)
);

-- Add column at specific position
ALTER TABLE employees 
ADD middle_name VARCHAR(50) AFTER first_name;`,
                explanation: 'ADD adds new columns to existing table'
              },
              {
                title: 'MODIFY Column',
                code: `-- Change data type
ALTER TABLE employees 
MODIFY phone VARCHAR(30);

-- Change to NOT NULL
ALTER TABLE employees 
MODIFY email VARCHAR(100) NOT NULL;

-- Change default value
ALTER TABLE employees 
MODIFY is_active BOOLEAN DEFAULT FALSE;`,
                explanation: 'MODIFY changes column definition'
              },
              {
                title: 'DROP Column',
                code: `-- Remove column
ALTER TABLE employees 
DROP COLUMN middle_name;

-- Remove constraint
ALTER TABLE employees 
DROP FOREIGN KEY fk_department;

-- Remove index
ALTER TABLE employees 
DROP INDEX idx_email;`,
                explanation: 'DROP removes columns or constraints'
              },
              {
                title: 'RENAME',
                code: `-- Rename column
ALTER TABLE employees 
RENAME COLUMN phone TO phone_number;

-- Rename table
ALTER TABLE employees 
RENAME TO staff;

-- Or use RENAME TABLE
RENAME TABLE staff TO employees;`,
                explanation: 'RENAME changes names of columns or tables'
              }
            ],
            practiceQuestions: [
              {
                id: 'at1',
                question: 'Add a "created_at" timestamp column with default current time to the products table',
                answer: 'ALTER TABLE products ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;',
                difficulty: 'easy'
              }
            ]
          }
        ]
      },
      {
        id: 'drop-truncate',
        name: 'DROP & TRUNCATE',
        description: 'Removing tables and data',
        icon: XCircle,
        color: 'text-yellow-400',
        concepts: [
          {
            id: 'drop-vs-truncate',
            name: 'DROP vs TRUNCATE vs DELETE',
            description: 'Understanding the differences',
            examples: [
              {
                title: 'Comparison',
                code: `-- DROP: Removes entire table structure
DROP TABLE employees;
-- ❌ Table gone, cannot recover
-- ❌ All data lost
-- ❌ All indexes, constraints removed

-- TRUNCATE: Removes all rows, keeps structure
TRUNCATE TABLE employees;
-- ✓ Table structure remains
-- ❌ All data removed
-- ✓ Faster than DELETE
-- ❌ Cannot use WHERE
-- ❌ Cannot rollback (in most RDBMS)

-- DELETE: Removes specific rows
DELETE FROM employees WHERE dept_id = 5;
-- ✓ Can use WHERE clause
-- ✓ Can rollback (with transaction)
-- ✓ Triggers fire
-- ❌ Slower for large data`,
                explanation: 'DROP removes everything, TRUNCATE clears data fast, DELETE is selective'
              },
              {
                title: 'Visual Comparison',
                code: `┌─────────────┬─────────────┬─────────────┐
│   DROP      │  TRUNCATE   │   DELETE    │
├─────────────┼─────────────┼─────────────┤
│ DDL         │ DDL         │ DML         │
│ No WHERE    │ No WHERE    │ WHERE ok    │
│ No Rollback │ No Rollback │ Rollback ok │
│ Removes all │ Keeps struct│ Keeps struct│
│ Fastest     │ Fast        │ Slowest     │
│ No triggers │ No triggers │ Triggers    │
└─────────────┴─────────────┴─────────────┘`,
                explanation: 'Choose based on your needs: permanence, speed, and selectivity'
              }
            ],
            practiceQuestions: [
              {
                id: 'dt1',
                question: 'You need to remove all data from a large table quickly but keep the table structure. Which command should you use?',
                answer: 'TRUNCATE TABLE - it removes all rows quickly without logging individual deletions',
                difficulty: 'easy'
              }
            ]
          }
        ]
      },
      {
        id: 'constraints',
        name: 'Data Constraints',
        description: 'Rules to ensure data integrity',
        icon: Lock,
        color: 'text-yellow-400',
        concepts: [
          {
            id: 'constraint-types',
            name: 'Types of Constraints',
            description: 'Different constraints for data validation',
            examples: [
              {
                title: 'All Constraints',
                code: `CREATE TABLE employees (
    -- PRIMARY KEY: Unique identifier, cannot be NULL
    emp_id INT PRIMARY KEY,
    
    -- NOT NULL: Must have a value
    first_name VARCHAR(50) NOT NULL,
    
    -- UNIQUE: No duplicate values allowed
    email VARCHAR(100) UNIQUE,
    
    -- DEFAULT: Value if none provided
    status VARCHAR(20) DEFAULT 'active',
    
    -- CHECK: Custom validation rule
    age INT CHECK (age >= 18 AND age <= 100),
    salary DECIMAL(10,2) CHECK (salary > 0),
    
    -- FOREIGN KEY: Reference to another table
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);`,
                explanation: 'Constraints enforce rules at the database level'
              },
              {
                title: 'Constraint Visualization',
                code: `┌─────────────────────────────────────────────────┐
│                  CONSTRAINTS                    │
├─────────────┬───────────────────────────────────┤
│ PRIMARY KEY │ ● Unique + NOT NULL               │
│             │ ● One per table                   │
│             │ ● Creates clustered index         │
├─────────────┼───────────────────────────────────┤
│ FOREIGN KEY │ ● References another table        │
│             │ ● Enforces referential integrity  │
│             │ ● Can CASCADE on delete/update    │
├─────────────┼───────────────────────────────────┤
│ UNIQUE      │ ● No duplicates                   │
│             │ ● Allows one NULL (usually)       │
│             │ ● Creates index                   │
├─────────────┼───────────────────────────────────┤
│ CHECK       │ ● Custom validation               │
│             │ ● Boolean expression              │
│             │ ● Checked on INSERT/UPDATE        │
├─────────────┼───────────────────────────────────┤
│ NOT NULL    │ ● Value required                  │
│             │ ● No empty values                 │
├─────────────┼───────────────────────────────────┤
│ DEFAULT     │ ● Auto-fill if not provided       │
│             │ ● Can be value or function        │
└─────────────┴───────────────────────────────────┘`,
                explanation: 'Each constraint serves a specific purpose in maintaining data quality'
              }
            ],
            practiceQuestions: [
              {
                id: 'con1',
                question: 'What constraint would you use to ensure an email column has no duplicate values?',
                answer: 'UNIQUE constraint',
                difficulty: 'easy'
              },
              {
                id: 'con2',
                question: 'Create a CHECK constraint to ensure a "rating" column only accepts values 1-5',
                answer: 'CHECK (rating >= 1 AND rating <= 5) or CHECK (rating BETWEEN 1 AND 5)',
                difficulty: 'medium'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 3: DML - Data Manipulation Language
  {
    id: 'dml',
    title: 'Data Manipulation Language (DML)',
    description: 'Insert, update, delete, and query data',
    icon: FileText,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    topics: [
      {
        id: 'select',
        name: 'SELECT Queries',
        description: 'Retrieving data from tables',
        icon: Search,
        color: 'text-green-400',
        concepts: [
          {
            id: 'select-basic',
            name: 'Basic SELECT',
            description: 'Fundamental query syntax',
            syntax: 'SELECT columns FROM table WHERE condition;',
            examples: [
              {
                title: 'SELECT Examples',
                code: `-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- With alias
SELECT 
    first_name AS "First Name",
    salary * 12 AS "Annual Salary"
FROM employees;

-- DISTINCT - remove duplicates
SELECT DISTINCT department_id FROM employees;

-- LIMIT results
SELECT * FROM employees LIMIT 10;
SELECT * FROM employees LIMIT 10 OFFSET 20; -- Skip first 20`,
                explanation: 'SELECT retrieves data. Use specific columns instead of * for better performance.'
              },
              {
                title: 'Sample Data & Query',
                code: `-- Sample employees table:
┌────┬───────────┬────────┬─────────┐
│ id │ name      │ dept   │ salary  │
├────┼───────────┼────────┼─────────┤
│ 1  │ John      │ IT     │ 60000   │
│ 2  │ Jane      │ HR     │ 55000   │
│ 3  │ Bob       │ IT     │ 65000   │
│ 4  │ Alice     │ Sales  │ 58000   │
└────┴───────────┴────────┴─────────┘

-- Query:
SELECT name, salary FROM employees WHERE dept = 'IT';

-- Result:
┌───────────┬─────────┐
│ name      │ salary  │
├───────────┼─────────┤
│ John      │ 60000   │
│ Bob       │ 65000   │
└───────────┴─────────┘`,
                explanation: 'WHERE filters rows based on conditions'
              }
            ],
            practiceQuestions: [
              {
                id: 'sel1',
                question: 'Write a query to get unique department names from employees table',
                answer: 'SELECT DISTINCT department FROM employees;',
                difficulty: 'easy'
              },
              {
                id: 'sel2',
                question: 'Get the top 5 highest paid employees',
                answer: 'SELECT * FROM employees ORDER BY salary DESC LIMIT 5;',
                difficulty: 'easy'
              }
            ]
          },
          {
            id: 'where-clause',
            name: 'WHERE Clause',
            description: 'Filtering data with conditions',
            examples: [
              {
                title: 'WHERE Conditions',
                code: `-- Comparison
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE stock = 0;

-- Multiple conditions
SELECT * FROM employees 
WHERE department = 'IT' AND salary > 50000;

SELECT * FROM employees 
WHERE department = 'IT' OR department = 'HR';

-- IN operator
SELECT * FROM employees 
WHERE department IN ('IT', 'HR', 'Sales');

-- BETWEEN
SELECT * FROM products 
WHERE price BETWEEN 10 AND 100;

-- LIKE pattern matching
SELECT * FROM employees WHERE name LIKE 'J%';    -- Starts with J
SELECT * FROM employees WHERE name LIKE '%son';  -- Ends with son
SELECT * FROM employees WHERE name LIKE '%an%';  -- Contains an
SELECT * FROM employees WHERE name LIKE 'J___';  -- J + 3 chars

-- NULL checks
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;`,
                explanation: 'WHERE supports many operators for flexible filtering'
              }
            ],
            practiceQuestions: [
              {
                id: 'wh1',
                question: 'Find all products with price between $50 and $200 that are in stock',
                answer: 'SELECT * FROM products WHERE price BETWEEN 50 AND 200 AND stock > 0;',
                difficulty: 'medium'
              }
            ]
          },
          {
            id: 'order-by',
            name: 'ORDER BY',
            description: 'Sorting query results',
            examples: [
              {
                title: 'Sorting Examples',
                code: `-- Ascending (default)
SELECT * FROM employees ORDER BY salary;
SELECT * FROM employees ORDER BY salary ASC;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees 
ORDER BY department ASC, salary DESC;

-- Order by column position
SELECT name, salary FROM employees ORDER BY 2 DESC;

-- Order by expression
SELECT name, salary, salary * 12 AS annual
FROM employees 
ORDER BY annual DESC;

-- NULL handling
SELECT * FROM employees 
ORDER BY commission NULLS LAST;  -- PostgreSQL
ORDER BY COALESCE(commission, 0);  -- MySQL workaround`,
                explanation: 'ORDER BY sorts results. Multiple columns create secondary sorts.'
              }
            ]
          }
        ]
      },
      {
        id: 'insert',
        name: 'INSERT',
        description: 'Adding new data to tables',
        icon: FileText,
        color: 'text-green-400',
        concepts: [
          {
            id: 'insert-syntax',
            name: 'INSERT Syntax',
            description: 'Different ways to insert data',
            examples: [
              {
                title: 'INSERT Examples',
                code: `-- Insert single row (all columns)
INSERT INTO employees 
VALUES (1, 'John', 'Doe', 'john@email.com', 50000);

-- Insert with column names (recommended)
INSERT INTO employees (first_name, last_name, email, salary)
VALUES ('John', 'Doe', 'john@email.com', 50000);

-- Insert multiple rows
INSERT INTO employees (first_name, last_name, salary)
VALUES 
    ('John', 'Doe', 50000),
    ('Jane', 'Smith', 55000),
    ('Bob', 'Wilson', 60000);

-- Insert from SELECT
INSERT INTO employees_backup 
SELECT * FROM employees WHERE department = 'IT';

-- Insert with DEFAULT
INSERT INTO employees (first_name, last_name)
VALUES ('John', 'Doe');  -- Other columns get DEFAULT values

-- Insert IGNORE (skip duplicates)
INSERT IGNORE INTO employees (id, name) VALUES (1, 'John');`,
                explanation: 'Always specify column names for clarity and safety'
              }
            ],
            practiceQuestions: [
              {
                id: 'ins1',
                question: 'Insert 3 products: (Apple, 1.50), (Banana, 0.75), (Orange, 2.00) into products(name, price)',
                answer: `INSERT INTO products (name, price) VALUES 
    ('Apple', 1.50),
    ('Banana', 0.75),
    ('Orange', 2.00);`,
                difficulty: 'easy'
              }
            ]
          }
        ]
      },
      {
        id: 'update',
        name: 'UPDATE',
        description: 'Modifying existing data',
        icon: FileText,
        color: 'text-green-400',
        concepts: [
          {
            id: 'update-syntax',
            name: 'UPDATE Syntax',
            description: 'Updating records in tables',
            examples: [
              {
                title: 'UPDATE Examples',
                code: `-- Update single column
UPDATE employees 
SET salary = 55000 
WHERE emp_id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = 60000, department = 'IT' 
WHERE emp_id = 1;

-- Update with calculation
UPDATE products 
SET price = price * 1.10  -- 10% increase
WHERE category = 'Electronics';

-- Update with subquery
UPDATE employees 
SET salary = (SELECT AVG(salary) FROM employees)
WHERE performance_rating = 'Average';

-- Update with JOIN (MySQL)
UPDATE employees e
JOIN departments d ON e.dept_id = d.dept_id
SET e.salary = e.salary * 1.05
WHERE d.name = 'Sales';

-- ⚠️ DANGER: Without WHERE updates ALL rows!
UPDATE employees SET salary = 0;  -- DON'T DO THIS!`,
                explanation: 'Always use WHERE clause unless you intend to update all rows!'
              }
            ],
            practiceQuestions: [
              {
                id: 'upd1',
                question: 'Give a 15% raise to all employees in the IT department',
                answer: "UPDATE employees SET salary = salary * 1.15 WHERE department = 'IT';",
                difficulty: 'easy'
              }
            ]
          }
        ]
      },
      {
        id: 'delete',
        name: 'DELETE',
        description: 'Removing data from tables',
        icon: XCircle,
        color: 'text-green-400',
        concepts: [
          {
            id: 'delete-syntax',
            name: 'DELETE Syntax',
            description: 'Deleting records from tables',
            examples: [
              {
                title: 'DELETE Examples',
                code: `-- Delete specific rows
DELETE FROM employees WHERE emp_id = 1;

-- Delete with multiple conditions
DELETE FROM employees 
WHERE department = 'Temp' AND hire_date < '2020-01-01';

-- Delete with subquery
DELETE FROM orders 
WHERE customer_id IN (
    SELECT customer_id FROM customers WHERE status = 'inactive'
);

-- Delete with LIMIT
DELETE FROM logs 
WHERE created_at < '2023-01-01' 
LIMIT 1000;  -- Delete in batches

-- Delete all rows (use TRUNCATE instead for speed)
DELETE FROM temp_table;

-- ⚠️ DANGER: Without WHERE deletes ALL rows!
DELETE FROM employees;  -- Deletes everything!`,
                explanation: 'DELETE is logged and can be rolled back. Use TRUNCATE for faster bulk deletion.'
              }
            ],
            practiceQuestions: [
              {
                id: 'del1',
                question: 'Delete all orders older than 2 years',
                answer: "DELETE FROM orders WHERE order_date < DATE_SUB(CURDATE(), INTERVAL 2 YEAR);",
                difficulty: 'medium'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 4: JOINs
  {
    id: 'joins',
    title: 'JOIN Queries',
    description: 'Combining data from multiple tables',
    icon: GitBranch,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    topics: [
      {
        id: 'join-types',
        name: 'Types of JOINs',
        description: 'Different ways to combine tables',
        icon: GitBranch,
        color: 'text-purple-400',
        concepts: [
          {
            id: 'inner-join',
            name: 'INNER JOIN',
            description: 'Returns only matching rows from both tables',
            examples: [
              {
                title: 'INNER JOIN Visualization',
                code: `Table A          Table B          INNER JOIN Result
┌────┬───────┐   ┌────┬───────┐   ┌────┬───────┬───────┐
│ id │ name  │   │ id │ dept  │   │ id │ name  │ dept  │
├────┼───────┤   ├────┼───────┤   ├────┼───────┼───────┤
│ 1  │ John  │   │ 1  │ IT    │   │ 1  │ John  │ IT    │
│ 2  │ Jane  │   │ 2  │ HR    │   │ 2  │ Jane  │ HR    │
│ 3  │ Bob   │   │ 4  │ Sales │   └────┴───────┴───────┘
└────┴───────┘   └────┴───────┘   
                                  Only matching IDs (1,2)
                                  Bob (3) excluded - no match
                                  Sales (4) excluded - no match`,
                explanation: 'INNER JOIN returns only rows where the join condition is met in BOTH tables'
              },
              {
                title: 'INNER JOIN Query',
                code: `SELECT 
    e.emp_id,
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;

-- Multiple JOINs
SELECT 
    o.order_id,
    c.customer_name,
    p.product_name,
    oi.quantity
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;`,
                explanation: 'Use table aliases (e, d) for cleaner queries'
              }
            ],
            practiceQuestions: [
              {
                id: 'ij1',
                question: 'Write a query to get employee names with their department names',
                answer: `SELECT e.name, d.department_name 
FROM employees e 
INNER JOIN departments d ON e.dept_id = d.dept_id;`,
                difficulty: 'easy'
              }
            ]
          },
          {
            id: 'left-join',
            name: 'LEFT JOIN',
            description: 'Returns all rows from left table, matching from right',
            examples: [
              {
                title: 'LEFT JOIN Visualization',
                code: `Table A          Table B          LEFT JOIN Result
┌────┬───────┐   ┌────┬───────┐   ┌────┬───────┬───────┐
│ id │ name  │   │ id │ dept  │   │ id │ name  │ dept  │
├────┼───────┤   ├────┼───────┤   ├────┼───────┼───────┤
│ 1  │ John  │   │ 1  │ IT    │   │ 1  │ John  │ IT    │
│ 2  │ Jane  │   │ 2  │ HR    │   │ 2  │ Jane  │ HR    │
│ 3  │ Bob   │   │ 4  │ Sales │   │ 3  │ Bob   │ NULL  │
└────┴───────┘   └────┴───────┘   └────┴───────┴───────┘
                                  
                                  All from A (left table)
                                  Bob included with NULL dept`,
                explanation: 'LEFT JOIN keeps all rows from the left table, fills NULL for non-matches'
              },
              {
                title: 'LEFT JOIN Query',
                code: `-- Get all employees, even those without departments
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

-- Find employees WITHOUT a department
SELECT e.first_name, e.last_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;`,
                explanation: 'LEFT JOIN is useful for finding records without matches'
              }
            ],
            practiceQuestions: [
              {
                id: 'lj1',
                question: 'Find all customers who have never placed an order',
                answer: `SELECT c.customer_name 
FROM customers c 
LEFT JOIN orders o ON c.customer_id = o.customer_id 
WHERE o.order_id IS NULL;`,
                difficulty: 'medium'
              }
            ]
          },
          {
            id: 'right-join',
            name: 'RIGHT JOIN',
            description: 'Returns all rows from right table, matching from left',
            examples: [
              {
                title: 'RIGHT JOIN Visualization',
                code: `Table A          Table B          RIGHT JOIN Result
┌────┬───────┐   ┌────┬───────┐   ┌────┬───────┬───────┐
│ id │ name  │   │ id │ dept  │   │ id │ name  │ dept  │
├────┼───────┤   ├────┼───────┤   ├────┼───────┼───────┤
│ 1  │ John  │   │ 1  │ IT    │   │ 1  │ John  │ IT    │
│ 2  │ Jane  │   │ 2  │ HR    │   │ 2  │ Jane  │ HR    │
│ 3  │ Bob   │   │ 4  │ Sales │   │NULL│ NULL  │ Sales │
└────┴───────┘   └────┴───────┘   └────┴───────┴───────┘
                                  
                                  All from B (right table)
                                  Sales included with NULL name`,
                explanation: 'RIGHT JOIN is the opposite of LEFT JOIN. Can always be rewritten as LEFT JOIN.'
              }
            ]
          },
          {
            id: 'full-join',
            name: 'FULL OUTER JOIN',
            description: 'Returns all rows from both tables',
            examples: [
              {
                title: 'FULL OUTER JOIN Visualization',
                code: `Table A          Table B          FULL JOIN Result
┌────┬───────┐   ┌────┬───────┐   ┌────┬───────┬───────┐
│ id │ name  │   │ id │ dept  │   │ id │ name  │ dept  │
├────┼───────┤   ├────┼───────┤   ├────┼───────┼───────┤
│ 1  │ John  │   │ 1  │ IT    │   │ 1  │ John  │ IT    │
│ 2  │ Jane  │   │ 2  │ HR    │   │ 2  │ Jane  │ HR    │
│ 3  │ Bob   │   │ 4  │ Sales │   │ 3  │ Bob   │ NULL  │
└────┴───────┘   └────┴───────┘   │NULL│ NULL  │ Sales │
                                  └────┴───────┴───────┘
                                  
                                  All rows from BOTH tables`,
                explanation: 'FULL JOIN combines LEFT and RIGHT JOIN results'
              },
              {
                title: 'FULL JOIN Query',
                code: `-- PostgreSQL, SQL Server
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;

-- MySQL workaround (no native FULL JOIN)
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
UNION
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;`,
                explanation: 'MySQL doesnt support FULL JOIN directly, use UNION of LEFT and RIGHT'
              }
            ]
          },
          {
            id: 'self-join',
            name: 'SELF JOIN',
            description: 'Joining a table to itself',
            examples: [
              {
                title: 'SELF JOIN Example',
                code: `-- Employee-Manager relationship
-- employees table:
┌────┬───────┬────────────┐
│ id │ name  │ manager_id │
├────┼───────┼────────────┤
│ 1  │ CEO   │ NULL       │
│ 2  │ John  │ 1          │
│ 3  │ Jane  │ 1          │
│ 4  │ Bob   │ 2          │
└────┴───────┴────────────┘

-- Query: Get employee with their manager name
SELECT 
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Result:
┌──────────┬─────────┐
│ employee │ manager │
├──────────┼─────────┤
│ CEO      │ NULL    │
│ John     │ CEO     │
│ Jane     │ CEO     │
│ Bob      │ John    │
└──────────┴─────────┘`,
                explanation: 'Self join uses the same table twice with different aliases'
              }
            ],
            practiceQuestions: [
              {
                id: 'sj1',
                question: 'Find all employees who earn more than their manager',
                answer: `SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;`,
                difficulty: 'hard'
              }
            ]
          },
          {
            id: 'cross-join',
            name: 'CROSS JOIN',
            description: 'Cartesian product of two tables',
            examples: [
              {
                title: 'CROSS JOIN Example',
                code: `-- Colors and Sizes tables
Colors: Red, Blue    Sizes: S, M, L

-- CROSS JOIN produces all combinations
SELECT c.color, s.size
FROM colors c
CROSS JOIN sizes s;

-- Result (6 rows = 2 colors × 3 sizes):
┌───────┬──────┐
│ color │ size │
├───────┼──────┤
│ Red   │ S    │
│ Red   │ M    │
│ Red   │ L    │
│ Blue  │ S    │
│ Blue  │ M    │
│ Blue  │ L    │
└───────┴──────┘`,
                explanation: 'CROSS JOIN creates every possible combination. Use carefully - can produce huge results!'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 5: Aggregate Functions & GROUP BY
  {
    id: 'aggregates',
    title: 'Aggregate Queries',
    description: 'Summarizing and grouping data',
    icon: BarChart3,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    topics: [
      {
        id: 'aggregate-functions',
        name: 'Aggregate Functions',
        description: 'Functions that operate on sets of rows',
        icon: BarChart3,
        color: 'text-orange-400',
        concepts: [
          {
            id: 'basic-aggregates',
            name: 'Basic Aggregate Functions',
            description: 'COUNT, SUM, AVG, MIN, MAX',
            examples: [
              {
                title: 'Aggregate Functions',
                code: `-- Sample data:
┌────┬───────┬────────┬────────┐
│ id │ name  │ dept   │ salary │
├────┼───────┼────────┼────────┤
│ 1  │ John  │ IT     │ 60000  │
│ 2  │ Jane  │ HR     │ 55000  │
│ 3  │ Bob   │ IT     │ 65000  │
│ 4  │ Alice │ Sales  │ 58000  │
│ 5  │ NULL  │ IT     │ 70000  │
└────┴───────┴────────┴────────┘

-- COUNT
SELECT COUNT(*) FROM employees;           -- 5 (all rows)
SELECT COUNT(name) FROM employees;        -- 4 (non-NULL names)
SELECT COUNT(DISTINCT dept) FROM employees; -- 3 (unique depts)

-- SUM
SELECT SUM(salary) FROM employees;        -- 308000

-- AVG
SELECT AVG(salary) FROM employees;        -- 61600
SELECT ROUND(AVG(salary), 2) FROM employees; -- 61600.00

-- MIN / MAX
SELECT MIN(salary), MAX(salary) FROM employees; -- 55000, 70000
SELECT MIN(name), MAX(name) FROM employees;     -- Alice, John`,
                explanation: 'Aggregate functions collapse multiple rows into a single result'
              }
            ],
            practiceQuestions: [
              {
                id: 'agg1',
                question: 'Find the total number of orders and total revenue',
                answer: 'SELECT COUNT(*) AS total_orders, SUM(amount) AS total_revenue FROM orders;',
                difficulty: 'easy'
              }
            ]
          }
        ]
      },
      {
        id: 'group-by',
        name: 'GROUP BY',
        description: 'Grouping rows for aggregation',
        icon: Layers,
        color: 'text-orange-400',
        concepts: [
          {
            id: 'group-by-basics',
            name: 'GROUP BY Basics',
            description: 'Grouping data for aggregate calculations',
            examples: [
              {
                title: 'GROUP BY Examples',
                code: `-- Count employees per department
SELECT 
    dept,
    COUNT(*) AS employee_count
FROM employees
GROUP BY dept;

-- Result:
┌────────┬────────────────┐
│ dept   │ employee_count │
├────────┼────────────────┤
│ IT     │ 3              │
│ HR     │ 1              │
│ Sales  │ 1              │
└────────┴────────────────┘

-- Multiple aggregates
SELECT 
    dept,
    COUNT(*) AS count,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY dept;

-- Group by multiple columns
SELECT 
    dept,
    YEAR(hire_date) AS hire_year,
    COUNT(*) AS hired
FROM employees
GROUP BY dept, YEAR(hire_date);`,
                explanation: 'GROUP BY creates groups, aggregates calculate per group'
              }
            ],
            practiceQuestions: [
              {
                id: 'gb1',
                question: 'Find the average order amount per customer',
                answer: 'SELECT customer_id, AVG(amount) AS avg_order FROM orders GROUP BY customer_id;',
                difficulty: 'easy'
              }
            ]
          }
        ]
      },
      {
        id: 'having',
        name: 'HAVING Clause',
        description: 'Filtering grouped results',
        icon: Filter,
        color: 'text-orange-400',
        concepts: [
          {
            id: 'having-vs-where',
            name: 'HAVING vs WHERE',
            description: 'Understanding when to use each',
            examples: [
              {
                title: 'HAVING Examples',
                code: `-- WHERE vs HAVING
-- WHERE: filters BEFORE grouping
-- HAVING: filters AFTER grouping

-- Find departments with more than 2 employees
SELECT dept, COUNT(*) AS count
FROM employees
GROUP BY dept
HAVING COUNT(*) > 2;

-- Find departments with avg salary > 60000
SELECT dept, AVG(salary) AS avg_sal
FROM employees
GROUP BY dept
HAVING AVG(salary) > 60000;

-- Combining WHERE and HAVING
SELECT 
    dept,
    AVG(salary) AS avg_salary
FROM employees
WHERE status = 'active'      -- Filter rows first
GROUP BY dept
HAVING AVG(salary) > 50000;  -- Filter groups after

-- Query execution order:
-- 1. FROM
-- 2. WHERE (filter rows)
-- 3. GROUP BY (create groups)
-- 4. HAVING (filter groups)
-- 5. SELECT
-- 6. ORDER BY`,
                explanation: 'Use WHERE for row conditions, HAVING for aggregate conditions'
              },
              {
                title: 'Visual Comparison',
                code: `┌─────────────────────────────────────────────────┐
│           WHERE vs HAVING                       │
├────────────────────┬────────────────────────────┤
│       WHERE        │         HAVING             │
├────────────────────┼────────────────────────────┤
│ Filters rows       │ Filters groups             │
│ Before GROUP BY    │ After GROUP BY             │
│ No aggregates      │ Can use aggregates         │
│ salary > 50000     │ AVG(salary) > 50000        │
└────────────────────┴────────────────────────────┘`,
                explanation: 'Remember: WHERE for rows, HAVING for groups'
              }
            ],
            practiceQuestions: [
              {
                id: 'hv1',
                question: 'Find customers who have placed more than 5 orders with total spending over $1000',
                answer: `SELECT customer_id, COUNT(*) AS orders, SUM(amount) AS total
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5 AND SUM(amount) > 1000;`,
                difficulty: 'medium'
              }
            ]
          }
        ]
      }
    ]
  },
  // SECTION 6: Subqueries
  {
    id: 'subqueries',
    title: 'Subqueries',
    description: 'Queries within queries',
    icon: Layers,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    topics: [
      {
        id: 'subquery-types',
        name: 'Types of Subqueries',
        description: 'Different subquery patterns',
        icon: Layers,
        color: 'text-pink-400',
        concepts: [
          {
            id: 'scalar-subquery',
            name: 'Scalar Subqueries',
            description: 'Subqueries that return a single value',
            examples: [
              {
                title: 'Scalar Subquery Examples',
                code: `-- In WHERE clause
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- In SELECT clause
SELECT 
    name,
    salary,
    (SELECT AVG(salary) FROM employees) AS avg_salary,
    salary - (SELECT AVG(salary) FROM employees) AS diff
FROM employees;

-- In UPDATE
UPDATE employees
SET salary = salary * 1.1
WHERE salary < (SELECT AVG(salary) FROM employees);`,
                explanation: 'Scalar subqueries return exactly one value'
              }
            ],
            practiceQuestions: [
              {
                id: 'sq1',
                question: 'Find all products priced above the average price',
                answer: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
                difficulty: 'easy'
              }
            ]
          },
          {
            id: 'column-subquery',
            name: 'Column Subqueries',
            description: 'Subqueries that return a list of values',
            examples: [
              {
                title: 'Column Subquery with IN',
                code: `-- Find employees in departments located in 'New York'
SELECT * FROM employees
WHERE dept_id IN (
    SELECT dept_id FROM departments WHERE location = 'New York'
);

-- Find products that have been ordered
SELECT * FROM products
WHERE product_id IN (
    SELECT DISTINCT product_id FROM order_items
);

-- NOT IN example
SELECT * FROM customers
WHERE customer_id NOT IN (
    SELECT DISTINCT customer_id FROM orders
);  -- Customers who never ordered`,
                explanation: 'Use IN/NOT IN with subqueries returning multiple values'
              }
            ]
          },
          {
            id: 'correlated-subquery',
            name: 'Correlated Subqueries',
            description: 'Subqueries that reference the outer query',
            examples: [
              {
                title: 'Correlated Subquery',
                code: `-- Find employees earning more than their department average
SELECT e.name, e.salary, e.dept
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary) 
    FROM employees 
    WHERE dept = e.dept  -- References outer query!
);

-- EXISTS example
SELECT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id
    AND o.amount > 1000
);  -- Customers with orders > $1000

-- NOT EXISTS
SELECT p.product_name
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM order_items oi
    WHERE oi.product_id = p.product_id
);  -- Products never ordered`,
                explanation: 'Correlated subqueries run once for each row in outer query - can be slow!'
              }
            ],
            practiceQuestions: [
              {
                id: 'csq1',
                question: 'Find employees who earn the highest salary in their department',
                answer: `SELECT * FROM employees e
WHERE salary = (
    SELECT MAX(salary) FROM employees WHERE dept = e.dept
);`,
                difficulty: 'hard'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 7: Advanced Functions
  {
    id: 'functions',
    title: 'Advanced Functions',
    description: 'String, numeric, date, and conditional functions',
    icon: Zap,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    topics: [
      {
        id: 'string-functions',
        name: 'String Functions',
        description: 'Manipulating text data',
        icon: FileText,
        color: 'text-indigo-400',
        concepts: [
          {
            id: 'string-funcs',
            name: 'Common String Functions',
            description: 'Functions for text manipulation',
            examples: [
              {
                title: 'String Functions',
                code: `-- CONCAT: Join strings
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;
SELECT CONCAT_WS(', ', city, state, country) AS address;  -- With separator

-- LENGTH: String length
SELECT name, LENGTH(name) AS name_length FROM products;

-- UPPER / LOWER: Case conversion
SELECT UPPER(name), LOWER(email) FROM users;

-- SUBSTRING: Extract part of string
SELECT SUBSTRING(phone, 1, 3) AS area_code FROM contacts;
SELECT SUBSTRING(email, INSTR(email, '@') + 1) AS domain;

-- REPLACE: Replace text
SELECT REPLACE(phone, '-', '') AS clean_phone FROM contacts;

-- TRIM: Remove whitespace
SELECT TRIM(name) FROM products;
SELECT LTRIM(RTRIM(name)) FROM products;  -- Left and right trim

-- LEFT / RIGHT: Extract from ends
SELECT LEFT(product_code, 3) AS category FROM products;
SELECT RIGHT(phone, 4) AS last_four FROM contacts;

-- INSTR / LOCATE: Find position
SELECT INSTR(email, '@') AS at_position FROM users;`,
                explanation: 'String functions help clean and transform text data'
              }
            ],
            practiceQuestions: [
              {
                id: 'sf1',
                question: 'Extract the domain from email addresses (part after @)',
                answer: "SELECT SUBSTRING(email, INSTR(email, '@') + 1) AS domain FROM users;",
                difficulty: 'medium'
              }
            ]
          }
        ]
      },
      {
        id: 'numeric-functions',
        name: 'Numeric Functions',
        description: 'Mathematical operations',
        icon: BarChart3,
        color: 'text-indigo-400',
        concepts: [
          {
            id: 'numeric-funcs',
            name: 'Common Numeric Functions',
            description: 'Functions for number manipulation',
            examples: [
              {
                title: 'Numeric Functions',
                code: `-- ROUND: Round to decimal places
SELECT ROUND(price, 2) FROM products;        -- 19.99
SELECT ROUND(123.456, 1);                    -- 123.5
SELECT ROUND(123.456, 0);                    -- 123
SELECT ROUND(123.456, -1);                   -- 120

-- FLOOR / CEILING: Round down/up
SELECT FLOOR(4.7);   -- 4
SELECT CEILING(4.2); -- 5
SELECT CEIL(4.2);    -- 5 (alias)

-- ABS: Absolute value
SELECT ABS(-15);     -- 15

-- MOD: Modulo (remainder)
SELECT MOD(10, 3);   -- 1
SELECT 10 % 3;       -- 1

-- POWER / SQRT
SELECT POWER(2, 3);  -- 8
SELECT SQRT(16);     -- 4

-- TRUNCATE: Cut decimal places
SELECT TRUNCATE(123.456, 2);  -- 123.45 (no rounding)

-- SIGN: Returns -1, 0, or 1
SELECT SIGN(-5);  -- -1
SELECT SIGN(0);   -- 0
SELECT SIGN(5);   -- 1`,
                explanation: 'Use ROUND for display, FLOOR/CEILING for calculations'
              }
            ]
          }
        ]
      },
      {
        id: 'date-functions',
        name: 'Date & Time Functions',
        description: 'Working with dates and times',
        icon: Terminal,
        color: 'text-indigo-400',
        concepts: [
          {
            id: 'date-funcs',
            name: 'Date Functions',
            description: 'Functions for date manipulation',
            examples: [
              {
                title: 'Date Functions',
                code: `-- Current date/time
SELECT CURDATE();        -- 2024-01-15
SELECT CURTIME();        -- 14:30:00
SELECT NOW();            -- 2024-01-15 14:30:00

-- Extract parts
SELECT YEAR(hire_date) FROM employees;
SELECT MONTH(hire_date) FROM employees;
SELECT DAY(hire_date) FROM employees;
SELECT DAYNAME(hire_date) FROM employees;  -- 'Monday'
SELECT MONTHNAME(hire_date) FROM employees; -- 'January'

-- Date arithmetic
SELECT DATE_ADD(hire_date, INTERVAL 1 YEAR) FROM employees;
SELECT DATE_SUB(NOW(), INTERVAL 30 DAY);
SELECT hire_date + INTERVAL 6 MONTH FROM employees;

-- Date difference
SELECT DATEDIFF(NOW(), hire_date) AS days_employed FROM employees;
SELECT TIMESTAMPDIFF(YEAR, hire_date, NOW()) AS years_employed;

-- Format dates
SELECT DATE_FORMAT(hire_date, '%M %d, %Y') FROM employees;
-- Result: 'January 15, 2024'

SELECT DATE_FORMAT(NOW(), '%W, %M %d, %Y %h:%i %p');
-- Result: 'Monday, January 15, 2024 02:30 PM'

-- Common format codes:
-- %Y = 4-digit year, %y = 2-digit year
-- %M = Month name, %m = Month number
-- %d = Day of month, %D = Day with suffix (1st, 2nd)
-- %W = Weekday name, %w = Weekday number
-- %H = Hour (24), %h = Hour (12), %i = Minutes, %s = Seconds`,
                explanation: 'Date functions are essential for reporting and analytics'
              }
            ],
            practiceQuestions: [
              {
                id: 'df1',
                question: 'Find all orders placed in the last 30 days',
                answer: 'SELECT * FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);',
                difficulty: 'easy'
              },
              {
                id: 'df2',
                question: 'Calculate the age of each employee based on birth_date',
                answer: 'SELECT name, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age FROM employees;',
                difficulty: 'medium'
              }
            ]
          }
        ]
      },
      {
        id: 'conditional-functions',
        name: 'Conditional Functions',
        description: 'CASE, IF, COALESCE, NULLIF',
        icon: GitBranch,
        color: 'text-indigo-400',
        concepts: [
          {
            id: 'case-when',
            name: 'CASE Expression',
            description: 'Conditional logic in SQL',
            examples: [
              {
                title: 'CASE Examples',
                code: `-- Simple CASE
SELECT 
    name,
    salary,
    CASE 
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_level
FROM employees;

-- CASE with equality
SELECT 
    order_id,
    status,
    CASE status
        WHEN 'P' THEN 'Pending'
        WHEN 'S' THEN 'Shipped'
        WHEN 'D' THEN 'Delivered'
        ELSE 'Unknown'
    END AS status_name
FROM orders;

-- CASE in ORDER BY
SELECT * FROM products
ORDER BY 
    CASE category
        WHEN 'Electronics' THEN 1
        WHEN 'Clothing' THEN 2
        ELSE 3
    END;

-- CASE in aggregation
SELECT 
    COUNT(CASE WHEN status = 'active' THEN 1 END) AS active_count,
    COUNT(CASE WHEN status = 'inactive' THEN 1 END) AS inactive_count
FROM users;`,
                explanation: 'CASE is like if-else in SQL, very powerful for transformations'
              }
            ]
          },
          {
            id: 'null-functions',
            name: 'NULL Handling Functions',
            description: 'COALESCE, NULLIF, IFNULL',
            examples: [
              {
                title: 'NULL Functions',
                code: `-- COALESCE: Return first non-NULL value
SELECT COALESCE(phone, mobile, 'No phone') AS contact FROM users;
SELECT COALESCE(nickname, first_name) AS display_name FROM users;

-- IFNULL / ISNULL: Replace NULL with value
SELECT IFNULL(commission, 0) AS commission FROM employees;  -- MySQL
SELECT ISNULL(commission, 0) AS commission FROM employees;  -- SQL Server

-- NULLIF: Return NULL if values are equal
SELECT NULLIF(quantity, 0) FROM products;  -- Returns NULL if qty is 0
-- Useful to avoid division by zero:
SELECT total / NULLIF(quantity, 0) AS unit_price FROM orders;

-- NVL (Oracle)
SELECT NVL(commission, 0) FROM employees;`,
                explanation: 'NULL handling is crucial for data quality and calculations'
              }
            ],
            practiceQuestions: [
              {
                id: 'nf1',
                question: 'Display "N/A" for products with NULL description',
                answer: "SELECT name, COALESCE(description, 'N/A') AS description FROM products;",
                difficulty: 'easy'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 8: Views & Indexes
  {
    id: 'views-indexes',
    title: 'Views & Indexes',
    description: 'Virtual tables and query optimization',
    icon: Eye,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    topics: [
      {
        id: 'views',
        name: 'Views',
        description: 'Virtual tables based on queries',
        icon: Eye,
        color: 'text-teal-400',
        concepts: [
          {
            id: 'view-basics',
            name: 'Creating & Using Views',
            description: 'Virtual tables for simplified queries',
            examples: [
              {
                title: 'View Examples',
                code: `-- Create a view
CREATE VIEW active_employees AS
SELECT emp_id, first_name, last_name, department, salary
FROM employees
WHERE status = 'active';

-- Use the view like a table
SELECT * FROM active_employees WHERE department = 'IT';

-- View with JOIN
CREATE VIEW order_details AS
SELECT 
    o.order_id,
    c.customer_name,
    o.order_date,
    SUM(oi.quantity * oi.price) AS total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.customer_name, o.order_date;

-- Modify view
CREATE OR REPLACE VIEW active_employees AS
SELECT emp_id, first_name, last_name, department, salary, hire_date
FROM employees
WHERE status = 'active';

-- Drop view
DROP VIEW IF EXISTS active_employees;`,
                explanation: 'Views simplify complex queries and provide security by hiding columns'
              },
              {
                title: 'View Benefits',
                code: `┌─────────────────────────────────────────────────┐
│              VIEW BENEFITS                      │
├─────────────────────────────────────────────────┤
│ ✓ Simplify complex queries                      │
│ ✓ Provide data security (hide sensitive cols)  │
│ ✓ Present data in different format             │
│ ✓ Backward compatibility when schema changes   │
│ ✓ Reusable query logic                         │
├─────────────────────────────────────────────────┤
│              LIMITATIONS                        │
├─────────────────────────────────────────────────┤
│ ✗ Not always updatable                         │
│ ✗ Can impact performance if complex            │
│ ✗ No indexes on views (usually)                │
└─────────────────────────────────────────────────┘`,
                explanation: 'Views are powerful but understand their limitations'
              }
            ]
          }
        ]
      },
      {
        id: 'indexes',
        name: 'Indexes',
        description: 'Speed up query performance',
        icon: Zap,
        color: 'text-teal-400',
        concepts: [
          {
            id: 'index-basics',
            name: 'Index Fundamentals',
            description: 'How indexes improve performance',
            examples: [
              {
                title: 'Index Types & Creation',
                code: `-- Create index on single column
CREATE INDEX idx_employee_name ON employees(last_name);

-- Create unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Create composite index (multiple columns)
CREATE INDEX idx_name_dept ON employees(last_name, department);

-- Create index with specific order
CREATE INDEX idx_salary ON employees(salary DESC);

-- Show indexes
SHOW INDEX FROM employees;

-- Drop index
DROP INDEX idx_employee_name ON employees;

-- Index visualization:
Without Index:          With Index:
┌─────────────┐         ┌─────────────┐
│ Full Table  │         │   B-Tree    │
│   Scan      │         │   Index     │
│ O(n) rows   │         │ O(log n)    │
└─────────────┘         └─────────────┘
   SLOW!                   FAST!`,
                explanation: 'Indexes are like a book index - find data without scanning everything'
              },
              {
                title: 'When to Use Indexes',
                code: `┌─────────────────────────────────────────────────┐
│           WHEN TO CREATE INDEXES                │
├─────────────────────────────────────────────────┤
│ ✓ Columns in WHERE clauses                      │
│ ✓ Columns in JOIN conditions                    │
│ ✓ Columns in ORDER BY                           │
│ ✓ Columns in GROUP BY                           │
│ ✓ Foreign key columns                           │
│ ✓ Columns with high selectivity                 │
├─────────────────────────────────────────────────┤
│           WHEN NOT TO INDEX                     │
├─────────────────────────────────────────────────┤
│ ✗ Small tables (full scan is fast enough)       │
│ ✗ Columns with low selectivity (gender, bool)   │
│ ✗ Frequently updated columns                    │
│ ✗ Tables with heavy INSERT/UPDATE/DELETE        │
├─────────────────────────────────────────────────┤
│           INDEX TRADE-OFFS                      │
├─────────────────────────────────────────────────┤
│ + Faster SELECT queries                         │
│ - Slower INSERT/UPDATE/DELETE                   │
│ - Additional storage space                      │
│ - Maintenance overhead                          │
└─────────────────────────────────────────────────┘`,
                explanation: 'Indexes speed up reads but slow down writes'
              }
            ],
            practiceQuestions: [
              {
                id: 'idx1',
                question: 'Create an index to optimize: SELECT * FROM orders WHERE customer_id = ? AND order_date > ?',
                answer: 'CREATE INDEX idx_customer_date ON orders(customer_id, order_date);',
                difficulty: 'medium'
              }
            ]
          }
        ]
      }
    ]
  },
  // SECTION 9: Transactions
  {
    id: 'transactions',
    title: 'Transactions',
    description: 'ACID properties and transaction control',
    icon: Lock,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    topics: [
      {
        id: 'acid',
        name: 'ACID Properties',
        description: 'Guarantees for database transactions',
        icon: Lock,
        color: 'text-rose-400',
        concepts: [
          {
            id: 'acid-explained',
            name: 'ACID Explained',
            description: 'The four properties of transactions',
            examples: [
              {
                title: 'ACID Properties',
                code: `┌─────────────────────────────────────────────────┐
│                    ACID                         │
├─────────────┬───────────────────────────────────┤
│  ATOMICITY  │ All or nothing                    │
│             │ Either all operations succeed     │
│             │ or none do (rollback)             │
├─────────────┼───────────────────────────────────┤
│ CONSISTENCY │ Valid state to valid state        │
│             │ All constraints satisfied         │
│             │ Data integrity maintained         │
├─────────────┼───────────────────────────────────┤
│  ISOLATION  │ Transactions don't interfere      │
│             │ Concurrent transactions appear    │
│             │ to run sequentially               │
├─────────────┼───────────────────────────────────┤
│ DURABILITY  │ Committed = Permanent             │
│             │ Survives system failures          │
│             │ Written to disk                   │
└─────────────┴───────────────────────────────────┘`,
                explanation: 'ACID ensures reliable database operations'
              }
            ]
          }
        ]
      },
      {
        id: 'transaction-control',
        name: 'Transaction Control',
        description: 'BEGIN, COMMIT, ROLLBACK, SAVEPOINT',
        icon: GitBranch,
        color: 'text-rose-400',
        concepts: [
          {
            id: 'transaction-commands',
            name: 'Transaction Commands',
            description: 'Controlling transaction boundaries',
            examples: [
              {
                title: 'Transaction Example',
                code: `-- Bank transfer example
START TRANSACTION;  -- or BEGIN

-- Deduct from sender
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 1;

-- Add to receiver
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 2;

-- If everything OK
COMMIT;

-- If something went wrong
ROLLBACK;

-- With error handling (pseudo-code)
START TRANSACTION;
BEGIN TRY
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
    -- Log error
END CATCH;`,
                explanation: 'Transactions ensure both updates succeed or both fail'
              },
              {
                title: 'SAVEPOINT Example',
                code: `START TRANSACTION;

INSERT INTO orders (customer_id, total) VALUES (1, 100);
SAVEPOINT order_created;

INSERT INTO order_items (order_id, product_id) VALUES (1, 101);
INSERT INTO order_items (order_id, product_id) VALUES (1, 102);
SAVEPOINT items_added;

-- Oops, wrong item
ROLLBACK TO items_added;  -- Undo only items

-- Or rollback to order
ROLLBACK TO order_created;

-- Commit everything
COMMIT;`,
                explanation: 'SAVEPOINT allows partial rollback within a transaction'
              }
            ],
            practiceQuestions: [
              {
                id: 'tx1',
                question: 'Write a transaction to transfer $500 from account A to account B',
                answer: `START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'B';
COMMIT;`,
                difficulty: 'medium'
              }
            ]
          }
        ]
      }
    ]
  },

  // SECTION 10: Advanced SQL
  {
    id: 'advanced',
    title: 'Advanced SQL',
    description: 'Window functions, CTEs, and more',
    icon: Zap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    topics: [
      {
        id: 'window-functions',
        name: 'Window Functions',
        description: 'Calculations across rows',
        icon: BarChart3,
        color: 'text-amber-400',
        concepts: [
          {
            id: 'window-basics',
            name: 'Window Function Basics',
            description: 'ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD',
            examples: [
              {
                title: 'Ranking Functions',
                code: `-- Sample data:
┌────┬───────┬────────┐
│ id │ name  │ salary │
├────┼───────┼────────┤
│ 1  │ John  │ 60000  │
│ 2  │ Jane  │ 60000  │
│ 3  │ Bob   │ 55000  │
│ 4  │ Alice │ 70000  │
└────┴───────┴────────┘

SELECT 
    name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Result:
┌───────┬────────┬─────────┬──────┬────────────┐
│ name  │ salary │ row_num │ rank │ dense_rank │
├───────┼────────┼─────────┼──────┼────────────┤
│ Alice │ 70000  │ 1       │ 1    │ 1          │
│ John  │ 60000  │ 2       │ 2    │ 2          │
│ Jane  │ 60000  │ 3       │ 2    │ 2          │
│ Bob   │ 55000  │ 4       │ 4    │ 3          │
└───────┴────────┴─────────┴──────┴────────────┘

-- ROW_NUMBER: Always unique (1,2,3,4)
-- RANK: Same rank for ties, skips (1,2,2,4)
-- DENSE_RANK: Same rank for ties, no skip (1,2,2,3)`,
                explanation: 'Window functions calculate across rows without collapsing them'
              },
              {
                title: 'LAG and LEAD',
                code: `-- LAG: Access previous row
-- LEAD: Access next row

SELECT 
    order_date,
    amount,
    LAG(amount) OVER (ORDER BY order_date) AS prev_amount,
    LEAD(amount) OVER (ORDER BY order_date) AS next_amount,
    amount - LAG(amount) OVER (ORDER BY order_date) AS change
FROM orders;

-- Result:
┌────────────┬────────┬─────────────┬─────────────┬────────┐
│ order_date │ amount │ prev_amount │ next_amount │ change │
├────────────┼────────┼─────────────┼─────────────┼────────┤
│ 2024-01-01 │ 100    │ NULL        │ 150         │ NULL   │
│ 2024-01-02 │ 150    │ 100         │ 120         │ 50     │
│ 2024-01-03 │ 120    │ 150         │ 200         │ -30    │
│ 2024-01-04 │ 200    │ 120         │ NULL        │ 80     │
└────────────┴────────┴─────────────┴─────────────┴────────┘`,
                explanation: 'LAG/LEAD are great for comparing with previous/next rows'
              },
              {
                title: 'PARTITION BY',
                code: `-- Rank within each department
SELECT 
    name,
    department,
    salary,
    RANK() OVER (
        PARTITION BY department 
        ORDER BY salary DESC
    ) AS dept_rank
FROM employees;

-- Result:
┌───────┬────────────┬────────┬───────────┐
│ name  │ department │ salary │ dept_rank │
├───────┼────────────┼────────┼───────────┤
│ Alice │ IT         │ 70000  │ 1         │
│ John  │ IT         │ 60000  │ 2         │
│ Jane  │ HR         │ 65000  │ 1         │
│ Bob   │ HR         │ 55000  │ 2         │
└───────┴────────────┴────────┴───────────┘`,
                explanation: 'PARTITION BY creates separate windows for each group'
              }
            ],
            practiceQuestions: [
              {
                id: 'wf1',
                question: 'Find the top 3 highest paid employees in each department',
                answer: `SELECT * FROM (
    SELECT name, department, salary,
           DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
    FROM employees
) ranked WHERE rank <= 3;`,
                difficulty: 'hard'
              }
            ]
          }
        ]
      },
      {
        id: 'cte',
        name: 'Common Table Expressions',
        description: 'WITH clause for readable queries',
        icon: Layers,
        color: 'text-amber-400',
        concepts: [
          {
            id: 'cte-basics',
            name: 'CTE Basics',
            description: 'Using WITH for cleaner queries',
            examples: [
              {
                title: 'CTE Examples',
                code: `-- Basic CTE
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 60000
)
SELECT * FROM high_earners WHERE department = 'IT';

-- Multiple CTEs
WITH 
dept_stats AS (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
),
high_paying_depts AS (
    SELECT department FROM dept_stats WHERE avg_salary > 55000
)
SELECT e.* 
FROM employees e
JOIN high_paying_depts h ON e.department = h.department;

-- Recursive CTE (for hierarchies)
WITH RECURSIVE org_chart AS (
    -- Base case: top-level employees
    SELECT emp_id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT e.emp_id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.emp_id
)
SELECT * FROM org_chart ORDER BY level, name;`,
                explanation: 'CTEs make complex queries more readable and maintainable'
              }
            ],
            practiceQuestions: [
              {
                id: 'cte1',
                question: 'Use a CTE to find customers whose total orders exceed the average',
                answer: `WITH customer_totals AS (
    SELECT customer_id, SUM(amount) AS total
    FROM orders GROUP BY customer_id
),
avg_total AS (
    SELECT AVG(total) AS avg FROM customer_totals
)
SELECT ct.* FROM customer_totals ct, avg_total
WHERE ct.total > avg_total.avg;`,
                difficulty: 'hard'
              }
            ]
          }
        ]
      }
    ]
  },
  // SECTION 11: Performance Optimization
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Query optimization and best practices',
    icon: Zap,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    topics: [
      {
        id: 'query-optimization',
        name: 'Query Optimization',
        description: 'Writing efficient SQL queries',
        icon: Zap,
        color: 'text-sky-400',
        concepts: [
          {
            id: 'optimization-tips',
            name: 'Optimization Techniques',
            description: 'Best practices for fast queries',
            examples: [
              {
                title: 'Query Optimization Tips',
                code: `-- ❌ BAD: SELECT *
SELECT * FROM employees;

-- ✅ GOOD: Select only needed columns
SELECT emp_id, name, salary FROM employees;

-- ❌ BAD: Function on indexed column
SELECT * FROM orders WHERE YEAR(order_date) = 2024;

-- ✅ GOOD: Range query (can use index)
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';

-- ❌ BAD: Leading wildcard
SELECT * FROM products WHERE name LIKE '%phone%';

-- ✅ GOOD: Trailing wildcard (can use index)
SELECT * FROM products WHERE name LIKE 'phone%';

-- ❌ BAD: OR on different columns
SELECT * FROM employees WHERE dept = 'IT' OR salary > 50000;

-- ✅ GOOD: Use UNION
SELECT * FROM employees WHERE dept = 'IT'
UNION
SELECT * FROM employees WHERE salary > 50000;

-- ❌ BAD: NOT IN with subquery
SELECT * FROM products WHERE id NOT IN (SELECT product_id FROM orders);

-- ✅ GOOD: LEFT JOIN with NULL check
SELECT p.* FROM products p
LEFT JOIN orders o ON p.id = o.product_id
WHERE o.product_id IS NULL;`,
                explanation: 'Small changes can dramatically improve query performance'
              },
              {
                title: 'EXPLAIN Query Plan',
                code: `-- Analyze query execution
EXPLAIN SELECT * FROM employees WHERE department = 'IT';

-- More detailed (MySQL)
EXPLAIN ANALYZE SELECT * FROM employees WHERE department = 'IT';

-- What to look for:
┌─────────────────────────────────────────────────┐
│           EXPLAIN OUTPUT                        │
├─────────────────────────────────────────────────┤
│ type: ALL        ← Full table scan (bad)        │
│ type: index      ← Full index scan              │
│ type: range      ← Index range scan (good)      │
│ type: ref        ← Index lookup (good)          │
│ type: const      ← Single row (best)            │
├─────────────────────────────────────────────────┤
│ rows: 10000      ← Estimated rows scanned       │
│ Extra: Using index ← Covering index (great!)    │
│ Extra: Using filesort ← Sorting needed (slow)   │
│ Extra: Using temporary ← Temp table (slow)      │
└─────────────────────────────────────────────────┘`,
                explanation: 'EXPLAIN helps identify slow queries and missing indexes'
              }
            ],
            practiceQuestions: [
              {
                id: 'opt1',
                question: 'Rewrite this query for better performance: SELECT * FROM orders WHERE MONTH(order_date) = 1',
                answer: "SELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2024-02-01';",
                difficulty: 'medium'
              }
            ]
          }
        ]
      }
    ]
  }
];


// ============================================
// UI COMPONENTS
// ============================================

// Code Block Component with Copy
const CodeBlock: React.FC<{ code: string; title?: string }> = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-zinc-800/50 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-sm text-zinc-400">{title}</span>
          <button
            onClick={handleCopy}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-zinc-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

// Visual Table Component
const VisualTable: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-purple-500/10">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-2 text-left text-sm font-medium text-purple-400 border border-zinc-700">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-zinc-800/50">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 text-sm text-zinc-300 border border-zinc-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Practice Question Component
const PracticeQuestionCard: React.FC<{ question: PracticeQuestion }> = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  
  return (
    <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-white font-medium">{question.question}</p>
        <span className={`px-2 py-0.5 text-xs rounded-full border ${difficultyColors[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>
      
      <div className="flex gap-2">
        {question.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-xs px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors"
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>
      
      {showHint && question.hint && (
        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-400">💡 {question.hint}</p>
        </div>
      )}
      
      {showAnswer && (
        <div className="mt-3">
          <CodeBlock code={question.answer} />
        </div>
      )}
    </div>
  );
};

// Concept Detail Modal
const ConceptModal: React.FC<{ concept: Concept | null; onClose: () => void }> = ({ concept, onClose }) => {
  if (!concept) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
          <h3 className="text-xl font-bold text-white mb-2">{concept.name}</h3>
          <p className="text-zinc-400">{concept.description}</p>
          {concept.syntax && (
            <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <code className="text-sm text-purple-400">{concept.syntax}</code>
            </div>
          )}
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Visual Data */}
          {concept.visualData?.type === 'table' && (
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-3">Visual Representation</h4>
              <VisualTable headers={concept.visualData.headers} rows={concept.visualData.rows} />
            </div>
          )}
          
          {/* Examples */}
          {concept.examples.map((example, i) => (
            <div key={i}>
              <h4 className="text-sm font-medium text-zinc-400 mb-3">{example.title}</h4>
              <CodeBlock code={example.code} />
              {example.explanation && (
                <p className="mt-2 text-sm text-zinc-500 italic">{example.explanation}</p>
              )}
              {example.output && (
                <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span className="text-xs text-green-400">Output: </span>
                  <code className="text-sm text-green-300">{example.output}</code>
                </div>
              )}
            </div>
          ))}
          
          {/* Practice Questions */}
          {concept.practiceQuestions && concept.practiceQuestions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                <Play className="w-4 h-4" /> Practice Questions
              </h4>
              <div className="space-y-3">
                {concept.practiceQuestions.map(q => (
                  <PracticeQuestionCard key={q.id} question={q} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Topic Card
const TopicCard: React.FC<{ topic: Topic; onConceptClick: (c: Concept) => void }> = ({ topic, onConceptClick }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = topic.icon;
  
  return (
    <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <Icon className={`w-5 h-5 ${topic.color}`} />
        <div className="flex-1">
          <h4 className="font-medium text-white">{topic.name}</h4>
          <p className="text-xs text-zinc-500">{topic.concepts.length} concepts</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      
      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {topic.concepts.map(concept => (
            <button
              key={concept.id}
              onClick={() => onConceptClick(concept)}
              className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-left hover:border-purple-500/30 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-300 group-hover:text-white">{concept.name}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Section Card
const SectionCard: React.FC<{
  section: Section;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onConceptClick: (c: Concept) => void;
}> = ({ section, index, isExpanded, onToggle, onConceptClick }) => {
  const Icon = section.icon;
  
  return (
    <div className="relative">
      {index < sqlSections.length - 1 && (
        <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-zinc-700 to-transparent z-0" />
      )}
      
      <div className={`${section.bgColor} border ${section.borderColor} rounded-2xl overflow-hidden`}>
        <button
          onClick={onToggle}
          className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
        >
          <div className={`w-12 h-12 ${section.bgColor} border ${section.borderColor} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${section.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-zinc-500 font-mono">SECTION {index + 1}</span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs text-zinc-500">{section.topics.length} topics</span>
            </div>
            <h3 className="text-lg font-bold text-white">{section.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{section.description}</p>
          </div>
          
          <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className="px-5 pb-5 space-y-3">
            {section.topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} onConceptClick={onConceptClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// ============================================
// MAIN COMPONENT
// ============================================
const SQLMastery: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basics']);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalTopics = sqlSections.reduce((acc, s) => acc + s.topics.length, 0);
  const totalConcepts = sqlSections.reduce((acc, s) => 
    acc + s.topics.reduce((t, topic) => t + topic.concepts.length, 0), 0
  );
  const totalQuestions = sqlSections.reduce((acc, s) => 
    acc + s.topics.reduce((t, topic) => 
      t + topic.concepts.reduce((c, concept) => c + (concept.practiceQuestions?.length || 0), 0), 0), 0
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              CodeX
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/system-design" className="text-zinc-400 hover:text-white transition-colors text-sm">
              System Design
            </Link>
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full mb-6">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-zinc-300">Complete SQL Course</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">SQL </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mastery
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            Master SQL from basics to advanced queries with visual examples,
            interactive practice questions, and real-world scenarios.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {sqlSections.length}
              </div>
              <div className="text-xs text-zinc-500">Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {totalTopics}
              </div>
              <div className="text-xs text-zinc-500">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {totalConcepts}
              </div>
              <div className="text-xs text-zinc-500">Concepts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {totalQuestions}+
              </div>
              <div className="text-xs text-zinc-500">Practice Qs</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center gap-2">
            {sqlSections.slice(0, 6).map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setExpandedSections([section.id]);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 ${section.bgColor} border ${section.borderColor} rounded-full hover:bg-white/10 transition-colors text-xs`}
                >
                  <Icon className={`w-3 h-3 ${section.color}`} />
                  <span className="text-zinc-300">{section.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SQL Roadmap Visual */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              SQL Learning Path
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Basics', icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { name: 'DDL', icon: Table, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                { name: 'DML', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
                { name: 'JOINs', icon: GitBranch, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { name: 'Aggregates', icon: BarChart3, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                { name: 'Subqueries', icon: Layers, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                { name: 'Functions', icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                { name: 'Advanced', icon: Terminal, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`${item.bg} border border-zinc-700/50 rounded-xl p-3 flex items-center gap-2`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm text-white">{item.name}</span>
                    {i < 7 && <ChevronRight className="w-3 h-3 text-zinc-600 ml-auto" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Content */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          {sqlSections.map((section, index) => (
            <div key={section.id} id={section.id}>
              <SectionCard
                section={section}
                index={index}
                isExpanded={expandedSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
                onConceptClick={setSelectedConcept}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Concept Modal */}
      {selectedConcept && (
        <ConceptModal concept={selectedConcept} onClose={() => setSelectedConcept(null)} />
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto text-center text-zinc-600 text-sm">
          © 2025 CodeX Platform. Built for developers, by developers.
        </div>
      </footer>
    </div>
  );
};

export default SQLMastery;
