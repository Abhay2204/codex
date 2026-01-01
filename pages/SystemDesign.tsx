import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ChevronRight, ArrowLeft, Server, Database, Globe, Shield,
  Cloud, Layers, Network, Activity, Lock, RefreshCw, HardDrive, Cpu, Code,
  GitBranch, Box, Workflow, BarChart3, AlertTriangle, Clock,
  Gauge, Eye, Settings, Boxes, ArrowRightLeft, Filter, Shuffle
} from 'lucide-react';

// Types
interface SubTopic {
  id: string;
  name: string;
  description: string;
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

// System Design Roadmap Data
const allSections: Section[] = [
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
          { id: 'sd-definition', name: 'Definition & Scope', description: 'System design is the process of defining architecture, components, modules, interfaces, and data flow.' },
          { id: 'sd-importance', name: 'Why It Matters', description: 'Critical for building scalable, reliable systems that handle millions of users.' },
          { id: 'sd-interviews', name: 'Interview Perspective', description: 'Key skill evaluated in senior engineering interviews at top tech companies.' }
        ]
      },
      {
        id: 'approach-sd',
        name: 'How to Approach System Design',
        description: 'A structured methodology for tackling design problems',
        icon: Workflow,
        color: 'text-cyan-400',
        subtopics: [
          { id: 'requirements', name: 'Gather Requirements', description: 'Clarify functional and non-functional requirements.' },
          { id: 'estimation', name: 'Back-of-envelope Estimation', description: 'Calculate storage, bandwidth, and compute requirements.' },
          { id: 'high-level', name: 'High-Level Design', description: 'Draw main components and their interactions.' },
          { id: 'deep-dive', name: 'Deep Dive', description: 'Explore specific components and trade-offs.' },
          { id: 'bottlenecks', name: 'Identify Bottlenecks', description: 'Find single points of failure.' }
        ]
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Scalability',
    description: 'Build systems that handle growth and maintain speed',
    icon: Gauge,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    topics: [
      {
        id: 'perf-vs-scale',
        name: 'Performance vs Scalability',
        description: 'Understanding the difference between these concepts',
        icon: Gauge,
        color: 'text-yellow-400',
        subtopics: [
          { id: 'performance-def', name: 'Performance', description: 'How fast a single request is processed. Measured in latency.' },
          { id: 'scalability-def', name: 'Scalability', description: 'Ability to handle increased load by adding resources.' },
          { id: 'perf-scale-relation', name: 'Relationship', description: 'Goal is to achieve both high performance and scalability.' }
        ]
      },
      {
        id: 'latency-throughput',
        name: 'Latency vs Throughput',
        description: 'Two critical metrics for system performance',
        icon: Activity,
        color: 'text-yellow-400',
        subtopics: [
          { id: 'latency', name: 'Latency', description: 'Time to complete a single operation. Lower is better.' },
          { id: 'throughput', name: 'Throughput', description: 'Operations completed per unit time. Higher is better.' },
          { id: 'tradeoff', name: 'Trade-offs', description: 'Often inversely related - optimizing one may impact the other.' }
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
        description: 'Different guarantees for data consistency',
        icon: RefreshCw,
        color: 'text-green-400',
        subtopics: [
          { id: 'weak-consistency', name: 'Weak Consistency', description: 'Reads may or may not see recent writes. Used in VoIP.' },
          { id: 'eventual-consistency', name: 'Eventual Consistency', description: 'Reads will eventually see writes. Used in DNS.' },
          { id: 'strong-consistency', name: 'Strong Consistency', description: 'Reads see writes immediately. Used in banking.' }
        ]
      },
      {
        id: 'cap-theorem',
        name: 'CAP Theorem',
        description: 'The fundamental trade-off in distributed systems',
        icon: GitBranch,
        color: 'text-green-400',
        subtopics: [
          { id: 'cap-c', name: 'Consistency (C)', description: 'Every read receives the most recent write.' },
          { id: 'cap-a', name: 'Availability (A)', description: 'Every request receives a response.' },
          { id: 'cap-p', name: 'Partition Tolerance (P)', description: 'System operates despite network partitions.' },
          { id: 'cap-tradeoff', name: 'The Trade-off', description: 'Can only guarantee 2 of 3: CP or AP.' }
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
          { id: 'three-nines', name: '99.9% (Three Nines)', description: '8.76 hours downtime/year.' },
          { id: 'four-nines', name: '99.99% (Four Nines)', description: '52.6 minutes downtime/year.' },
          { id: 'five-nines', name: '99.999% (Five Nines)', description: '5.26 minutes downtime/year.' }
        ]
      },
      {
        id: 'failover-patterns',
        name: 'Failover Patterns',
        description: 'Strategies for handling component failures',
        icon: RefreshCw,
        color: 'text-blue-400',
        subtopics: [
          { id: 'active-passive', name: 'Active-Passive', description: 'Standby server takes over when active fails.' },
          { id: 'active-active', name: 'Active-Active', description: 'Multiple servers handle traffic simultaneously.' },
          { id: 'master-slave', name: 'Master-Slave', description: 'Master handles writes, slaves handle reads.' }
        ]
      },
      {
        id: 'replication',
        name: 'Replication',
        description: 'Copying data across multiple nodes',
        icon: Boxes,
        color: 'text-blue-400',
        subtopics: [
          { id: 'sync-replication', name: 'Synchronous', description: 'Write confirmed after all replicas updated.' },
          { id: 'async-replication', name: 'Asynchronous', description: 'Write confirmed immediately, replicas updated later.' }
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
          { id: 'dns-basics', name: 'How DNS Works', description: 'Translates domain names to IP addresses.' },
          { id: 'dns-records', name: 'DNS Record Types', description: 'A, AAAA, CNAME, MX, NS records.' },
          { id: 'dns-caching', name: 'DNS Caching', description: 'TTL-based caching at multiple levels.' }
        ]
      },
      {
        id: 'cdn',
        name: 'Content Delivery Networks',
        description: 'Distributed network for delivering content globally',
        icon: Cloud,
        color: 'text-purple-400',
        subtopics: [
          { id: 'push-cdn', name: 'Push CDN', description: 'Content pushed when changes occur.' },
          { id: 'pull-cdn', name: 'Pull CDN', description: 'CDN fetches content on first request.' }
        ]
      },
      {
        id: 'protocols',
        name: 'Communication Protocols',
        description: 'Different ways for services to communicate',
        icon: ArrowRightLeft,
        color: 'text-purple-400',
        subtopics: [
          { id: 'http', name: 'HTTP/HTTPS', description: 'Request-response protocol. REST-friendly.' },
          { id: 'tcp-udp', name: 'TCP vs UDP', description: 'TCP: reliable. UDP: fast, no guarantees.' },
          { id: 'websockets', name: 'WebSockets', description: 'Full-duplex communication for real-time apps.' },
          { id: 'grpc', name: 'gRPC', description: 'High-performance RPC using Protocol Buffers.' }
        ]
      }
    ]
  },
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
          { id: 'l4-lb', name: 'Layer 4 Load Balancing', description: 'Routes based on IP and port. Fast.' },
          { id: 'l7-lb', name: 'Layer 7 Load Balancing', description: 'Routes based on content, headers, cookies.' },
          { id: 'lb-vs-proxy', name: 'LB vs Reverse Proxy', description: 'Reverse proxy can also cache and compress.' }
        ]
      },
      {
        id: 'lb-algorithms',
        name: 'Load Balancing Algorithms',
        description: 'Different strategies for distributing requests',
        icon: Settings,
        color: 'text-orange-400',
        subtopics: [
          { id: 'round-robin', name: 'Round Robin', description: 'Requests distributed sequentially.' },
          { id: 'least-conn', name: 'Least Connections', description: 'Routes to server with fewest connections.' },
          { id: 'ip-hash', name: 'IP Hash', description: 'Routes based on client IP for session persistence.' }
        ]
      },
      {
        id: 'horizontal-scaling',
        name: 'Horizontal Scaling',
        description: 'Adding more machines to handle load',
        icon: Layers,
        color: 'text-orange-400',
        subtopics: [
          { id: 'scale-out', name: 'Scale Out vs Scale Up', description: 'Horizontal vs Vertical scaling.' },
          { id: 'stateless', name: 'Stateless Services', description: 'Store state externally for easy scaling.' },
          { id: 'auto-scaling', name: 'Auto Scaling', description: 'Automatically add/remove instances.' }
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
          { id: 'sql-db', name: 'SQL Databases', description: 'Relational, ACID compliant. PostgreSQL, MySQL.' },
          { id: 'nosql-types', name: 'NoSQL Types', description: 'Key-Value, Document, Wide-Column, Graph.' },
          { id: 'when-sql', name: 'When to Use SQL', description: 'Complex queries, transactions, data integrity.' },
          { id: 'when-nosql', name: 'When to Use NoSQL', description: 'High scalability, flexible schema.' }
        ]
      },
      {
        id: 'db-scaling',
        name: 'Database Scaling',
        description: 'Strategies for scaling database systems',
        icon: Layers,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'replication-db', name: 'Replication', description: 'Master-slave for read performance.' },
          { id: 'sharding', name: 'Sharding', description: 'Horizontal partitioning for massive scale.' },
          { id: 'federation', name: 'Federation', description: 'Split databases by function.' }
        ]
      },
      {
        id: 'db-indexing',
        name: 'Database Indexing',
        description: 'Optimizing query performance',
        icon: Filter,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'btree-index', name: 'B-Tree Index', description: 'Good for range queries and equality.' },
          { id: 'hash-index', name: 'Hash Index', description: 'Fast for equality lookups.' },
          { id: 'index-tradeoffs', name: 'Trade-offs', description: 'Faster reads but slower writes.' }
        ]
      },
      {
        id: 'rdbms-concepts',
        name: 'RDBMS Concepts',
        description: 'Core relational database concepts',
        icon: HardDrive,
        color: 'text-emerald-400',
        subtopics: [
          { id: 'acid', name: 'ACID Properties', description: 'Atomicity, Consistency, Isolation, Durability.' },
          { id: 'normalization', name: 'Normalization', description: 'Organizing data to reduce redundancy.' },
          { id: 'transactions', name: 'Transactions', description: 'Operations that succeed or fail together.' }
        ]
      }
    ]
  },
  {
    id: 'caching',
    title: 'Caching',
    description: 'Improving performance with frequently accessed data',
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
          { id: 'cache-aside', name: 'Cache-Aside', description: 'App checks cache first, loads from DB on miss.' },
          { id: 'read-through', name: 'Read-Through', description: 'Cache handles loading on miss.' },
          { id: 'write-through', name: 'Write-Through', description: 'Writes go to cache and DB synchronously.' },
          { id: 'write-behind', name: 'Write-Behind', description: 'Writes go to cache, async to DB.' }
        ]
      },
      {
        id: 'cache-levels',
        name: 'Caching Levels',
        description: 'Where caching can be applied',
        icon: Layers,
        color: 'text-red-400',
        subtopics: [
          { id: 'client-cache', name: 'Client Caching', description: 'Browser cache, mobile app cache.' },
          { id: 'cdn-cache', name: 'CDN Caching', description: 'Edge servers cache static content.' },
          { id: 'app-cache', name: 'Application Caching', description: 'Redis, Memcached for computed results.' }
        ]
      },
      {
        id: 'cache-eviction',
        name: 'Cache Eviction',
        description: 'Deciding what to remove when cache is full',
        icon: AlertTriangle,
        color: 'text-red-400',
        subtopics: [
          { id: 'lru', name: 'LRU', description: 'Evict least recently used items.' },
          { id: 'lfu', name: 'LFU', description: 'Evict least frequently used items.' },
          { id: 'ttl', name: 'TTL', description: 'Items expire after set time.' }
        ]
      }
    ]
  },
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
          { id: 'mq-basics', name: 'How They Work', description: 'Producers send messages, consumers process them.' },
          { id: 'mq-benefits', name: 'Benefits', description: 'Async processing, fault tolerance, scalability.' },
          { id: 'mq-tools', name: 'Tools', description: 'RabbitMQ, Kafka, SQS, Redis Pub/Sub.' }
        ]
      },
      {
        id: 'task-queues',
        name: 'Task Queues',
        description: 'Managing background job processing',
        icon: Workflow,
        color: 'text-indigo-400',
        subtopics: [
          { id: 'task-basics', name: 'Task Queue Basics', description: 'Queue tasks for async execution.' },
          { id: 'task-tools', name: 'Tools', description: 'Celery, Sidekiq, Bull.' }
        ]
      },
      {
        id: 'back-pressure',
        name: 'Back Pressure',
        description: 'Handling overload gracefully',
        icon: AlertTriangle,
        color: 'text-indigo-400',
        subtopics: [
          { id: 'bp-concept', name: 'What is Back Pressure', description: 'When consumers cant keep up with producers.' },
          { id: 'bp-strategies', name: 'Strategies', description: 'Drop messages, buffer, scale consumers.' }
        ]
      }
    ]
  },
  {
    id: 'microservices',
    title: 'Microservices',
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
          { id: 'sd-client', name: 'Client-Side Discovery', description: 'Client queries registry and load balances.' },
          { id: 'sd-server', name: 'Server-Side Discovery', description: 'Load balancer queries registry.' },
          { id: 'sd-tools', name: 'Tools', description: 'Consul, etcd, ZooKeeper, K8s DNS.' }
        ]
      },
      {
        id: 'api-gateway',
        name: 'API Gateway',
        description: 'Single entry point for all clients',
        icon: Server,
        color: 'text-pink-400',
        subtopics: [
          { id: 'gateway-functions', name: 'Functions', description: 'Routing, auth, rate limiting, caching.' },
          { id: 'gateway-tools', name: 'Tools', description: 'Kong, AWS API Gateway, Nginx, Envoy.' }
        ]
      },
      {
        id: 'microservices-patterns',
        name: 'Microservices Patterns',
        description: 'Common patterns for microservices',
        icon: GitBranch,
        color: 'text-pink-400',
        subtopics: [
          { id: 'saga', name: 'Saga Pattern', description: 'Manage distributed transactions.' },
          { id: 'cqrs', name: 'CQRS', description: 'Separate read and write models.' },
          { id: 'event-sourcing', name: 'Event Sourcing', description: 'Store state changes as events.' },
          { id: 'circuit-breaker', name: 'Circuit Breaker', description: 'Prevent cascade failures.' }
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
          { id: 'health-monitoring', name: 'Health Monitoring', description: 'Health checks, heartbeats, liveness probes.' },
          { id: 'performance-monitoring', name: 'Performance', description: 'Latency, throughput, error rates.' },
          { id: 'security-monitoring', name: 'Security', description: 'Intrusion detection, audit logs.' }
        ]
      },
      {
        id: 'observability-pillars',
        name: 'Three Pillars',
        description: 'Logs, Metrics, and Traces',
        icon: BarChart3,
        color: 'text-teal-400',
        subtopics: [
          { id: 'logs', name: 'Logs', description: 'Discrete events. ELK Stack, Splunk.' },
          { id: 'metrics', name: 'Metrics', description: 'Numeric measurements. Prometheus, Grafana.' },
          { id: 'traces', name: 'Traces', description: 'Follow requests across services. Jaeger, Zipkin.' }
        ]
      }
    ]
  },
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
          { id: 'authn', name: 'Authentication', description: 'Who are you? Passwords, MFA, SSO.' },
          { id: 'authz', name: 'Authorization', description: 'What can you do? RBAC, ABAC.' },
          { id: 'oauth', name: 'OAuth 2.0', description: 'Delegated authorization with tokens.' },
          { id: 'jwt', name: 'JWT Tokens', description: 'Self-contained stateless tokens.' }
        ]
      },
      {
        id: 'resilience-patterns',
        name: 'Resilience Patterns',
        description: 'Building fault-tolerant systems',
        icon: Shield,
        color: 'text-rose-400',
        subtopics: [
          { id: 'bulkhead', name: 'Bulkhead', description: 'Isolate failures with separate pools.' },
          { id: 'circuit-breaker-sec', name: 'Circuit Breaker', description: 'Stop calling failing services.' },
          { id: 'retry', name: 'Retry with Backoff', description: 'Retry with exponential backoff.' },
          { id: 'timeout', name: 'Timeouts', description: 'Set appropriate timeouts for all calls.' }
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
        name: 'Data Management',
        description: 'Patterns for handling data',
        icon: Database,
        color: 'text-sky-400',
        subtopics: [
          { id: 'sharding-pattern', name: 'Sharding', description: 'Partition data across databases.' },
          { id: 'static-content', name: 'Static Content Hosting', description: 'Serve static files from CDN.' },
          { id: 'materialized-view', name: 'Materialized View', description: 'Pre-computed views for complex queries.' }
        ]
      },
      {
        id: 'messaging-patterns',
        name: 'Messaging Patterns',
        description: 'Patterns for async communication',
        icon: ArrowRightLeft,
        color: 'text-sky-400',
        subtopics: [
          { id: 'pub-sub', name: 'Publisher/Subscriber', description: 'Broadcast messages to multiple consumers.' },
          { id: 'priority-queue', name: 'Priority Queue', description: 'Process high-priority messages first.' },
          { id: 'competing-consumers', name: 'Competing Consumers', description: 'Multiple consumers process from same queue.' }
        ]
      },
      {
        id: 'design-implementation',
        name: 'Implementation Patterns',
        description: 'Patterns for building robust systems',
        icon: Code,
        color: 'text-sky-400',
        subtopics: [
          { id: 'strangler-fig', name: 'Strangler Fig', description: 'Gradually replace legacy system.' },
          { id: 'sidecar', name: 'Sidecar', description: 'Deploy helper components alongside main service.' },
          { id: 'leader-election', name: 'Leader Election', description: 'Elect one instance to coordinate.' },
          { id: 'ambassador', name: 'Ambassador', description: 'Proxy for outbound connections.' }
        ]
      }
    ]
  }
];


// Topic Detail Modal
const TopicModal: React.FC<{ topic: Topic | null; onClose: () => void }> = ({ topic, onClose }) => {
  if (!topic) return null;
  const Icon = topic.icon;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Icon className={`w-6 h-6 ${topic.color}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{topic.name}</h3>
              <p className="text-sm text-zinc-400">{topic.description}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-3">
            {topic.subtopics.map((subtopic, index) => (
              <div
                key={subtopic.id}
                className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{subtopic.name}</h4>
                    <p className="text-sm text-zinc-400">{subtopic.description}</p>
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  );
};

// Topic Card
const TopicCard: React.FC<{ topic: Topic; onClick: () => void }> = ({ topic, onClick }) => {
  const Icon = topic.icon;
  
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-left hover:border-purple-500/30 hover:bg-zinc-800 transition-all group"
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${topic.color} group-hover:scale-110 transition-transform`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white truncate">{topic.name}</h4>
          <p className="text-xs text-zinc-500 truncate">{topic.subtopics.length} concepts</p>
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 transition-colors" />
      </div>
    </button>
  );
};

// Section Card
const SectionCard: React.FC<{
  section: Section;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onTopicClick: (topic: Topic) => void;
}> = ({ section, index, isExpanded, onToggle, onTopicClick }) => {
  const Icon = section.icon;
  
  return (
    <div className="relative">
      {index < allSections.length - 1 && (
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
          <div className="px-5 pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onClick={() => onTopicClick(topic)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const SystemDesign: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction']);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalTopics = allSections.reduce((acc, s) => acc + s.topics.length, 0);
  const totalConcepts = allSections.reduce((acc, s) => 
    acc + s.topics.reduce((t, topic) => t + topic.subtopics.length, 0), 0
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
            <Link to="/roadmap" className="text-zinc-400 hover:text-white transition-colors text-sm">
              DSA Roadmap
            </Link>
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-6">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-300">Complete Learning Path</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">System Design </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Mastery
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            Master system design from fundamentals to advanced patterns.
            Build scalable, reliable distributed systems.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {allSections.length}
              </div>
              <div className="text-xs text-zinc-500">Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {totalTopics}
              </div>
              <div className="text-xs text-zinc-500">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {totalConcepts}
              </div>
              <div className="text-xs text-zinc-500">Concepts</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center gap-2">
            {allSections.slice(0, 6).map((section) => {
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

      {/* Roadmap */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          {allSections.map((section, index) => (
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

      {/* Modal */}
      {selectedTopic && (
        <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
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

export default SystemDesign;
