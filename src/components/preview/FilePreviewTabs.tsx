
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DockerfileSnippet from "./code-snippets/DockerfileSnippet";
import DockerComposeSnippet from "./code-snippets/DockerComposeSnippet";
import GitHubActionSnippet from "./code-snippets/GitHubActionSnippet";
import KubernetesSnippet from "./code-snippets/KubernetesSnippet";
import TerraformSnippet from "./code-snippets/TerraformSnippet";
import SecurityConfigSnippet from "./code-snippets/SecurityConfigSnippet";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilePreviewTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilePreviewTabs = ({ activeTab, setActiveTab }: FilePreviewTabsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="lg:col-span-3">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-y-1' : 'sm:grid-cols-3 md:grid-cols-6'}`}>
          <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
          <TabsTrigger value="docker-compose">docker-compose</TabsTrigger>
          <TabsTrigger value="github-action">GitHub Action</TabsTrigger>
          <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
          <TabsTrigger value="terraform">Terraform</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
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
