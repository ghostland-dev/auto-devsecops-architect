
export interface Organization {
  name: string;
  id: string;
  description?: string;
  notes?: string;
  contactEmail?: string;
  logo?: string;
  website?: string;
  projects?: Project[];
  createdAt?: string;
  updatedAt?: string;
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
  configurations?: ProjectConfig[];
  microservices?: Microservice[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Microservice {
  name: string;
  id: string;
  description?: string;
  language: string;
  framework: string;
  port: number;
  dependencies?: string[];
  volumes?: Volume[];
  environmentVariables?: EnvironmentVariable[];
}

export interface Volume {
  name: string;
  mountPath: string;
  type: "local" | "persistent" | "configMap" | "secret";
  size?: string;
}

export interface EnvironmentVariable {
  name: string;
  value: string;
  environment: "all" | "dev" | "staging" | "prod";
  isSecret: boolean;
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

export interface KubernetesConfig {
  namespace?: string;
  deploymentStrategy?: "RollingUpdate" | "Recreate";
  replicas?: number;
  serviceType?: "ClusterIP" | "NodePort" | "LoadBalancer";
  ingressEnabled?: boolean;
  ingressDomain?: string;
  configMaps?: Record<string, Record<string, string>>;
  secrets?: Record<string, Record<string, string>>;
  persistentVolumes?: PersistentVolumeConfig[];
  autoscaling?: {
    enabled: boolean;
    minReplicas?: number;
    maxReplicas?: number;
    targetCPUUtilizationPercentage?: number;
  };
  networkPolicies?: NetworkPolicyConfig[];
}

export interface PersistentVolumeConfig {
  name: string;
  size: string;
  storageClassName?: string;
  accessModes?: string[];
}

export interface NetworkPolicyConfig {
  name: string;
  podSelector: Record<string, string>;
  ingress?: {
    from: {
      namespaceSelector?: Record<string, string>;
      podSelector?: Record<string, string>;
    }[];
  }[];
  egress?: {
    to: {
      namespaceSelector?: Record<string, string>;
      podSelector?: Record<string, string>;
    }[];
  }[];
}

export interface TerraformConfig {
  provider: "aws" | "gcp" | "azure" | "oci";
  region?: string;
  resourcePrefix?: string;
  vpcCidr?: string;
  subnets?: string[];
  modules?: {
    name: string;
    source: string;
    version?: string;
    variables?: Record<string, any>;
  }[];
  outputs?: string[];
  backendType?: "s3" | "gcs" | "azurerm" | "local";
  backendConfig?: Record<string, string>;
}

export interface CICDStage {
  name: string;
  type: "build" | "test" | "security" | "deploy";
  commands: string[];
  dependencies?: string[];
  environment?: string;
  conditions?: string[];
}

export interface ProjectConfig {
  id?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  
  language: string;
  framework: string;
  ciCdProvider: string;
  cloudProvider: string;
  deploymentType: string;
  database: string;
  useRedis: boolean;
  useRabbitMq: boolean;
  useKafka?: boolean;
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
  
  // New configurations
  microservices?: Microservice[];
  
  // Kubernetes configuration
  kubernetesConfig?: KubernetesConfig;
  
  // Terraform configuration
  terraformConfig?: TerraformConfig;
  
  // CI/CD pipeline stages
  cicdStages?: CICDStage[];
  
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

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  organizations: Organization[];
  createdAt: string;
  updatedAt: string;
}

export interface GenerationHistory {
  id: string;
  projectId: string;
  configId: string;
  timestamp: string;
  files: {
    name: string;
    content: string;
    type: "dockerfile" | "docker-compose" | "kubernetes" | "terraform" | "cicd" | "other";
  }[];
}
