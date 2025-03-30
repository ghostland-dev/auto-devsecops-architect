
export interface Organization {
  name: string;
  id: string;
  description?: string;
  notes?: string;
  contactEmail?: string;
  logo?: string;
  website?: string;
}

export interface Project {
  name: string;
  id: string;
  description?: string;
  repository?: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  priority?: "low" | "medium" | "high";
}

export interface DeliveryMethod {
  type: "github" | "mail" | "custom";
  details: {
    email?: string;
    repository?: string;
    customUrl?: string;
    authToken?: string;
    encryptionKey?: string;
    notificationChannel?: string;
    scheduleDelivery?: boolean;
    deliveryDate?: string;
  };
}

export interface LanguageDetails {
  version?: string;
  buildTool?: string;
  additionalLibraries?: string[];
  customDockerImage?: string;
  testFrameworks?: string[];
  packageManager?: string;
  linters?: string[];
  compilers?: string[];
}

export interface FrameworkDetails {
  version?: string;
  features?: string[];
  customConfig?: string;
  plugins?: string[];
  extensions?: string[];
}

export interface EnvironmentConfig {
  name: string;
  domain?: string;
  variables?: Record<string, string>;
  resources?: {
    cpu?: string;
    memory?: string;
    storage?: string;
  };
}

export interface ProjectConfig {
  language: string;
  framework: string;
  ciCdProvider: string;
  cloudProvider: string;
  deploymentType: string;
  database: string;
  useRedis: boolean;
  useRabbitMq: boolean;
  environments: string[];
  containerRegistry: string;
  repositoryUrl: string;
  notes?: string;
  
  // Detailed information
  languageDetails?: LanguageDetails;
  frameworkDetails?: FrameworkDetails;
  environmentsConfig?: EnvironmentConfig[];
  
  // Organization and project info
  organization?: Organization;
  project?: Project;
  
  // Delivery method
  deliveryMethod?: DeliveryMethod;
  
  // Security options
  securityOptions: {
    staticAnalysis: string[];
    secretsManagement: string;
    complianceStandards: string[];
    containerScan: boolean;
    sbomGeneration: boolean;
    zeroTrustNetworking: boolean;
    autoVulnPatching: boolean;
    securityScanSchedule?: "daily" | "weekly" | "onDeploy";
    vulnerabilitySeverity?: "critical" | "high" | "medium" | "all";
    customSecurityPolicies?: string;
    securityContactEmail?: string;
  };
}
