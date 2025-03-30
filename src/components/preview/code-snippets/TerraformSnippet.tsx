
import React, { useState } from "react";
import CodeSnippetHeader from "../CodeSnippetHeader";
import { useConfigStore } from "@/stores/configStore";
import { generateTerraformFiles } from "@/utils/terraform/generateTerraform";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TerraformSnippet = () => {
  const config = useConfigStore(state => state.config);
  const [activeTab, setActiveTab] = useState("main");
  
  const terraformFiles = generateTerraformFiles(config);
  
  const getFileContent = () => {
    switch (activeTab) {
      case "main":
        return terraformFiles.main;
      case "variables":
        return terraformFiles.variables;
      case "provider":
        return terraformFiles.provider;
      case "backend":
        return terraformFiles.backend;
      case "outputs":
        return terraformFiles.outputs;
      default:
        return terraformFiles.main;
    }
  };
  
  const getFileName = () => {
    switch (activeTab) {
      case "main":
        return "main.tf";
      case "variables":
        return "variables.tf";
      case "provider":
        return "provider.tf";
      case "backend":
        return "backend.tf";
      case "outputs":
        return "outputs.tf";
      default:
        return "main.tf";
    }
  };
  
  return (
    <div className="rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-slate-800 border-b border-slate-700">
          <TabsList className="h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="main" 
              className="rounded-none border-r border-slate-700 px-3 py-2 data-[state=active]:bg-slate-900"
            >
              main.tf
            </TabsTrigger>
            <TabsTrigger 
              value="variables" 
              className="rounded-none border-r border-slate-700 px-3 py-2 data-[state=active]:bg-slate-900"
            >
              variables.tf
            </TabsTrigger>
            <TabsTrigger 
              value="provider" 
              className="rounded-none border-r border-slate-700 px-3 py-2 data-[state=active]:bg-slate-900"
            >
              provider.tf
            </TabsTrigger>
            <TabsTrigger 
              value="backend" 
              className="rounded-none border-r border-slate-700 px-3 py-2 data-[state=active]:bg-slate-900"
            >
              backend.tf
            </TabsTrigger>
            <TabsTrigger 
              value="outputs" 
              className="rounded-none px-3 py-2 data-[state=active]:bg-slate-900"
            >
              outputs.tf
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="mt-0 p-0">
          <CodeSnippetHeader fileName={getFileName()} language="terraform" />
          <pre className="text-green-400 font-mono text-sm p-4" data-filename={getFileName()}>
            {getFileContent()}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TerraformSnippet;
