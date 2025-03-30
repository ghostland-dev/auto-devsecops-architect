
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfiguratorSidebar from "@/components/configurator/ConfiguratorSidebar";
import LanguageFrameworkStep from "@/components/configurator/LanguageFrameworkStep";
import CiCdStep from "@/components/configurator/CiCdStep";
import CloudProviderStep from "@/components/configurator/CloudProviderStep";
import DeploymentStep from "@/components/configurator/DeploymentStep";
import SecurityStep from "@/components/configurator/SecurityStep";
import FilePreview from "@/components/configurator/FilePreview";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ProjectConfig } from "@/types/configurator";

const Configurator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("language");
  const [config, setConfig] = useState<ProjectConfig>({
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
    securityOptions: {
      staticAnalysis: [],
      secretsManagement: "",
      complianceStandards: [],
      containerScan: false,
      sbomGeneration: false,
      zeroTrustNetworking: false,
      autoVulnPatching: false,
    }
  });

  const updateConfig = (partialConfig: Partial<ProjectConfig>) => {
    setConfig({
      ...config,
      ...partialConfig
    });
  };

  const handleGenerateFiles = () => {
    toast({
      title: "Génération en cours",
      description: "Vos fichiers DevSecOps sont en cours de génération...",
    });
    
    // Simulate file generation delay
    setTimeout(() => {
      navigate("/preview");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <ConfiguratorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow p-6">
          <h1 className="text-3xl font-bold mb-6">Configuration de votre projet DevSecOps</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="language">Langage & Framework</TabsTrigger>
              <TabsTrigger value="cicd">CI/CD</TabsTrigger>
              <TabsTrigger value="cloud">Cloud Provider</TabsTrigger>
              <TabsTrigger value="deployment">Déploiement</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>
            
            <TabsContent value="language">
              <LanguageFrameworkStep config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="cicd">
              <CiCdStep config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="cloud">
              <CloudProviderStep config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="deployment">
              <DeploymentStep config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="security">
              <SecurityStep config={config} updateConfig={updateConfig} />
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <FilePreview config={config} />
          </div>
          
          <div className="mt-8 flex justify-between">
            {activeTab !== "language" && (
              <Button 
                variant="outline" 
                onClick={() => {
                  const tabs = ["language", "cicd", "cloud", "deployment", "security"];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex - 1]);
                }}
              >
                Précédent
              </Button>
            )}
            
            {activeTab !== "security" ? (
              <Button 
                className="ml-auto"
                onClick={() => {
                  const tabs = ["language", "cicd", "cloud", "deployment", "security"];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex + 1]);
                }}
              >
                Suivant
              </Button>
            ) : (
              <Button 
                className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                onClick={handleGenerateFiles}
              >
                Générer les fichiers
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configurator;
