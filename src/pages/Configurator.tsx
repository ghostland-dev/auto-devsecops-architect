
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ConfiguratorSidebar from "@/components/configurator/ConfiguratorSidebar";
import FilePreview from "@/components/configurator/FilePreview";
import Navbar from "@/components/Navbar";
import { ProjectConfig } from "@/types/configurator";
import ConfiguratorProgress from "@/components/configurator/ConfiguratorProgress";
import ConfiguratorHeader from "@/components/configurator/ConfiguratorHeader";
import ConfiguratorTabs from "@/components/configurator/ConfiguratorTabs";
import ConfiguratorNotes from "@/components/configurator/ConfiguratorNotes";
import ConfiguratorNavigation from "@/components/configurator/ConfiguratorNavigation";

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

  const handleNotesChange = (notes: string) => {
    updateConfig({ notes });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <ConfiguratorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow p-6 overflow-y-auto">
          <ConfiguratorHeader config={config} />
          
          <ConfiguratorProgress config={config} />
          
          <ConfiguratorTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            config={config} 
            updateConfig={updateConfig} 
          />
          
          <ConfiguratorNotes 
            notes={config.notes || ""} 
            onChange={handleNotesChange} 
          />
          
          <div className="mt-6">
            <FilePreview config={config} />
          </div>
          
          <ConfiguratorNavigation 
            activeTab={activeTab}
            navigateToNextTab={navigateToNextTab}
            navigateToPrevTab={navigateToPrevTab}
            handleGenerateFiles={handleGenerateFiles}
            isLastTab={isLastTab}
            completionPercentage={completionPercentage}
          />
        </main>
      </div>
    </div>
  );
};

export default Configurator;
