
import { BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface AdvancedSecurityProps {
  securityOptions: {
    containerScan: boolean;
    sbomGeneration: boolean;
    zeroTrustNetworking: boolean;
    autoVulnPatching: boolean;
    [key: string]: any;
  };
  updateConfig: (options: Partial<{
    containerScan: boolean;
    sbomGeneration: boolean;
    zeroTrustNetworking: boolean;
    autoVulnPatching: boolean;
  }>) => void;
}

const AdvancedSecurityFeatures = ({ securityOptions, updateConfig }: AdvancedSecurityProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <BarChart className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Fonctionnalités Avancées</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex items-center">
            <Label htmlFor="container-scan">Scan de conteneurs</Label>
            <Badge className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Recommandé</Badge>
          </div>
          <Switch 
            id="container-scan" 
            checked={securityOptions.containerScan}
            onCheckedChange={(checked) => updateConfig({
              containerScan: checked
            })}
          />
        </div>
        
        <div className="flex items-center space-x-3 justify-between">
          <Label htmlFor="sbom">Génération SBOM</Label>
          <Switch 
            id="sbom" 
            checked={securityOptions.sbomGeneration}
            onCheckedChange={(checked) => updateConfig({
              sbomGeneration: checked
            })}
          />
        </div>
        
        <div className="flex items-center space-x-3 justify-between">
          <Label htmlFor="zero-trust">Réseau Zero Trust</Label>
          <Switch 
            id="zero-trust" 
            checked={securityOptions.zeroTrustNetworking}
            onCheckedChange={(checked) => updateConfig({
              zeroTrustNetworking: checked
            })}
          />
        </div>
        
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex items-center">
            <Label htmlFor="auto-patch">Correctif auto des vulnérabilités</Label>
            <Badge className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Premium</Badge>
          </div>
          <Switch 
            id="auto-patch" 
            checked={securityOptions.autoVulnPatching}
            onCheckedChange={(checked) => updateConfig({
              autoVulnPatching: checked
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSecurityFeatures;
