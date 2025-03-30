
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
  
  // Nouvelles options de sécurité
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
