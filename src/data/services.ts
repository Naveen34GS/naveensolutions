import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    category: 'development',
    categoryLabel: 'Development',
    shortDescription: 'Tailor-made web applications, enterprise portals, SaaS platforms, and internal business tools.',
    fullDescription: 'We engineer robust, scalable web platforms, high-throughput enterprise portals, and intuitive internal tools built to align directly with your business workflow and scale seamlessly.',
    iconName: 'Code2',
    techTags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    useCases: [
      'Multi-tenant B2B SaaS platforms',
      'Enterprise customer portals',
      'Internal operations & inventory systems',
      'Custom ERP/CRM modules'
    ],
    capabilities: [
      'Modular clean architecture',
      'High-performance relational & NoSQL databases',
      'Role-based access control (RBAC)',
      'Enterprise audit logging & security'
    ],
    indicativeBudget: {
      min: 150000,
      max: 600000,
      currency: 'INR',
      note: 'Based on complexity, module count, and scale'
    },
    indicativeTimelineWeeks: {
      min: 6,
      max: 16
    }
  },
  {
    id: 'frontend-dev',
    name: 'Frontend Development',
    category: 'development',
    categoryLabel: 'Development',
    shortDescription: 'Ultra-fast, accessible, and responsive client-side interfaces built with modern UI frameworks.',
    fullDescription: 'Deliver fluid user experiences with cutting-edge frontend engineering. We specialize in component-driven UI architecture, high performance, cross-browser consistency, and micro-interactions.',
    iconName: 'Layout',
    techTags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'State Management'],
    useCases: [
      'Modern web application re-platforming',
      'Interactive executive analytics dashboards',
      'Responsive customer-facing portals',
      'Design system & component library build'
    ],
    capabilities: [
      'Core Web Vitals optimization',
      'Strict TypeScript typings',
      'WCAG 2.1 AA accessibility standards',
      'State machines & reactive client architectures'
    ],
    indicativeBudget: {
      min: 80000,
      max: 300000,
      currency: 'INR',
      note: 'Scope-dependent (screen count, interaction density)'
    },
    indicativeTimelineWeeks: {
      min: 4,
      max: 10
    }
  },
  {
    id: 'backend-dev',
    name: 'Backend Development & APIs',
    category: 'development',
    categoryLabel: 'Development',
    shortDescription: 'Resilient microservices, REST & GraphQL endpoints, distributed processing, and database designs.',
    fullDescription: 'High-availability backend infrastructures capable of processing high volumes of transactions with sub-second latencies and fault tolerance.',
    iconName: 'Server',
    techTags: ['Node.js', 'Python', 'Java', 'REST APIs', 'GraphQL', 'PostgreSQL', 'Redis'],
    useCases: [
      'High-throughput transaction backends',
      'Unified GraphQL aggregation layers',
      'Asynchronous task processing systems',
      'Secure microservice orchestration'
    ],
    capabilities: [
      'Distributed caching strategies',
      'Idempotent transactional workflows',
      'Automated OpenAPI / Swagger specs',
      'Zero-downtime database migrations'
    ],
    indicativeBudget: {
      min: 100000,
      max: 450000,
      currency: 'INR',
      note: 'Dependent on endpoints, concurrency, and DB schemas'
    },
    indicativeTimelineWeeks: {
      min: 4,
      max: 12
    }
  },
  {
    id: 'mobile-app-dev',
    name: 'Mobile App Development',
    category: 'development',
    categoryLabel: 'Development',
    shortDescription: 'Cross-platform native-feeling mobile applications for iOS and Android with seamless sync.',
    fullDescription: 'Build native-performing cross-platform iOS and Android mobile solutions from a single codebase, integrating offline support, biometrics, notifications, and instant background sync.',
    iconName: 'Smartphone',
    techTags: ['React Native', 'TypeScript', 'Expo', 'Mobile APIs', 'Offline SQLite'],
    useCases: [
      'Customer loyalty & ordering apps',
      'Field inspection & workforce mobile tools',
      'On-the-go workflow approvals',
      'Real-time delivery & tracking apps'
    ],
    capabilities: [
      'Offline-first synchronization',
      'Biometric authentication & push messaging',
      'Hardware camera / GPS integration',
      'Automated TestFlight & Google Play beta pipelines'
    ],
    indicativeBudget: {
      min: 120000,
      max: 500000,
      currency: 'INR',
      note: 'Covers cross-platform iOS + Android build'
    },
    indicativeTimelineWeeks: {
      min: 6,
      max: 14
    }
  },
  {
    id: 'api-integration',
    name: 'API & Tool Integration',
    category: 'integration',
    categoryLabel: 'Integration',
    shortDescription: 'Interconnect CRM, ERP, payment gateways, webhooks, and third-party SaaS platforms cleanly.',
    fullDescription: 'Eliminate data silos by interconnecting existing software platforms with bidirectional sync, webhook listeners, OAuth 2.0 security, and automated queue-backed data pipelines.',
    iconName: 'Network',
    techTags: ['REST', 'GraphQL', 'Webhooks', 'OAuth 2.0', 'Salesforce API', 'Stripe', 'HubSpot'],
    useCases: [
      'CRM & Accounting synchronization (e.g. Salesforce to QuickBooks)',
      'Payment gateway multi-currency settlement flows',
      'E-commerce order sync to warehouse ERP',
      'Webhook notification bus with automated retries'
    ],
    capabilities: [
      'Rate-limiting & automated backoff retries',
      'Payload schema translation & validation',
      'Encrypted credential & token management',
      'Dead-letter queues for failed deliveries'
    ],
    indicativeBudget: {
      min: 50000,
      max: 200000,
      currency: 'INR',
      note: 'Based on number of external endpoints and sync frequency'
    },
    indicativeTimelineWeeks: {
      min: 2,
      max: 6
    }
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & Cloud Engineering',
    category: 'cloud-devops',
    categoryLabel: 'Cloud & DevOps',
    shortDescription: 'Automated CI/CD pipelines, containerization, cloud infrastructure as code (IaC), and monitoring.',
    fullDescription: 'Modernize infrastructure with automated deployments, infrastructure-as-code, high-availability cluster setups, and automated incident alerting on AWS and Azure.',
    iconName: 'Cloud',
    techTags: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'GitHub Actions', 'Datadog'],
    useCases: [
      'Multi-environment CI/CD pipeline automation',
      'Legacy server migration to AWS containerized ECS/EKS',
      'Auto-scaling web clusters with load balancers',
      'Zero-downtime blue/green deployment setup'
    ],
    capabilities: [
      'Infrastructure as Code (Terraform)',
      'Security hardening & SOC2 compliance prep',
      'Centralized telemetry & APM logging',
      'Disaster recovery & automatic snapshot backups'
    ],
    indicativeBudget: {
      min: 75000,
      max: 350000,
      currency: 'INR',
      note: 'Includes setup scripts, documentation, and handover'
    },
    indicativeTimelineWeeks: {
      min: 3,
      max: 8
    }
  },
  {
    id: 'ai-automation',
    name: 'AI & Intelligent Automation',
    category: 'ai-automation',
    categoryLabel: 'AI & Automation',
    shortDescription: 'LLM agents, automated document extraction, intelligent workflows, and custom NLP solutions.',
    fullDescription: 'Supercharge business productivity with practical enterprise AI: Retrieval-Augmented Generation (RAG) knowledge bots, invoice OCR data extractors, and automated ticket classification.',
    iconName: 'Cpu',
    techTags: ['LLM APIs', 'OpenAI', 'Anthropic Claude', 'Python', 'LangChain', 'Vector DBs', 'FastAPI'],
    useCases: [
      'Internal knowledge base semantic search & assistant',
      'Document & invoice data parsing and validation',
      'Customer support auto-categorization & triage',
      'Intelligent batch email summarization & task creation'
    ],
    capabilities: [
      'Domain-specific RAG embedding pipelines',
      'Strict hallucination guardrails & evaluation runs',
      'PII sanitization & enterprise data isolation',
      'Hybrid fallback to human operator workflows'
    ],
    indicativeBudget: {
      min: 100000,
      max: 450000,
      currency: 'INR',
      note: 'Depends on data volume, LLM architecture, and integration points'
    },
    indicativeTimelineWeeks: {
      min: 4,
      max: 10
    }
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering & Analytics',
    category: 'data-qa',
    categoryLabel: 'Data & QA',
    shortDescription: 'Reliable ETL/ELT data pipelines, schema modeling, warehousing, and real-time analytical dashboards.',
    fullDescription: 'Turn fragmented operational data into clean, actionable business intelligence with robust scheduled data transformations, analytics warehouses, and executive dashboards.',
    iconName: 'Database',
    techTags: ['PostgreSQL', 'Snowflake', 'BigQuery', 'dbt', 'Python', 'PowerBI', 'Metabase'],
    useCases: [
      'Consolidating multi-branch sales data into centralized warehouse',
      'Automated daily executive KPI reporting boards',
      'Near real-time inventory aggregation pipeline',
      'Customer behavioral event tracking architecture'
    ],
    capabilities: [
      'Incremental data sync pipelines',
      'Data modeling and dimensional star-schemas',
      'Automated anomaly & data drift alerting',
      'Optimized aggregation materialized views'
    ],
    indicativeBudget: {
      min: 90000,
      max: 380000,
      currency: 'INR',
      note: 'Volume and connector count dependent'
    },
    indicativeTimelineWeeks: {
      min: 4,
      max: 9
    }
  },
  {
    id: 'qa-automation',
    name: 'QA & Test Automation',
    category: 'data-qa',
    categoryLabel: 'Data & QA',
    shortDescription: 'Comprehensive end-to-end testing suites, API contract testing, and regression pipelines.',
    fullDescription: 'Shield your web platforms against regressions with automated Playwright/Cypress end-to-end suites, Postman API collections, and CI load-testing workflows.',
    iconName: 'CheckCircle2',
    techTags: ['Playwright', 'Cypress', 'Postman', 'Jest', 'GitHub Actions', 'K6 Load Testing'],
    useCases: [
      'Critical user journey regression automation (checkout, signup, auth)',
      'Backend REST API automated verification on PR merge',
      'Cross-browser UI snapshot testing',
      'Peak load stress testing before major product launch'
    ],
    capabilities: [
      'Parallelized headless test runners',
      'Self-healing selectors and visual diffs',
      'Detailed visual test report artifacts',
      'Flaky-test isolation and quarantine policies'
    ],
    indicativeBudget: {
      min: 50000,
      max: 220000,
      currency: 'INR',
      note: 'Includes test scripts, fixture setup, and CI integration'
    },
    indicativeTimelineWeeks: {
      min: 2,
      max: 6
    }
  },
  {
    id: 'legacy-modernization',
    name: 'Legacy System Modernization',
    category: 'development',
    categoryLabel: 'Development',
    shortDescription: 'Incremental refactoring of legacy monoliths, database migrations, and modern API enablement.',
    fullDescription: 'De-risk technical debt without halting business operations. We safely decompose monolithic systems using the strangler fig pattern, upgrade outdated tech stacks, and modernize UI/UX.',
    iconName: 'RefreshCw',
    techTags: ['Node.js', 'React', 'Docker', 'PostgreSQL', 'Reverse Proxies', 'REST APIs'],
    useCases: [
      'Decoupling legacy PHP / ASP.NET monolith into modular micro-frontends',
      'Migrating outdated on-prem MS SQL/MySQL to managed cloud DB',
      'Wrapping ancient backend legacy routines in secure REST APIs',
      'Modernizing desktop-only enterprise portal for mobile web'
    ],
    capabilities: [
      'Strangler Fig migration strategy to prevent downtime',
      'Dual-write data synchronization patterns',
      'End-to-end backwards compatibility test beds',
      'Progressive release toggles'
    ],
    indicativeBudget: {
      min: 250000,
      max: 900000,
      currency: 'INR',
      note: 'Phased modernization with milestones'
    },
    indicativeTimelineWeeks: {
      min: 8,
      max: 20
    }
  }
];
