
import { Button } from "@/components/ui/button";

interface ConfiguratorNavigationProps {
  activeTab: string;
  navigateToNextTab: () => void;
  navigateToPrevTab: () => void;
  handleGenerateFiles: () => void;
  isLastTab: boolean;
  completionPercentage: number;
}

const ConfiguratorNavigation = ({
  activeTab,
  navigateToNextTab,
  navigateToPrevTab,
  handleGenerateFiles,
  isLastTab,
  completionPercentage
}: ConfiguratorNavigationProps) => {
  return (
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
  );
};

export default ConfiguratorNavigation;
