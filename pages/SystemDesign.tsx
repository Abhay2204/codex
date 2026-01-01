import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ChevronRight, ArrowLeft, Zap, Server, Database, Globe, Shield,
  Cloud, Layers, Network, Activity, Lock, RefreshCw, HardDrive, Cpu, Code,
  GitBranch, Box, Workflow, BarChart3, AlertTriangle, CheckCircle, Clock,
  Gauge, Eye, Settings, Boxes, ArrowRightLeft, Filter, Shuffle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface SubTopic {
  id: string;
  name: string;
  description: string;
  keyPoints?: string[];
}

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  subtopics: SubTopic[];
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

// Complete System Design Roadmap Data
const systemDesignSections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction to System Design',
    description: 'Understand the fundamentals and approach to designing scalable systems',
    icon: Globe,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    topics: [
      {
        id: 'what-is-sd',
        name: 'What is System Design?',
        description: 'Understanding the art of designing distributed systems',
        icon: Globe,
        color: 'text-cyan-400',
        subtopics: [
          { id: 'sd-definition', name: 'Definition & Scope', description: 'System design is the process of defining architecture, components, modules, interfaces, and data flow for a system to satisfy specified requirements.' },
          { id: 'sd-importance', name: 'Why It Matters', description: 'Critical for building scalable, reliable, and maintainable systems that can handle millions of users.' },
          { id: 'sd-interviews', name: 'Interview Perspective', description: 'One of the most important skills evaluated in senior engineering interviews at top tech companies.' }
        ]
      },
      {
        id: 'approach-sd',
        name: 'How to Approach System Design',
        description: 'A structured methodology for tackling design problems',
        icon: Workflow,
        color: 'text-cyan-400',
        subtopics: [
          { id: 'requirements', name: 'Gather Requirements', description: 'Clarify functional and non-functional requirements. Ask about scale, users, and constraints.' },
          { id: 'estimation', name: 'Back-of-envelope Estimation', description: 'Calculate storage, bandwidth, and compute requirements based on expected scale.' },
          { id: 'high-level', name: 'High-Level Design', description: 'Draw the main components and their interactions before diving into details.' },
          { id: 'deep-dive', name: 'Deep Dive', description: 'Explore specific components, trade-offs, and optimizations.' },
          { id: 'bottlenecks', name: 'Identify Bottlenecks', description: 'Find single points of failure and performance bottlenecks.' }
        ]
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Scalability',
    description: 'Learn how to build systems that can handle growth and maintain speed',
    icon: Gauge,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    topics: [
      {
        id: 'perf-vs-scale',
        name: 'Performance vs Scalability',
        description: 'Understanding the difference and relationship between these concepts',
        icon: Gauge,
        color: 'text-yellow-400',
        subtopics: [
          { id: 'performance-def', name: 'Performance', description: 'How fast a single request is processed. Measured in latency and response time.' },
          { id: 'scalability-def', name: 'Scalability', description: 'Ability to handle increased load by adding resources. Can be vertical or horizontal.' },
          { id: 'perf-scale-relation', name: 'Relationship', description: 'A system can be performant but not scalable, or scalable but slow. Goal is both.' }
        ]
      },
      {
        id: 'latency-throughput',
        name: 'Latency vs Throughput',
        description: 'Two critical metrics for system performance',
        icon: Activity,
        color: 'text-yellow-400',
        subtopics: [
          { id: 'latency', name: 'Latency', description: 'Time taken to complete a single operation. Lower is better. Measured in ms.' },
          { id: 'throughput', name: 'Throughput', description: 'Number of operations completed per unit time. Higher is better. Measured in QPS/RPS.' },
          { id: 'tradeoff', name: 'Trade-offs', description: 'Often inversely related - optimizing for one may impact the other.' }
        ]
      }
    ]
  },
  {
    id: 'consistency',
    title: 'Consistency Patterns',
    description: 'Different models for data consistency in distributed systems',
    icon: RefreshCw,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    topics: [
      {
        id: 'consistency-models',
        name: 'Consistency Models',
        description: 'Different guarantees for data consistency across nodes',
        icon: RefreshCw,
        color: 'text-green-400',
        subtopics: [
          { id: 'weak-consistency', name: 'Weak Consistency', description: 'After a write, reads may or may not see it. Best effort. Used in VoIP, video chat.' },
          { id: 'eventual-consistency', name: 'Eventual Consistency', description: 'After a write, reads will eventually see it. Used in DNS, email systems.' },
          { id: 'strong-consistency', name: 'Strong Consistency', description: 'After a write, reads will see it immediately. Used in banking, transactions.' }
        ]
      },
      {
        id: 'cap-theorem',
        name: 'CAP Theorem',
        description: 'The fundamental trade-off in distributed systems',
        icon: GitBranch,
        color: 'text-green-400',
        subtopics: [
          { id: 'cap-c', name: 'Consistency (C)', description: 'Every read receives the most recent write or an error.' },
          { id: 'cap-a', name: 'Availability (A)', description: 'Every request receives a response, without guarantee of most recent data.' },
          { id: 'cap-p', name: 'Partition Tolerance (P)', description: 'System continues to operate despite network partitions.' },
          { id: 'cap-tradeoff', name: 'The Trade-off', description: 'Can only guarantee 2 of 3: CP (consistent but may be unavailable), AP (available but may be inconsistent).' }
        ]
      }
    ]
  },
  {
    id: 'availability',
    title: 'Availability Patterns',
    description: 'Strategies to ensure your system is always accessible',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    topics: [
      {
        id: 'availability-numbers',
        name: 'Availability in Numbers',
        description: 'Understanding the nines of availability',
        icon: BarChart3,
        color: 'text-blue-400',
        subtopics: [
          { id: 'two-nines', name: '99% (Two Nines)', description: '3.65 days downtime/year. Acceptable for internal tools.' },
          { id: 'three-nines', name: '99.9% (Three Nines)', description: '8.76 hours downtime/year. Standard for most web services.' },
          { id: 'four-nines', name: '99.99% (Four Nines)', description: '52.6 minutes downtime/year. Required for critical services.' },
          { id: 'five-nines', name: '99.999% (Five Nines)', description: '5.26 minutes downtime/year. Gold standard for mission-critical systems.' },
          { id: 'parallel-vs-sequence', name: 'Parallel vs Sequence', description: 'Parallel components increase availability, sequential components decrease it.' }
        ]
      },
      {
        id: 'failover-patterns',
        name: 'Failover Patterns',
        description: 'Strategies for handling component failures',
        icon: RefreshCw,
        color: 'text-blue-400',
        subtopics: [
          { id: 'active-passive', name: 'Active-Passive (Failover)', description: 'Standby server takes over when active fails. Simple but wastes resources.' },
          { id: 'active-active', name: 'Active-Active', description: 'Multiple servers handle traffic. Better resource utilization, more complex.' },
          { id: 'master-slave', name: 'Master-Slave', description: 'Master handles writes, slaves handle reads. Good for read-heavy workloads.' },
          { id: 'master-master', name: 'Master-Master', description: 'Multiple masters handle writes. Complex conflict resolution needed.' }
        ]
      },
      {
        id: 'replication',
        name: 'Replication',
        description: 'Copying data across multiple nodes for availability',
        icon: Boxes,
        color: 'text-blue-400',
        subtopics: [
          { id: 'sync-replication', name: 'Synchronous Replication', description: 'Write confirmed only after all replicas updated. Strong consistency, higher latency.' },
          { id: 'async-replication', name: 'Asynchronous Replication', description: 'Write confirmed immediately, replicas updated later. Lower latency, eventual consistency.' },
          { id: 'semi-sync', name: 'Semi-Synchronous', description: 'Write confirmed after at least one replica updated. Balance of consistency and performance.' }
        ]
      }
    ]
  },
  {
    id: 'networking',
    title: 'Networking & Communication',
    description: 'How components communicate in distributed systems',
    icon: Network,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    topics: [
      {
        id: 'dns',
        name: 'Domain Name System (DNS)',
        description: 'The phonebook of the internet',
        icon: Globe,
        color: 'text-purple-400',
        subtopics: [
          { id: 'dns-basics', name: 'How DNS Works', description: 'Translates domain names to IP addresses through hierarchical lookup.' },
          { id: 'dns-records', name: 'DNS Record Types', description: 'A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (nameserver).' },
          { id: 'dns-caching', name: 'DNS Caching', description: 'TTL-based caching at multiple levels: browser, OS, ISP, recursive resolver.' }
        ]
      },
      {
        id: 'cdn',
        name: 'Content Delivery Networks',
        description: 'Distributed network for delivering content globally',
        icon: Cloud,
        color: 'text-purple-400',
        subtopics: [
          { id: 'push-cdn', name: 'Push CDN', description: 'Content pushed to CDN when changes occur. Good for static content that changes infrequently.' },
          { id: 'pull-cdn', name: 'Pull CDN', description: 'CDN fetches content on first request. Good for dynamic content, simpler to manage.' },
          { id: 'cdn-benefits', name: 'Benefits', description: 'Reduced latency, decreased server load, improved availability, DDoS protection.' }
        ]
      },
      {
        id: 'protocols',
        name: 'Communication Protocols',
        description: 'Different ways for services to communicate',
        icon: ArrowRightLeft,
        color: 'text-purple-400',
        subtopics: [
          { id: 'http', name: 'HTTP/HTTPS', description: 'Request-response protocol. Stateless, widely supported, REST-friendly.' },
          { id: 'tcp-udp', name: 'TCP vs UDP', description: 'TCP: reliable, ordered. UDP: fast, no guarantees. Choose based on use case.' },
          { id: 'websockets', name: 'WebSockets', description: 'Full-duplex communication over single TCP connection. Good for real-time apps.' },
          { id: 'grpc', name: 'gRPC', description: 'High-performance RPC framework using Protocol Buffers. Great for microservices.' },
          { id: 'graphql', name: 'GraphQL', description: 'Query language for APIs. Client specifies exact data needed.' }
        ]
      }
    ]
  }
];


// Continue with more sections
const systemDesignSections2: Section[] = [
  {
    id: 'load-balancing',
    title: 'Load Balancers',
    description: 'Distributing traffic across multiple servers',
    icon: Shuffle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    topics: [
      {
        id: 'lb-basics',
        name: 'Load Balancer Fundamentals',
        description: 'Understanding how load balancers work',
        icon: Shuffle,
        color: 'text-orange-400',
        subtopics: [
          { id: 'l4-lb', name: 'Layer 4 Load Balancing', description: 'Operates at transport layer. Routes based on IP and port. Fast but limited intelligence.' },
          { id: 'l7-lb', name: 'Layer 7 Load Balancing', description: 'Operates at application layer. Can route based on content, headers, cookies. More flexible.' },
          { id: 'lb-vs-proxy', name: 'LB vs Reverse Proxy', description: 'Load balancer distributes traffic. Reverse proxy can also cache, compress, and terminate SSL.' }
        ]
      },
      {
        id: 'lb-algorithms',
        name: 'Load Balancing Algorithms',
        description: 'Different strategies for distributing requests',
        icon: Settings,
        color: 'text-orange-400',
        subtopics: [
          { id: 'round-robin', name: 'Round Robin', description: 'Requests distributed sequentially. Simple but ignores server capacity.' },
          { id: 'weighted-rr', name: 'Weighted Round Robin', description: 'Servers with higher capacity get more requests.' },
          { id: 'least-conn', name: 'Least Connections', description: 'Routes to server with fewest active connections.' },
          { id: 'ip-hash', name: 'IP Hash', description: 'Routes based on client IP. Ensures session persistence.' },
          { id: 'random', name: 'Random', description: 'Randomly selects a server. Simple and effective for homogeneous servers.' }
        ]
      },
      {
        id: 'horizontal-scaling',
        name: 'Horizontal Scaling',
        description: 'Adding more machines to handle load',
        icon: Layers,
        color: 'text-orange-400',
        subtopics: [
          { id: 'scale-out', name: 'Scale Out vs Scale Up', description: 'Horizontal (more machines) vs Vertical (bigger machine). Horizontal is more resilient.' },
          { id: 'stateless', name: 'Stateless Services', description: 'Services should be stateless for easy horizontal scaling. Store state externally.' },
          { id: 'auto-scaling', name: 'Auto Scaling', description: 'Automatically add/remove instances based on load. Cost-effective and responsive.' }
        ]
      }
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Storing and managing data at scale',
    icon: Database,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    topics: [
      {
        id: 'sql-vs-nosql',
        name: 'SQL vs NoSQL',
        description: 'Choosing the right database type',
        icon: Database,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'sql-db', name: 'SQL Databases', description: 'Relational, ACID compliant, structured schema. PostgreSQL, MySQL, Oracle.' },
          { id: 'nosql-types', name: 'NoSQL Types', description: 'Key-Value (Redis), Document (MongoDB), Wide-Column (Cassandra), Graph (Neo4j).' },
          { id: 'when-sql', name: 'When to Use SQL', description: 'Complex queries, transactions, data integrity, structured data.' },
          { id: 'when-nosql', name: 'When to Use NoSQL', description: 'High scalability, flexible schema, high write throughput, unstructured data.' }
        ]
      },
      {
        id: 'db-scaling',
        name: 'Database Scaling Techniques',
        description: 'Strategies for scaling database systems',
        icon: Layers,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'replication-db', name: 'Replication', description: 'Master-slave or master-master. Improves read performance and availability.' },
          { id: 'sharding', name: 'Sharding', description: 'Horizontal partitioning across multiple databases. Enables massive scale.' },
          { id: 'federation', name: 'Federation', description: 'Split databases by function. Each service owns its data.' },
          { id: 'denormalization', name: 'Denormalization', description: 'Add redundant data to avoid joins. Trade storage for read performance.' }
        ]
      },
      {
        id: 'db-indexing',
        name: 'Database Indexing',
        description: 'Optimizing query performance',
        icon: Filter,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'btree-index', name: 'B-Tree Index', description: 'Default index type. Good for range queries and equality.' },
          { id: 'hash-index', name: 'Hash Index', description: 'Fast for equality lookups. Not suitable for range queries.' },
          { id: 'composite-index', name: 'Composite Index', description: 'Index on multiple columns. Order matters for query optimization.' },
          { id: 'index-tradeoffs', name: 'Index Trade-offs', description: 'Faster reads but slower writes. More storage. Choose wisely.' }
        ]
      },
      {
        id: 'rdbms-concepts',
        name: 'RDBMS Concepts',
        description: 'Core relational database concepts',
        icon: HardDrive,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'acid', name: 'ACID Properties', description: 'Atomicity, Consistency, Isolation, Durability. Guarantees for transactions.' },
          { id: 'normalization', name: 'Normalization', description: 'Organizing data to reduce redundancy. 1NF, 2NF, 3NF, BCNF.' },
          { id: 'sql-tuning', name: 'SQL Tuning', description: 'Query optimization, execution plans, avoiding N+1 queries.' },
          { id: 'transactions', name: 'Transactions', description: 'Group of operations that succeed or fail together. Isolation levels matter.' }
        ]
      }
    ]
  },
  {
    id: 'caching',
    title: 'Caching',
    description: 'Improving performance by storing frequently accessed data',
    icon: Cpu,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    topics: [
      {
        id: 'cache-strategies',
        name: 'Caching Strategies',
        description: 'Different approaches to caching data',
        icon: Cpu,
        color: 'text-red-400',
        subtopics: [
          { id: 'cache-aside', name: 'Cache-Aside (Lazy Loading)', description: 'App checks cache first, loads from DB on miss. Most common pattern.' },
          { id: 'read-through', name: 'Read-Through', description: 'Cache sits between app and DB. Cache handles loading on miss.' },
          { id: 'write-through', name: 'Write-Through', description: 'Writes go to cache and DB synchronously. Consistent but slower writes.' },
          { id: 'write-behind', name: 'Write-Behind (Write-Back)', description: 'Writes go to cache, async to DB. Fast writes but risk of data loss.' },
          { id: 'refresh-ahead', name: 'Refresh-Ahead', description: 'Proactively refresh cache before expiry. Reduces cache misses.' }
        ]
      },
      {
        id: 'cache-levels',
        name: 'Caching Levels',
        description: 'Where caching can be applied',
        icon: Layers,
        color: 'text-red-400',
        subtopics: [
          { id: 'client-cache', name: 'Client Caching', description: 'Browser cache, mobile app cache. Closest to user, fastest.' },
          { id: 'cdn-cache', name: 'CDN Caching', description: 'Edge servers cache static content. Reduces origin load.' },
          { id: 'web-server-cache', name: 'Web Server Caching', description: 'Reverse proxy cache (Nginx, Varnish). Caches responses.' },
          { id: 'app-cache', name: 'Application Caching', description: 'In-memory cache (Redis, Memcached). Caches computed results.' },
          { id: 'db-cache', name: 'Database Caching', description: 'Query cache, buffer pool. Built into database systems.' }
        ]
      },
      {
        id: 'cache-eviction',
        name: 'Cache Eviction Policies',
        description: 'Deciding what to remove when cache is full',
        icon: AlertTriangle,
        color: 'text-red-400',
        subtopics: [
          { id: 'lru', name: 'LRU (Least Recently Used)', description: 'Evict items not accessed recently. Most common policy.' },
          { id: 'lfu', name: 'LFU (Least Frequently Used)', description: 'Evict items accessed least often. Good for stable access patterns.' },
          { id: 'fifo', name: 'FIFO (First In First Out)', description: 'Evict oldest items. Simple but may evict popular items.' },
          { id: 'ttl', name: 'TTL (Time To Live)', description: 'Items expire after set time. Ensures freshness.' }
        ]
      }
    ]
  }
];


// More sections for async, microservices, monitoring, etc.
const systemDesignSections3: Section[] = [
  {
    id: 'asynchronism',
    title: 'Asynchronism',
    description: 'Handling operations that dont need immediate response',
    icon: Clock,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    topics: [
      {
        id: 'message-queues',
        name: 'Message Queues',
        description: 'Decoupling producers and consumers',
        icon: Box,
        color: 'text-indigo-400',
        subtopics: [
          { id: 'mq-basics', name: 'How Message Queues Work', description: 'Producers send messages to queue, consumers process them. Decouples services.' },
          { id: 'mq-benefits', name: 'Benefits', description: 'Async processing, load leveling, fault tolerance, scalability.' },
          { id: 'mq-tools', name: 'Popular Tools', description: 'RabbitMQ, Apache Kafka, Amazon SQS, Redis Pub/Sub.' }
        ]
      },
      {
        id: 'task-queues',
        name: 'Task Queues',
        description: 'Managing background job processing',
        icon: Workflow,
        color: 'text-indigo-400',
        subtopics: [
          { id: 'task-basics', name: 'Task Queue Basics', description: 'Queue tasks for async execution. Workers process tasks independently.' },
          { id: 'task-patterns', name: 'Common Patterns', description: 'Delayed tasks, scheduled tasks, priority queues, dead letter queues.' },
          { id: 'task-tools', name: 'Popular Tools', description: 'Celery, Sidekiq, Bull, AWS Step Functions.' }
        ]
      },
      {
        id: 'back-pressure',
        name: 'Back Pressure',
        description: 'Handling overload gracefully',
        icon: AlertTriangle,
        color: 'text-indigo-400',
        subtopics: [
          { id: 'bp-concept', name: 'What is Back Pressure', description: 'When consumers cant keep up with producers. System must handle gracefully.' },
          { id: 'bp-strategies', name: 'Handling Strategies', description: 'Drop messages, buffer, slow down producers, scale consumers.' }
        ]
      }
    ]
  },
  {
    id: 'microservices',
    title: 'Application Layer & Microservices',
    description: 'Designing the application architecture',
    icon: Boxes,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    topics: [
      {
        id: 'service-discovery',
        name: 'Service Discovery',
        description: 'How services find each other',
        icon: Eye,
        color: 'text-pink-400',
        subtopics: [
          { id: 'sd-client', name: 'Client-Side Discovery', description: 'Client queries registry and load balances. More control, more complexity.' },
          { id: 'sd-server', name: 'Server-Side Discovery', description: 'Load balancer queries registry. Simpler client, single point of failure.' },
          { id: 'sd-tools', name: 'Tools', description: 'Consul, etcd, ZooKeeper, Kubernetes DNS.' }
        ]
      },
      {
        id: 'api-gateway',
        name: 'API Gateway',
        description: 'Single entry point for all clients',
        icon: Server,
        color: 'text-pink-400',
        subtopics: [
          { id: 'gateway-functions', name: 'Gateway Functions', description: 'Routing, authentication, rate limiting, caching, request transformation.' },
          { id: 'gateway-patterns', name: 'Gateway Patterns', description: 'BFF (Backend for Frontend), aggregation, protocol translation.' },
          { id: 'gateway-tools', name: 'Popular Tools', description: 'Kong, AWS API Gateway, Nginx, Envoy.' }
        ]
      },
      {
        id: 'microservices-patterns',
        name: 'Microservices Patterns',
        description: 'Common patterns for microservices architecture',
        icon: GitBranch,
        color: 'text-pink-400',
        subtopics: [
          { id: 'saga', name: 'Saga Pattern', description: 'Manage distributed transactions through a sequence of local transactions.' },
          { id: 'cqrs', name: 'CQRS', description: 'Separate read and write models. Optimize each independently.' },
          { id: 'event-sourcing', name: 'Event Sourcing', description: 'Store state changes as events. Full audit trail, temporal queries.' },
          { id: 'circuit-breaker', name: 'Circuit Breaker', description: 'Prevent cascade failures. Fail fast when downstream is unhealthy.' }
        ]
      }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    description: 'Understanding what your system is doing',
    icon: Activity,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    topics: [
      {
        id: 'monitoring-types',
        name: 'Types of Monitoring',
        description: 'Different aspects to monitor',
        icon: Eye,
        color: 'text-teal-400',
        subtopics: [
          { id: 'health-monitoring', name: 'Health Monitoring', description: 'Is the service up? Health checks, heartbeats, liveness probes.' },
          { id: 'availability-monitoring', name: 'Availability Monitoring', description: 'Is the service accessible? Uptime tracking, SLA monitoring.' },
          { id: 'performance-monitoring', name: 'Performance Monitoring', description: 'How fast is it? Latency, throughput, error rates.' },
          { id: 'security-monitoring', name: 'Security Monitoring', description: 'Is it secure? Intrusion detection, audit logs, anomaly detection.' }
        ]
      },
      {
        id: 'observability-pillars',
        name: 'Three Pillars of Observability',
        description: 'Logs, Metrics, and Traces',
        icon: BarChart3,
        color: 'text-teal-400',
        subtopics: [
          { id: 'logs', name: 'Logs', description: 'Discrete events with context. ELK Stack, Splunk, CloudWatch Logs.' },
          { id: 'metrics', name: 'Metrics', description: 'Numeric measurements over time. Prometheus, Grafana, DataDog.' },
          { id: 'traces', name: 'Distributed Tracing', description: 'Follow requests across services. Jaeger, Zipkin, AWS X-Ray.' }
        ]
      },
      {
        id: 'alerting',
        name: 'Alerting & Visualization',
        description: 'Getting notified and understanding data',
        icon: AlertTriangle,
        color: 'text-teal-400',
        subtopics: [
          { id: 'alert-design', name: 'Alert Design', description: 'Alert on symptoms not causes. Avoid alert fatigue. Actionable alerts.' },
          { id: 'dashboards', name: 'Dashboards', description: 'Visualize key metrics. RED method (Rate, Errors, Duration).' },
          { id: 'instrumentation', name: 'Instrumentation', description: 'Add observability to code. OpenTelemetry, StatsD.' }
        ]
      }
    ]
  }
];


// Security and Design Patterns sections
const systemDesignSections4: Section[] = [
  {
    id: 'security',
    title: 'Security',
    description: 'Protecting your system from threats',
    icon: Lock,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    topics: [
      {
        id: 'auth',
        name: 'Authentication & Authorization',
        description: 'Verifying identity and permissions',
        icon: Lock,
        color: 'text-rose-400',
        subtopics: [
          { id: 'authn', name: 'Authentication', description: 'Who are you? Passwords, MFA, biometrics, SSO.' },
          { id: 'authz', name: 'Authorization', description: 'What can you do? RBAC, ABAC, ACLs.' },
          { id: 'oauth', name: 'OAuth 2.0 / OIDC', description: 'Delegated authorization. Access tokens, refresh tokens, scopes.' },
          { id: 'jwt', name: 'JWT Tokens', description: 'Self-contained tokens. Stateless auth, but cant revoke easily.' }
        ]
      },
      {
        id: 'security-patterns',
        name: 'Security Patterns',
        description: 'Common security implementations',
        icon: Shield,
        color: 'text-rose-400',
        subtopics: [
          { id: 'federated-identity', name: 'Federated Identity', description: 'Single identity across systems. SAML, OIDC.' },
          { id: 'gatekeeper', name: 'Gatekeeper Pattern', description: 'Validate requests at entry point. API Gateway security.' },
          { id: 'valet-key', name: 'Valet Key Pattern', description: 'Limited access tokens for specific resources. Pre-signed URLs.' }
        ]
      },
      {
        id: 'resilience-patterns',
        name: 'Resilience Patterns',
        description: 'Building fault-tolerant systems',
        icon: Shield,
        color: 'text-rose-400',
        subtopics: [
          { id: 'bulkhead', name: 'Bulkhead Pattern', description: 'Isolate failures. Separate thread pools, connection pools.' },
          { id: 'circuit-breaker-sec', name: 'Circuit Breaker', description: 'Stop calling failing services. Fail fast, recover gracefully.' },
          { id: 'retry', name: 'Retry with Backoff', description: 'Retry failed operations with exponential backoff and jitter.' },
          { id: 'timeout', name: 'Timeouts', description: 'Dont wait forever. Set appropriate timeouts for all calls.' }
        ]
      }
    ]
  },
  {
    id: 'design-patterns',
    title: 'Cloud Design Patterns',
    description: 'Proven solutions for common cloud challenges',
    icon: Cloud,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    topics: [
      {
        id: 'data-management',
        name: 'Data Management Patterns',
        description: 'Patterns for handling data in distributed systems',
        icon: Database,
        color: 'text-sky-400',
        subtopics: [
          { id: 'sharding-pattern', name: 'Sharding', description: 'Partition data across databases. Scale horizontally.' },
          { id: 'static-content', name: 'Static Content Hosting', description: 'Serve static files from CDN or blob storage.' },
          { id: 'materialized-view', name: 'Materialized View', description: 'Pre-computed views for complex queries. Trade storage for speed.' },
          { id: 'index-table', name: 'Index Table', description: 'Secondary indexes for non-primary key queries.' },
          { id: 'event-sourcing-dm', name: 'Event Sourcing', description: 'Store events, not state. Rebuild state from events.' },
          { id: 'cqrs-dm', name: 'CQRS', description: 'Separate read and write models for optimization.' },
          { id: 'cache-aside-dm', name: 'Cache-Aside', description: 'Load data into cache on demand.' }
        ]
      },
      {
        id: 'messaging-patterns',
        name: 'Messaging Patterns',
        description: 'Patterns for async communication',
        icon: ArrowRightLeft,
        color: 'text-sky-400',
        subtopics: [
          { id: 'sequential-convoy', name: 'Sequential Convoy', description: 'Process messages in order. Maintain sequence.' },
          { id: 'scheduler-agent', name: 'Scheduler Agent Supervisor', description: 'Coordinate distributed actions with recovery.' },
          { id: 'queue-load-leveling', name: 'Queue-Based Load Leveling', description: 'Buffer requests to smooth traffic spikes.' },
          { id: 'pub-sub', name: 'Publisher/Subscriber', description: 'Broadcast messages to multiple consumers.' },
          { id: 'priority-queue', name: 'Priority Queue', description: 'Process high-priority messages first.' },
          { id: 'pipes-filters', name: 'Pipes and Filters', description: 'Chain processing steps. Each filter transforms data.' },
          { id: 'competing-consumers', name: 'Competing Consumers', description: 'Multiple consumers process from same queue.' },
          { id: 'choreography', name: 'Choreography', description: 'Services coordinate through events, no central orchestrator.' },
          { id: 'claim-check', name: 'Claim Check', description: 'Store large payloads separately, pass reference.' },
          { id: 'async-request-reply', name: 'Async Request-Reply', description: 'Request returns immediately, poll for result.' }
        ]
      },
      {
        id: 'design-implementation',
        name: 'Design & Implementation Patterns',
        description: 'Patterns for building robust systems',
        icon: Code,
        color: 'text-sky-400',
        subtopics: [
          { id: 'strangler-fig', name: 'Strangler Fig', description: 'Gradually replace legacy system. Route traffic incrementally.' },
          { id: 'sidecar', name: 'Sidecar', description: 'Deploy helper components alongside main service.' },
          { id: 'leader-election', name: 'Leader Election', description: 'Elect one instance to coordinate. Consensus algorithms.' },
          { id: 'ambassador', name: 'Ambassador', description: 'Proxy for outbound connections. Handle retries, circuit breaking.' },
          { id: 'anti-corruption', name: 'Anti-Corruption Layer', description: 'Translate between different domain models.' },
          { id: 'backends-frontend', name: 'Backends for Frontends', description: 'Separate backends for different client types.' },
          { id: 'compute-consolidation', name: 'Compute Resource Consolidation', description: 'Combine multiple tasks in single compute unit.' },
          { id: 'external-config', name: 'External Configuration Store', description: 'Centralize configuration. Feature flags, secrets.' },
          { id: 'gateway-aggregation', name: 'Gateway Aggregation', description: 'Combine multiple backend calls into one.' },
          { id: 'gateway-offloading', name: 'Gateway Offloading', description: 'Move cross-cutting concerns to gateway.' },
          { id: 'gateway-routing', name: 'Gateway Routing', description: 'Route requests to appropriate backend.' }
        ]
      }
    ]
  }
];

// Combine all sections
const allSections = [...systemDesignSections, ...systemDesignSections2, ...systemDesignSections3, ...systemDesignSections4];


// Interactive Topic Detail Modal
const TopicDetailModal: React.FC<{
  topic: Topic | null;
  onClose: () => void;
}> = ({ topic, onClose }) => {
  if (!topic) return null;
  
  const Icon = topic.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${topic.color}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{topic.name}</h3>
              <p className="text-sm text-zinc-400">{topic.description}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {topic.subtopics.map((subtopic, index) => (
              <motion.div
                key={subtopic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{subtopic.name}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{subtopic.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Interactive Node Component for the visual roadmap
const RoadmapNode: React.FC<{
  topic: Topic;
  onClick: () => void;
  delay: number;
}> = ({ topic, onClick, delay }) => {
  const Icon = topic.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      <div className={`
        px-4 py-3 rounded-xl border transition-all duration-300
        ${isHovered 
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20' 
          : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'}
      `}>
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${topic.color} transition-transform ${isHovered ? 'scale-110' : ''}`} />
          <span className="text-sm font-medium text-white whitespace-nowrap">{topic.name}</span>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 pt-2 border-t border-zinc-700/50"
            >
              <p className="text-xs text-zinc-400">{topic.subtopics.length} concepts</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Pulse animation on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded-xl border-2 border-purple-500/50 pointer-events-none"
        />
      )}
    </motion.div>
  );
};

// Section Card Component
const SectionCard: React.FC<{
  section: Section;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onTopicClick: (topic: Topic) => void;
}> = ({ section, index, isExpanded, onToggle, onTopicClick }) => {
  const Icon = section.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative"
    >
      {index < allSections.length - 1 && (
        <div className="absolute left-8 top-full w-0.5 h-8 bg-gradient-to-b from-zinc-700 to-transparent z-0" />
      )}
      
      <div className={`${section.bgColor} border ${section.borderColor} rounded-2xl overflow-hidden transition-all`}>
        <button
          onClick={onToggle}
          className="w-full p-6 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
        >
          <motion.div 
            className={`w-14 h-14 ${section.bgColor} border ${section.borderColor} rounded-xl flex items-center justify-center`}
            whileHover={{ rotate: 5 }}
          >
            <Icon className={`w-7 h-7 ${section.color}`} />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs text-zinc-500 font-mono">SECTION {index + 1}</span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs text-zinc-500">{section.topics.length} topics</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{section.title}</h3>
            <p className="text-sm text-zinc-400">{section.description}</p>
          </div>
          
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-6 h-6 text-zinc-400" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.topics.map((topic, topicIndex) => (
                    <RoadmapNode
                      key={topic.id}
                      topic={topic}
                      onClick={() => onTopicClick(topic)}
                      delay={topicIndex * 0.05}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};


// Interactive Architecture Diagram Component
const ArchitectureDiagram: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  
  const components = [
    { id: 'client', name: 'Client', x: 50, y: 50, icon: Globe, color: 'text-cyan-400', desc: 'Web/Mobile apps making requests' },
    { id: 'cdn', name: 'CDN', x: 200, y: 50, icon: Cloud, color: 'text-purple-400', desc: 'Cache static content at edge' },
    { id: 'lb', name: 'Load Balancer', x: 350, y: 50, icon: Shuffle, color: 'text-yellow-400', desc: 'Distribute traffic across servers' },
    { id: 'api', name: 'API Gateway', x: 500, y: 50, icon: Server, color: 'text-pink-400', desc: 'Route, auth, rate limit' },
    { id: 'service1', name: 'Service A', x: 400, y: 150, icon: Boxes, color: 'text-green-400', desc: 'Microservice handling domain A' },
    { id: 'service2', name: 'Service B', x: 600, y: 150, icon: Boxes, color: 'text-green-400', desc: 'Microservice handling domain B' },
    { id: 'cache', name: 'Cache', x: 350, y: 250, icon: Cpu, color: 'text-red-400', desc: 'Redis/Memcached for fast reads' },
    { id: 'queue', name: 'Message Queue', x: 500, y: 250, icon: Box, color: 'text-indigo-400', desc: 'Async communication between services' },
    { id: 'db', name: 'Database', x: 650, y: 250, icon: Database, color: 'text-emerald-400', desc: 'Primary data store' },
  ];
  
  return (
    <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 overflow-hidden">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Network className="w-5 h-5 text-purple-400" />
        Interactive Architecture Overview
      </h3>
      <p className="text-sm text-zinc-400 mb-6">Hover over components to learn more</p>
      
      <div className="relative h-80">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Client -> CDN */}
          <motion.line x1="100" y1="70" x2="180" y2="70" stroke="url(#lineGradient)" strokeWidth="2" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
          {/* CDN -> LB */}
          <motion.line x1="260" y1="70" x2="330" y2="70" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} />
          {/* LB -> API */}
          <motion.line x1="410" y1="70" x2="480" y2="70" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} />
          {/* API -> Services */}
          <motion.line x1="520" y1="90" x2="450" y2="140" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.1 }} />
          <motion.line x1="540" y1="90" x2="600" y2="140" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.1 }} />
          {/* Services -> Cache/Queue/DB */}
          <motion.line x1="420" y1="180" x2="380" y2="240" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.3 }} />
          <motion.line x1="450" y1="180" x2="500" y2="240" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.3 }} />
          <motion.line x1="620" y1="180" x2="650" y2="240" stroke="url(#lineGradient)" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.3 }} />
        </svg>
        
        {/* Components */}
        {components.map((comp, index) => {
          const Icon = comp.icon;
          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="absolute"
              style={{ left: comp.x, top: comp.y }}
              onMouseEnter={() => setActiveComponent(comp.id)}
              onMouseLeave={() => setActiveComponent(null)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  w-16 h-16 rounded-xl border flex items-center justify-center cursor-pointer transition-all
                  ${activeComponent === comp.id 
                    ? 'bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                    : 'bg-zinc-800/80 border-zinc-700/50'}
                `}
              >
                <Icon className={`w-6 h-6 ${comp.color}`} />
              </motion.div>
              <p className="text-xs text-center text-zinc-400 mt-1 whitespace-nowrap">{comp.name}</p>
              
              {/* Tooltip */}
              <AnimatePresence>
                {activeComponent === comp.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg z-10 whitespace-nowrap"
                  >
                    <p className="text-xs text-white">{comp.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Progress Tracker Component
const ProgressTracker: React.FC = () => {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  
  const totalTopics = allSections.reduce((acc, section) => acc + section.topics.length, 0);
  const totalSubtopics = allSections.reduce((acc, section) => 
    acc + section.topics.reduce((topicAcc, topic) => topicAcc + topic.subtopics.length, 0), 0
  );
  const progress = (completedTopics.size / totalTopics) * 100;
  
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Your Progress</h3>
        <span className="text-sm text-zinc-400">{completedTopics.size}/{totalTopics} topics</span>
      </div>
      
      <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {allSections.length}
          </div>
          <div className="text-xs text-zinc-500">Sections</div>
        </div>
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {totalTopics}
          </div>
          <div className="text-xs text-zinc-500">Topics</div>
        </div>
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {totalSubtopics}
          </div>
          <div className="text-xs text-zinc-500">Concepts</div>
        </div>
      </div>
    </div>
  );
};


// Main System Design Page Component
const SystemDesign: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction']);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const filteredSections = searchQuery 
    ? allSections.map(section => ({
        ...section,
        topics: section.topics.filter(topic => 
          topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.subtopics.some(st => st.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      })).filter(section => section.topics.length > 0)
    : allSections;

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
            <Link to="/roadmap" className="text-zinc-400 hover:text-white transition-colors text-sm">
              DSA Roadmap
            </Link>
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-6"
            >
              <Server className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-300">Complete Learning Path</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">System Design </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Mastery
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
              A comprehensive roadmap to master system design from fundamentals to advanced patterns.
              Build scalable, reliable, and maintainable distributed systems.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <Eye className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {allSections.slice(0, 6).map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setExpandedSections([section.id]);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 ${section.bgColor} border ${section.borderColor} rounded-full hover:bg-white/10 transition-colors`}
                  >
                    <Icon className={`w-3 h-3 ${section.color}`} />
                    <span className="text-xs text-zinc-300">{section.title.split(' ')[0]}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Stats & Architecture */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <ProgressTracker />
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* Roadmap Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredSections.map((section, index) => (
            <div key={section.id} id={section.id}>
              <SectionCard
                section={section}
                index={index}
                isExpanded={expandedSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
                onTopicClick={setSelectedTopic}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <TopicDetailModal
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto text-center text-zinc-600 text-sm">
          © 2024 CodeX Platform. Built for developers, by developers.
        </div>
      </footer>
    </div>
  );
};

export default SystemDesign;
