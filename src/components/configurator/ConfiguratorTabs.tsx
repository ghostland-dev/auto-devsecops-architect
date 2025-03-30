
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
  const isTabDisabled = (tabId: string) => {
    switch (tabId) {
      case "language-details":
        return !config.language;
      default:
        return false;
    }
  };

  const tabs = [
    { id: "project", label: "Projet & Organisation" },
    { id: "language", label: "Langage & Framework" },
    { id: "language-details", label: "Détails techniques" },
    { id: "cicd", label: "CI/CD" },
    { id: "cloud", label: "Cloud Provider" },
    { id: "deployment", label: "Déploiement" },
    { id: "security", label: "Sécurité" },
    { id: "delivery", label: "Livraison" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
        {tabs.map(tab => (
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
  );
};

export default ConfiguratorTabs;
