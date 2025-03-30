
import { Progress } from "@/components/ui/progress";
import { HelpCircle, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectConfig } from "@/types/configurator";

interface ConfiguratorProgressProps {
  config: ProjectConfig;
}

const ConfiguratorProgress = ({ config }: ConfiguratorProgressProps) => {
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
  );
};

export default ConfiguratorProgress;
