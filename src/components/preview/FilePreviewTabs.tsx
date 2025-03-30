
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DockerfileSnippet from "./code-snippets/DockerfileSnippet";
import DockerComposeSnippet from "./code-snippets/DockerComposeSnippet";
import GitHubActionSnippet from "./code-snippets/GitHubActionSnippet";
import KubernetesSnippet from "./code-snippets/KubernetesSnippet";
import TerraformSnippet from "./code-snippets/TerraformSnippet";

interface FilePreviewTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilePreviewTabs = ({ activeTab, setActiveTab }: FilePreviewTabsProps) => {
  return (
    <div className="lg:col-span-3">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
          <TabsTrigger value="docker-compose">docker-compose</TabsTrigger>
          <TabsTrigger value="github-action">GitHub Action</TabsTrigger>
          <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
          <TabsTrigger value="terraform">Terraform</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dockerfile" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
          <DockerfileSnippet />
        </TabsContent>
        
        <TabsContent value="docker-compose" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
          <DockerComposeSnippet />
        </TabsContent>
        
        <TabsContent value="github-action" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
          <GitHubActionSnippet />
        </TabsContent>
        
        <TabsContent value="kubernetes" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
          <KubernetesSnippet />
        </TabsContent>
        
        <TabsContent value="terraform" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
          <TerraformSnippet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilePreviewTabs;
