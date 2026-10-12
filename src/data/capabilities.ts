export interface CapabilityRule {
  id: string;
  serviceId: string;
  supportedKeywords: string[];
  unsupportedKeywords: string[];
  supportedIntegrations: string[];
  unsupportedIntegrations: string[];
  supportedTech: string[];
  unsupportedTech: string[];
  minDurationWeeks: number;
  maxDurationWeeks: number;
  minBudgetINR: number;
  maxBudgetINR: number;
  commonRisks: string[];
  standardDeliverables: string[];
}

export const CAPABILITY_RULES: Record<string, CapabilityRule> = {
  'custom-software': {
    id: 'rule-custom-software',
    serviceId: 'custom-software',
    supportedKeywords: [
      'portal', 'saas', 'crm', 'erp', 'inventory', 'dashboard', 'management', 'workflow', 
      'admin', 'platform', 'b2b', 'web application', 'billing', 'customer', 'system'
    ],
    unsupportedKeywords: [
      'blockchain', 'crypto', 'smart contract', 'embedded', 'hardware', 'firmware', 'unreal engine', 'unity 3d'
    ],
    supportedIntegrations: ['stripe', 'razorpay', 'sendgrid', 'slack', 'google', 'aws', 'salesforce', 'hubspot', 'twilio'],
    unsupportedIntegrations: ['proprietary mainframe without api', 'sap custom abap non-rfc', 'legacy cobol'],
    supportedTech: ['react', 'next.js', 'node.js', 'typescript', 'postgresql', 'mysql', 'mongodb', 'docker', 'tailwind'],
    unsupportedTech: ['assembly', 'cobol', 'fortran', 'actionscript', 'coldfusion'],
    minDurationWeeks: 6,
    maxDurationWeeks: 18,
    minBudgetINR: 150000,
    maxBudgetINR: 800000,
    commonRisks: [
      'Scope creep during requirement discovery',
      'Third-party external API rate limits or delays',
      'User acceptance testing delays'
    ],
    standardDeliverables: [
      'Software Architecture Document',
      'Figma UI Design System & Component Library',
      'Full-stack Production Build with automated CI/CD',
      'Admin & Role-Based Access Control',
      'Deployment on Cloud Infrastructure'
    ]
  },
  'frontend-dev': {
    id: 'rule-frontend-dev',
    serviceId: 'frontend-dev',
    supportedKeywords: ['ui', 'frontend', 'interface', 'redesign', 'responsive', 'dashboard', 'components', 'web', 'client'],
    unsupportedKeywords: ['native c++', 'firmware', 'embedded', 'kernel'],
    supportedIntegrations: ['rest', 'graphql', 'analytics', 'sentry', 'mixpanel', 'segment'],
    unsupportedIntegrations: [],
    supportedTech: ['react', 'next.js', 'vue', 'typescript', 'tailwind css', 'vite', 'html5'],
    unsupportedTech: ['flash', 'silverlight'],
    minDurationWeeks: 3,
    maxDurationWeeks: 10,
    minBudgetINR: 80000,
    maxBudgetINR: 350000,
    commonRisks: [
      'Backend API endpoint changes during integration',
      'Asset delivery delays from design teams',
      'Cross-browser rendering edge cases'
    ],
    standardDeliverables: [
      'Modular Component System',
      'Mobile-First Responsive Layouts',
      'State Management & Reactive Store',
      'Performance audit passing Core Web Vitals'
    ]
  },
  'backend-dev': {
    id: 'rule-backend-dev',
    serviceId: 'backend-dev',
    supportedKeywords: ['api', 'database', 'microservices', 'endpoints', 'server', 'authentication', 'sql', 'performance'],
    unsupportedKeywords: ['blockchain mining', 'kernel driver', 'satellite firmware'],
    supportedIntegrations: ['redis', 'postgresql', 'kafka', 'rabbitmq', 'aws s3', 'stripe', 'sendgrid'],
    unsupportedIntegrations: ['air-gapped disconnected legacy hardware'],
    supportedTech: ['node.js', 'python', 'java', 'express', 'fastapi', 'postgresql', 'redis', 'docker'],
    unsupportedTech: ['cobol', 'vb6'],
    minDurationWeeks: 4,
    maxDurationWeeks: 12,
    minBudgetINR: 100000,
    maxBudgetINR: 450000,
    commonRisks: [
      'Database concurrency bottlenecks under sudden traffic spikes',
      'Data model evolution conflicts with legacy stores',
      'Edge-case authorization security flaws'
    ],
    standardDeliverables: [
      'OpenAPI 3.0 / Swagger Documentation',
      'Relational / NoSQL Schema & Migrations',
      'Unit & Integration Test Suite',
      'Automated Dockerized CI Pipeline'
    ]
  },
  'mobile-app-dev': {
    id: 'rule-mobile-app-dev',
    serviceId: 'mobile-app-dev',
    supportedKeywords: ['mobile', 'app', 'ios', 'android', 'phone', 'tablet', 'react native', 'cross-platform', 'notification'],
    unsupportedKeywords: ['wearable custom rom', 'embedded os', 'jailbreak tweaks', 'custom kernel'],
    supportedIntegrations: ['firebase', 'push notifications', 'google maps', 'camera', 'biometrics', 'apple pay', 'google pay'],
    unsupportedIntegrations: [],
    supportedTech: ['react native', 'typescript', 'expo', 'sqlite', 'tailwind'],
    unsupportedTech: ['symbian', 'blackberry os', 'windows mobile'],
    minDurationWeeks: 6,
    maxDurationWeeks: 16,
    minBudgetINR: 120000,
    maxBudgetINR: 600000,
    commonRisks: [
      'Apple App Store / Google Play review approval delays',
      'Device fragmentation across low-end Android hardware',
      'Background geolocation battery drainage constraints'
    ],
    standardDeliverables: [
      'Cross-Platform iOS & Android Codebase',
      'Offline Storage & Background Sync Engine',
      'TestFlight & Google Play Internal Test Releases',
      'App Store Submission Readiness Package'
    ]
  },
  'api-integration': {
    id: 'rule-api-integration',
    serviceId: 'api-integration',
    supportedKeywords: ['integration', 'sync', 'webhook', 'crm', 'erp', 'salesforce', 'hubspot', 'stripe', 'quickbooks', 'connect'],
    unsupportedKeywords: ['direct memory hacking', 'proprietary closed scada hardware'],
    supportedIntegrations: ['salesforce', 'hubspot', 'stripe', 'razorpay', 'shopify', 'woocommerce', 'zoho', 'jira', 'slack', 'quickbooks'],
    unsupportedIntegrations: ['proprietary mainframe without open api', 'air-gapped closed banking network'],
    supportedTech: ['node.js', 'python', 'webhooks', 'rest', 'graphql', 'redis'],
    unsupportedTech: [],
    minDurationWeeks: 2,
    maxDurationWeeks: 8,
    minBudgetINR: 50000,
    maxBudgetINR: 250000,
    commonRisks: [
      'Undocumented third-party API behavior or schema updates',
      'Strict API rate limits requiring queuing and delayed batches',
      'Credential rotation or sandbox permission constraints'
    ],
    standardDeliverables: [
      'Bi-directional Webhook & Queue Sync Handlers',
      'Data Transformation Mapping Engine',
      'Retry Mechanism & Dead-Letter Log Alerting',
      'Integration Monitoring Dashboard'
    ]
  },
  'devops-cloud': {
    id: 'rule-devops-cloud',
    serviceId: 'devops-cloud',
    supportedKeywords: ['aws', 'azure', 'docker', 'ci/cd', 'kubernetes', 'terraform', 'cloud', 'devops', 'pipeline', 'deployment'],
    unsupportedKeywords: ['nuclear plant scada', 'aerospace avionics cert'],
    supportedIntegrations: ['aws', 'azure', 'github actions', 'docker', 'kubernetes', 'datadog', 'sentry'],
    unsupportedIntegrations: [],
    supportedTech: ['terraform', 'docker', 'bash', 'yaml', 'linux', 'aws cli', 'azure cli'],
    unsupportedTech: [],
    minDurationWeeks: 2,
    maxDurationWeeks: 8,
    minBudgetINR: 75000,
    maxBudgetINR: 350000,
    commonRisks: [
      'Cloud bill cost overruns without proper budgeting guards',
      'Complex legacy environment dependencies during containerization',
      'Downtime window scheduling for live database migration'
    ],
    standardDeliverables: [
      'Infrastructure as Code (Terraform Scripts)',
      'Automated GitHub Actions CI/CD Pipeline',
      'Production Docker / Kubernetes Configurations',
      'Logging, Alerting & Runbook Documentation'
    ]
  },
  'ai-automation': {
    id: 'rule-ai-automation',
    serviceId: 'ai-automation',
    supportedKeywords: ['ai', 'llm', 'rag', 'gpt', 'claude', 'bot', 'assistant', 'automation', 'ocr', 'document', 'nlp', 'embedding'],
    unsupportedKeywords: ['autonomous robotics hardware', 'agi from scratch', 'military defense drone vision'],
    supportedIntegrations: ['openai', 'anthropic', 'pinecone', 'chroma', 'langchain', 'llama-index', 'aws bedrock'],
    unsupportedIntegrations: [],
    supportedTech: ['python', 'fastapi', 'typescript', 'postgresql pgvector', 'langchain', 'openai api'],
    unsupportedTech: [],
    minDurationWeeks: 3,
    maxDurationWeeks: 10,
    minBudgetINR: 100000,
    maxBudgetINR: 450000,
    commonRisks: [
      'LLM hallucinations requiring prompt guardrails and evaluation',
      'Token consumption costs at scale',
      'Poorly structured raw input document quality'
    ],
    standardDeliverables: [
      'Retrieval-Augmented Generation (RAG) Ingestion Pipeline',
      'Custom Prompt Template System with Guardrails',
      'FastAPI Microservice Backend with Streaming Responses',
      'Accuracy & Grounding Evaluation Test Suite'
    ]
  },
  'data-engineering': {
    id: 'rule-data-engineering',
    serviceId: 'data-engineering',
    supportedKeywords: ['data', 'pipeline', 'etl', 'warehouse', 'analytics', 'dashboard', 'bi', 'reporting', 'sql', 'bigquery'],
    unsupportedKeywords: ['quantum cryptography'],
    supportedIntegrations: ['snowflake', 'bigquery', 'postgresql', 'dbt', 'airbyte', 'metabase', 'powerbi'],
    unsupportedIntegrations: [],
    supportedTech: ['python', 'sql', 'dbt', 'postgresql', 'bigquery', 'pandas'],
    unsupportedTech: [],
    minDurationWeeks: 3,
    maxDurationWeeks: 9,
    minBudgetINR: 90000,
    maxBudgetINR: 400000,
    commonRisks: [
      'Source data inconsistencies and missing foreign keys',
      'Slow extraction queries impacting production OLTP systems',
      'Business KPI definition mismatches between stakeholders'
    ],
    standardDeliverables: [
      'ETL / ELT Scheduled Ingestion Workflows',
      'Star-Schema Data Warehouse Models',
      'Interactive BI Reports & Executive Dashboards',
      'Data Quality Assurance Automated Checks'
    ]
  },
  'qa-automation': {
    id: 'rule-qa-automation',
    serviceId: 'qa-automation',
    supportedKeywords: ['qa', 'test', 'automation', 'playwright', 'cypress', 'regression', 'e2e', 'load testing', 'quality'],
    unsupportedKeywords: ['hardware shock testing', 'radiation hardness'],
    supportedIntegrations: ['playwright', 'cypress', 'github actions', 'k6', 'postman', 'browserstack'],
    unsupportedIntegrations: [],
    supportedTech: ['typescript', 'playwright', 'cypress', 'jest', 'k6'],
    unsupportedTech: [],
    minDurationWeeks: 2,
    maxDurationWeeks: 6,
    minBudgetINR: 50000,
    maxBudgetINR: 220000,
    commonRisks: [
      'Dynamic DOM elements causing flaky test failures',
      'Test data management and database state resetting',
      'Third-party auth providers (Google, Captcha) in test flows'
    ],
    standardDeliverables: [
      'Automated E2E Test Suite for Core User Journeys',
      'REST API Automated Contract Testing Suite',
      'CI Pipeline Integration with HTML Artifact Reports',
      'Load & Concurrency Benchmark Analysis'
    ]
  },
  'legacy-modernization': {
    id: 'rule-legacy-modernization',
    serviceId: 'legacy-modernization',
    supportedKeywords: ['legacy', 'modernization', 'refactor', 'monolith', 'migration', 'upgrade', 'rewrite', 'decouple'],
    unsupportedKeywords: ['hardware replacement', 'scada assembly rewrite'],
    supportedIntegrations: ['reverse proxy', 'strangler fig routing', 'dual writes', 'rest apis'],
    unsupportedIntegrations: [],
    supportedTech: ['node.js', 'react', 'docker', 'postgresql', 'typescript'],
    unsupportedTech: [],
    minDurationWeeks: 8,
    maxDurationWeeks: 24,
    minBudgetINR: 250000,
    maxBudgetINR: 1000000,
    commonRisks: [
      'Undocumented legacy business logic rules',
      'Data corruption risks during schema migration',
      'User resistance to changed UX interfaces'
    ],
    standardDeliverables: [
      'De-risked Strangler Fig Migration Plan',
      'Modernized Responsive Client Web Interface',
      'Decoupled REST API Layer with Legacy Fallback',
      'Step-by-step Phased Cutover Strategy'
    ]
  }
};
