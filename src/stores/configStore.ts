
import { create } from 'zustand';
import { ProjectConfig, GenerationHistory } from '@/types/configurator';

interface ConfigState {
  config: ProjectConfig;
  configHistory: ProjectConfig[];
  generationHistory: GenerationHistory[];
  updateConfig: (partialConfig: Partial<ProjectConfig>) => void;
  saveConfig: () => Promise<ProjectConfig>;
  loadConfig: (configId: string) => void;
  createNewConfig: () => void;
  saveGeneration: (files: GenerationHistory['files']) => Promise<void>;
  getGenerationHistory: () => GenerationHistory[];
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  config: {
    language: "",
    framework: "",
    ciCdProvider: "",
    cloudProvider: "",
    deploymentType: "",
    database: "",
    useRedis: false,
    useRabbitMq: false,
    useKafka: false,
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
  configHistory: [],
  generationHistory: [],
  
  updateConfig: (partialConfig) => 
    set((state) => ({ 
      config: { 
        ...state.config, 
        ...partialConfig 
      } 
    })),
  
  saveConfig: async () => {
    const currentConfig = get().config;
    const updatedConfig = {
      ...currentConfig,
      id: currentConfig.id || Date.now().toString(),
      version: currentConfig.version 
        ? (parseInt(currentConfig.version) + 1).toString()
        : "1",
      updatedAt: new Date().toISOString(),
      createdAt: currentConfig.createdAt || new Date().toISOString()
    };
    
    // Save to history
    set((state) => ({
      config: updatedConfig,
      configHistory: [
        ...state.configHistory.filter(c => c.id !== updatedConfig.id),
        { ...updatedConfig }
      ]
    }));
    
    // In a real app, you would save to a backend here
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return updatedConfig;
  },
  
  loadConfig: (configId) => {
    const configToLoad = get().configHistory.find(c => c.id === configId);
    if (configToLoad) {
      set({ config: { ...configToLoad } });
    }
  },
  
  createNewConfig: () => {
    const newConfig: ProjectConfig = {
      language: "",
      framework: "",
      ciCdProvider: "",
      cloudProvider: "",
      deploymentType: "",
      database: "",
      useRedis: false,
      useRabbitMq: false,
      useKafka: false,
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
    };
    
    set({ config: newConfig });
  },
  
  saveGeneration: async (files) => {
    const newGeneration: GenerationHistory = {
      id: Date.now().toString(),
      projectId: get().config.project?.id || "",
      configId: get().config.id || "",
      timestamp: new Date().toISOString(),
      files
    };
    
    set((state) => ({
      generationHistory: [...state.generationHistory, newGeneration]
    }));
    
    // In a real app, you would save to a backend here
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  getGenerationHistory: () => {
    const currentConfig = get().config;
    return get().generationHistory.filter(
      gen => gen.configId === currentConfig.id
    );
  }
}));
