
export interface Organization {
  name: string;
  id: string;
  description?: string;
}

export interface Project {
  name: string;
  id: string;
  description?: string;
  repository?: string;
}

export interface DeliveryMethod {
  type: "github" | "mail" | "custom";
  details: {
    email?: string;
    repository?: string;
    customUrl?: string;
    authToken?: string;
    encryptionKey?: string;
  };
}

export interface LanguageDetails {
  version?: string;
  buildTool?: string;
  additionalLibraries?: string[];
  customDockerImage?: string;
}

export interface FrameworkDetails {
  version?: string;
  features?: string[];
  customConfig?: string;
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
  
  // Informations détaillées
  languageDetails?: LanguageDetails;
  frameworkDetails?: FrameworkDetails;
  
  // Nouvelles informations d'organisation et de projet
  organization?: Organization;
  project?: Project;
  
  // Méthode de livraison
  deliveryMethod?: DeliveryMethod;
  
  // Options de sécurité
  securityOptions: {
    staticAnalysis: string[];
    secretsManagement: string;
    complianceStandards: string[];
    containerScan: boolean;
    sbomGeneration: boolean;
    zeroTrustNetworking: boolean;
    autoVulnPatching: boolean;
  };
}
