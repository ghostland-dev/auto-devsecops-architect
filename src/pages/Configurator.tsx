
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfiguratorSidebar from "@/components/configurator/ConfiguratorSidebar";
import LanguageFrameworkStep from "@/components/configurator/LanguageFrameworkStep";
import LanguageDetailsStep from "@/components/configurator/LanguageDetailsStep";
import CiCdStep from "@/components/configurator/CiCdStep";
import CloudProviderStep from "@/components/configurator/CloudProviderStep";
import DeploymentStep from "@/components/configurator/DeploymentStep";
import SecurityStep from "@/components/configurator/SecurityStep";
import ProjectDetailsStep from "@/components/configurator/ProjectDetailsStep";
import DeliveryMethodStep from "@/components/configurator/DeliveryMethodStep";
import FilePreview from "@/components/configurator/FilePreview";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ProjectConfig } from "@/types/configurator";

const Configurator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("project");
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

  const getTabs = () => [
    { id: "project", label: "Projet & Organisation" },
    { id: "language", label: "Langage & Framework" },
    { id: "language-details", label: "Détails techniques" },
    { id: "cicd", label: "CI/CD" },
    { id: "cloud", label: "Cloud Provider" },
    { id: "deployment", label: "Déploiement" },
    { id: "security", label: "Sécurité" },
    { id: "delivery", label: "Livraison" },
  ];

  const isTabDisabled = (tabId: string) => {
    switch (tabId) {
      case "language-details":
        return !config.language;
      default:
        return false;
    }
  };

  const navigateToNextTab = () => {
    const tabs = getTabs();
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const navigateToPrevTab = () => {
    const tabs = getTabs();
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const isLastTab = activeTab === "delivery";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <ConfiguratorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow p-6">
          <h1 className="text-3xl font-bold mb-6">Configuration de votre projet DevSecOps</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
              {getTabs().map(tab => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id}
                  disabled={isTabDisabled(tab.id)}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="project">
              <ProjectDetailsStep config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="language">
              <LanguageFrameworkStep config={config} updateConfig={updateConfig} />
            </TabsContent>

            <TabsContent value="language-details">
              <LanguageDetailsStep config={config} updateConfig={updateConfig} />
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

            <TabsContent value="delivery">
              <DeliveryMethodStep config={config} updateConfig={updateConfig} />
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <FilePreview config={config} />
          </div>
          
          <div className="mt-8 flex justify-between">
            {activeTab !== "project" && (
              <Button 
                variant="outline" 
                onClick={navigateToPrevTab}
              >
                Précédent
              </Button>
            )}
            
            {!isLastTab ? (
              <Button 
                className="ml-auto"
                onClick={navigateToNextTab}
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
