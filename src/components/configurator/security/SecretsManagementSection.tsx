
import { Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SecretsManagementSectionProps {
  secretsManagement: string;
  updateConfig: (secretsManagement: string) => void;
}

const SecretsManagementSection = ({ secretsManagement, updateConfig }: SecretsManagementSectionProps) => {
  const secretsManagementTools = [
    { id: "vault", name: "HashiCorp Vault" },
    { id: "aws-secrets", name: "AWS Secrets Manager" },
    { id: "azure-keyvault", name: "Azure Key Vault" },
    { id: "gcp-secretmanager", name: "GCP Secret Manager" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <Lock className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Gestion des Secrets</h3>
      </div>
      
      <RadioGroup
        value={secretsManagement}
        onValueChange={updateConfig}
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
  );
};

export default SecretsManagementSection;
