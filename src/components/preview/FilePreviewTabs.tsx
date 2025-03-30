
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DockerfileSnippet from "./code-snippets/DockerfileSnippet";
import DockerComposeSnippet from "./code-snippets/DockerComposeSnippet";
import GitHubActionSnippet from "./code-snippets/GitHubActionSnippet";
import KubernetesSnippet from "./code-snippets/KubernetesSnippet";
import TerraformSnippet from "./code-snippets/TerraformSnippet";
import SecurityConfigSnippet from "./code-snippets/SecurityConfigSnippet";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";

interface FilePreviewTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilePreviewTabs = ({ activeTab, setActiveTab }: FilePreviewTabsProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  return (
    <div className="lg:col-span-3">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1' : isTablet ? 'grid-cols-3 gap-1' : 'md:grid-cols-6'}`}>
          <TabsTrigger value="dockerfile" className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}>Dockerfile</TabsTrigger>
          <TabsTrigger value="docker-compose" className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}>docker-compose</TabsTrigger>
          <TabsTrigger value="github-action" className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}>GitHub Action</TabsTrigger>
          <TabsTrigger value="kubernetes" className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}>Kubernetes</TabsTrigger>
          <TabsTrigger value="terraform" className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}>Terraform</TabsTrigger>
          <TabsTrigger value="security" className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}>Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dockerfile" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] sm:h-[500px] overflow-auto">
          <DockerfileSnippet />
        </TabsContent>
        
        <TabsContent value="docker-compose" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] sm:h-[500px] overflow-auto">
          <DockerComposeSnippet />
        </TabsContent>
        
        <TabsContent value="github-action" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] sm:h-[500px] overflow-auto">
          <GitHubActionSnippet />
        </TabsContent>
        
        <TabsContent value="kubernetes" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] sm:h-[500px] overflow-auto">
          <KubernetesSnippet />
        </TabsContent>
        
        <TabsContent value="terraform" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] sm:h-[500px] overflow-auto">
          <TerraformSnippet />
        </TabsContent>
        
        <TabsContent value="security" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] sm:h-[500px] overflow-auto">
          <SecurityConfigSnippet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilePreviewTabs;
