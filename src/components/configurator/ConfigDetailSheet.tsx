
import React from "react";
import { ProjectConfig } from "@/types/configurator";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfigDetailSheetProps {
  config: ProjectConfig;
  title?: string;
  children?: React.ReactNode;
}

const ConfigDetailSheet = ({ 
  config, 
  title = "Détails de configuration", 
  children 
}: ConfigDetailSheetProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    toast({
      title: "Configuration copiée",
      description: "La configuration a été copiée dans le presse-papier."
    });
  };

  const renderConfigSection = (title: string, data: any) => {
    if (!data) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div className="bg-slate-50 p-3 rounded-md text-sm">
          <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          <span>Aperçu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Consultez les détails de la configuration actuelle pour votre projet DevSecOps.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4">
          {children}
          
          <Separator className="my-4" />
          
          {config.organization && renderConfigSection("Organisation", config.organization)}
          {config.project && renderConfigSection("Projet", config.project)}
          {renderConfigSection("Langage & Framework", {
            language: config.language,
            framework: config.framework,
            ...config.languageDetails,
            ...config.frameworkDetails
          })}
          {renderConfigSection("CI/CD & Déploiement", {
            ciCdProvider: config.ciCdProvider,
            cloudProvider: config.cloudProvider,
            deploymentType: config.deploymentType,
            containerRegistry: config.containerRegistry,
            environments: config.environments
          })}
          {renderConfigSection("Base de données & Services", {
            database: config.database,
            useRedis: config.useRedis,
            useRabbitMq: config.useRabbitMq
          })}
          {renderConfigSection("Sécurité", config.securityOptions)}
          {config.deliveryMethod && renderConfigSection("Livraison", config.deliveryMethod)}
        </div>
        
        <SheetFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
            <Copy className="h-4 w-4" />
            <span>Copier</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exporter JSON</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ConfigDetailSheet;
