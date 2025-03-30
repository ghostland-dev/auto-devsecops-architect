
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileCheck, BarChart, CheckSquare } from "lucide-react";
import { ProjectConfig } from "@/types/configurator";

interface SecurityStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const SecurityStep = ({ config, updateConfig }: SecurityStepProps) => {
  const [activeTab, setActiveTab] = useState("staticAnalysis");
  
  // Initialisez les options de sécurité si elles n'existent pas encore
  if (!config.securityOptions) {
    updateConfig({
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
  }

  const staticAnalysisTools = [
    { id: "sonarqube", name: "SonarQube" },
    { id: "snyk", name: "Snyk" },
    { id: "checkmarx", name: "Checkmarx" },
    { id: "trivy", name: "Trivy" },
    { id: "prismacloud", name: "Prisma Cloud" },
  ];

  const secretsManagementTools = [
    { id: "vault", name: "HashiCorp Vault" },
    { id: "aws-secrets", name: "AWS Secrets Manager" },
    { id: "azure-keyvault", name: "Azure Key Vault" },
    { id: "gcp-secretmanager", name: "GCP Secret Manager" },
  ];

  const complianceStandards = [
    { id: "cis", name: "CIS Benchmarks" },
    { id: "nist", name: "NIST 800-53" },
    { id: "pci-dss", name: "PCI DSS" },
    { id: "hipaa", name: "HIPAA" },
    { id: "gdpr", name: "GDPR" },
    { id: "iso27001", name: "ISO 27001" },
  ];

  const handleStaticAnalysisChange = (toolId: string, checked: boolean) => {
    const currentTools = config.securityOptions?.staticAnalysis || [];
    const updatedTools = checked
      ? [...currentTools, toolId]
      : currentTools.filter(id => id !== toolId);
    
    updateConfig({
      securityOptions: {
        ...config.securityOptions,
        staticAnalysis: updatedTools
      }
    });
  };

  const handleComplianceChange = (standardId: string, checked: boolean) => {
    const currentStandards = config.securityOptions?.complianceStandards || [];
    const updatedStandards = checked
      ? [...currentStandards, standardId]
      : currentStandards.filter(id => id !== standardId);
    
    updateConfig({
      securityOptions: {
        ...config.securityOptions,
        complianceStandards: updatedStandards
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sécurité et Conformité</h2>
        <p className="text-slate-600 mb-6">
          Configurez les outils et politiques de sécurité pour votre pipeline DevSecOps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium">Analyse Statique (SAST)</h3>
              </div>
              
              <div className="space-y-4">
                {staticAnalysisTools.map((tool) => (
                  <div key={tool.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`sast-${tool.id}`} 
                      checked={config.securityOptions?.staticAnalysis?.includes(tool.id)}
                      onCheckedChange={(checked) => 
                        handleStaticAnalysisChange(tool.id, checked === true)
                      }
                    />
                    <Label htmlFor={`sast-${tool.id}`}>{tool.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Lock className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium">Gestion des Secrets</h3>
              </div>
              
              <RadioGroup
                value={config.securityOptions?.secretsManagement || ""}
                onValueChange={(value) => updateConfig({
                  securityOptions: {
                    ...config.securityOptions,
                    secretsManagement: value
                  }
                })}
                className="space-y-2"
              >
                {secretsManagementTools.map((tool) => (
                  <div key={tool.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={tool.id} id={`secret-${tool.id}`} />
                    <Label htmlFor={`secret-${tool.id}`}>{tool.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <FileCheck className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium">Standards de Conformité</h3>
              </div>
              
              <div className="space-y-4">
                {complianceStandards.map((standard) => (
                  <div key={standard.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`compliance-${standard.id}`} 
                      checked={config.securityOptions?.complianceStandards?.includes(standard.id)}
                      onCheckedChange={(checked) => 
                        handleComplianceChange(standard.id, checked === true)
                      }
                    />
                    <Label htmlFor={`compliance-${standard.id}`}>{standard.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            
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
                    checked={config.securityOptions?.containerScan}
                    onCheckedChange={(checked) => updateConfig({
                      securityOptions: {
                        ...config.securityOptions,
                        containerScan: checked
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center space-x-3 justify-between">
                  <Label htmlFor="sbom">Génération SBOM</Label>
                  <Switch 
                    id="sbom" 
                    checked={config.securityOptions?.sbomGeneration}
                    onCheckedChange={(checked) => updateConfig({
                      securityOptions: {
                        ...config.securityOptions,
                        sbomGeneration: checked
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center space-x-3 justify-between">
                  <Label htmlFor="zero-trust">Réseau Zero Trust</Label>
                  <Switch 
                    id="zero-trust" 
                    checked={config.securityOptions?.zeroTrustNetworking}
                    onCheckedChange={(checked) => updateConfig({
                      securityOptions: {
                        ...config.securityOptions,
                        zeroTrustNetworking: checked
                      }
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
                    checked={config.securityOptions?.autoVulnPatching}
                    onCheckedChange={(checked) => updateConfig({
                      securityOptions: {
                        ...config.securityOptions,
                        autoVulnPatching: checked
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStep;
