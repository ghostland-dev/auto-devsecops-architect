
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DockerfileSnippet from "./code-snippets/DockerfileSnippet";
import DockerComposeSnippet from "./code-snippets/DockerComposeSnippet";
import GitHubActionSnippet from "./code-snippets/GitHubActionSnippet";
import KubernetesSnippet from "./code-snippets/KubernetesSnippet";
import TerraformSnippet from "./code-snippets/TerraformSnippet";
import SecurityConfigSnippet from "./code-snippets/SecurityConfigSnippet";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import { useConfigStore } from "@/stores/configStore";

interface FilePreviewTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilePreviewTabs = ({ activeTab, setActiveTab }: FilePreviewTabsProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const config = useConfigStore(state => state.config);
  
  // Check which tabs should be enabled based on configuration
  const isTabDisabled = (tab: string): boolean => {
    switch (tab) {
      case "dockerfile":
        return !config.language;
      case "docker-compose":
        return !config.language;
      case "github-action":
        return !config.ciCdProvider;
      case "kubernetes":
        return !config.deploymentType || config.deploymentType !== "kubernetes";
      case "terraform":
        return !config.cloudProvider;
      case "security":
        return !config.securityOptions?.staticAnalysis?.length;
      default:
        return false;
    }
  };
  
  return (
    <div className="lg:col-span-3 mt-4 sm:mt-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4 sm:mt-6">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1 mb-2' : isTablet ? 'grid-cols-3 gap-1' : 'md:grid-cols-6'}`}>
          <TabsTrigger 
            value="dockerfile" 
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
            disabled={isTabDisabled("dockerfile")}
          >
            Dockerfile
          </TabsTrigger>
          <TabsTrigger 
            value="docker-compose" 
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
            disabled={isTabDisabled("docker-compose")}
          >
            docker-compose
          </TabsTrigger>
          <TabsTrigger 
            value="github-action" 
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
            disabled={isTabDisabled("github-action")}
          >
            GitHub Action
          </TabsTrigger>
          <TabsTrigger 
            value="kubernetes" 
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
            disabled={isTabDisabled("kubernetes")}
          >
            Kubernetes
          </TabsTrigger>
          <TabsTrigger 
            value="terraform" 
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
            disabled={isTabDisabled("terraform")}
          >
            Terraform
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
            disabled={isTabDisabled("security")}
          >
            Sécurité
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dockerfile" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-280px)] sm:h-[500px] overflow-auto mt-2">
          <DockerfileSnippet />
        </TabsContent>
        
        <TabsContent value="docker-compose" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-280px)] sm:h-[500px] overflow-auto mt-2">
          <DockerComposeSnippet />
        </TabsContent>
        
        <TabsContent value="github-action" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-280px)] sm:h-[500px] overflow-auto mt-2">
          <GitHubActionSnippet />
        </TabsContent>
        
        <TabsContent value="kubernetes" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-280px)] sm:h-[500px] overflow-auto mt-2">
          <KubernetesSnippet />
        </TabsContent>
        
        <TabsContent value="terraform" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-280px)] sm:h-[500px] overflow-auto mt-2">
          <TerraformSnippet />
        </TabsContent>
        
        <TabsContent value="security" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-280px)] sm:h-[500px] overflow-auto mt-2">
          <SecurityConfigSnippet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilePreviewTabs;
