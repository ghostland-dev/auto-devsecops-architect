
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
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
import NotesInput from "@/components/configurator/NotesInput";
import ConfigDetailSheet from "@/components/configurator/ConfigDetailSheet";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, HelpCircle, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    const requiredFields = [
      !!config.language,
      !!config.framework,
      !!config.ciCdProvider,
      !!config.cloudProvider,
      !!config.deploymentType,
      !!config.database,
      config.project?.name ? true : false,
      config.organization?.name ? true : false,
      config.deliveryMethod?.type ? true : false
    ];
    
    const completedFields = requiredFields.filter(field => field).length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <ConfiguratorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Configuration de votre projet DevSecOps</h1>
            <ConfigDetailSheet config={config} />
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Progression: {completionPercentage}%</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remplissez les champs obligatoires pour avancer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 && (
                    <div className="flex items-center text-emerald-600 text-sm gap-1">
                      <Check className="h-4 w-4" />
                      <span>Configuration complète</span>
                    </div>
                  )}
                </div>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </CardContent>
          </Card>
          
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
          
          <div className="mt-8 mb-4">
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Notes du projet</h3>
                    <NotesInput 
                      value={config.notes || ""} 
                      onChange={(notes) => updateConfig({ notes })}
                      placeholder="Ajoutez ici des notes ou instructions spécifiques pour votre configuration DevSecOps..."
                      description="Ces notes seront incluses dans la documentation générée et peuvent servir comme référence pour votre équipe."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
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
                disabled={completionPercentage < 80}
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
