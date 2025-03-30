
import { create } from 'zustand';
import { ProjectConfig } from '@/types/configurator';

interface ConfigState {
  config: ProjectConfig;
  updateConfig: (partialConfig: Partial<ProjectConfig>) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: {
    language: "",
    framework: "",
    ciCdProvider: "",
    cloudProvider: "",
    deploymentType: "",
    database: "",
    useRedis: false,
    useRabbitMq: false,
    environments: ["dev"],
    containerRegistry: "",
    repositoryUrl: "",
    notes: "",
    securityOptions: {
      staticAnalysis: [],
      secretsManagement: "",
      complianceStandards: [],
      containerScan: false,
      sbomGeneration: false,
      zeroTrustNetworking: false,
      autoVulnPatching: false,
    }
  },
  updateConfig: (partialConfig) => 
    set((state) => ({ 
      config: { 
        ...state.config, 
        ...partialConfig 
      } 
    })),
}));
