
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectConfig } from "@/types/configurator";
import LanguageFrameworkStep from "@/components/configurator/LanguageFrameworkStep";
import LanguageDetailsStep from "@/components/configurator/LanguageDetailsStep";
import CiCdStep from "@/components/configurator/CiCdStep";
import CloudProviderStep from "@/components/configurator/CloudProviderStep";
import DeploymentStep from "@/components/configurator/DeploymentStep";
import SecurityStep from "@/components/configurator/SecurityStep";
import ProjectDetailsStep from "@/components/configurator/ProjectDetailsStep";
import DeliveryMethodStep from "@/components/configurator/DeliveryMethodStep";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";

interface ConfiguratorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const ConfiguratorTabs = ({
  activeTab,
  setActiveTab,
  config,
  updateConfig
}: ConfiguratorTabsProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const isTabDisabled = (tabId: string) => {
    switch (tabId) {
      case "language-details":
        return !config.language;
      default:
        return false;
    }
  };

  const tabs = [
    { id: "project", label: "Projet" },
    { id: "language", label: "Langage" },
    { id: "language-details", label: "Détails" },
    { id: "cicd", label: "CI/CD" },
    { id: "cloud", label: "Cloud" },
    { id: "deployment", label: "Déploiement" },
    { id: "security", label: "Sécurité" },
    { id: "delivery", label: "Livraison" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
      <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1' : isTablet ? 'grid-cols-4 gap-1' : 'md:grid-cols-8'}`}>
        {tabs.map(tab => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id}
            disabled={isTabDisabled(tab.id)}
            className={isMobile || isTablet ? 'text-xs py-1 px-1.5' : ''}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="project" className="pt-6">
        <ProjectDetailsStep config={config} updateConfig={updateConfig} />
      </TabsContent>
      
      <TabsContent value="language" className="pt-6">
        <LanguageFrameworkStep config={config} updateConfig={updateConfig} />
      </TabsContent>

      <TabsContent value="language-details" className="pt-6">
        <LanguageDetailsStep config={config} updateConfig={updateConfig} />
      </TabsContent>
      
      <TabsContent value="cicd" className="pt-6">
        <CiCdStep config={config} updateConfig={updateConfig} />
      </TabsContent>
      
      <TabsContent value="cloud" className="pt-6">
        <CloudProviderStep config={config} updateConfig={updateConfig} />
      </TabsContent>
      
      <TabsContent value="deployment" className="pt-6">
        <DeploymentStep config={config} updateConfig={updateConfig} />
      </TabsContent>
      
      <TabsContent value="security" className="pt-6">
        <SecurityStep config={config} updateConfig={updateConfig} />
      </TabsContent>

      <TabsContent value="delivery" className="pt-6">
        <DeliveryMethodStep config={config} updateConfig={updateConfig} />
      </TabsContent>
    </Tabs>
  );
};

export default ConfiguratorTabs;
