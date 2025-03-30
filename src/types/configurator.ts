
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
}
