
import { ProjectConfig } from "@/types/configurator";
import StaticAnalysisSection from "@/components/configurator/security/StaticAnalysisSection";
import SecretsManagementSection from "@/components/configurator/security/SecretsManagementSection";
import ComplianceStandardsSection from "@/components/configurator/security/ComplianceStandardsSection";
import AdvancedSecurityFeatures from "@/components/configurator/security/AdvancedSecurityFeatures";

interface SecurityStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const SecurityStep = ({ config, updateConfig }: SecurityStepProps) => {
  // Initialize security options if they don't exist yet
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sécurité et Conformité</h2>
        <p className="text-slate-600 mb-6">
          Configurez les outils et politiques de sécurité pour votre pipeline DevSecOps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <StaticAnalysisSection 
              staticAnalysis={config.securityOptions?.staticAnalysis || []}
              updateConfig={(staticAnalysis) => updateConfig({
                securityOptions: {
                  ...config.securityOptions,
                  staticAnalysis
                }
              })}
            />
            
            <SecretsManagementSection 
              secretsManagement={config.securityOptions?.secretsManagement || ""}
              updateConfig={(secretsManagement) => updateConfig({
                securityOptions: {
                  ...config.securityOptions,
                  secretsManagement
                }
              })}
            />
          </div>
          
          <div className="space-y-6">
            <ComplianceStandardsSection 
              complianceStandards={config.securityOptions?.complianceStandards || []}
              updateConfig={(complianceStandards) => updateConfig({
                securityOptions: {
                  ...config.securityOptions,
                  complianceStandards
                }
              })}
            />
            
            <AdvancedSecurityFeatures 
              securityOptions={config.securityOptions || {
                staticAnalysis: [],
                secretsManagement: "",
                complianceStandards: [],
                containerScan: false,
                sbomGeneration: false,
                zeroTrustNetworking: false,
                autoVulnPatching: false,
              }}
              updateConfig={(updatedOptions) => updateConfig({
                securityOptions: {
                  ...config.securityOptions,
                  ...updatedOptions
                }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStep;
