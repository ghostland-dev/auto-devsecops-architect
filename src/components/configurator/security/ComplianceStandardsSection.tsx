
import { FileCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ComplianceStandardsSectionProps {
  complianceStandards: string[];
  updateConfig: (complianceStandards: string[]) => void;
}

const ComplianceStandardsSection = ({ complianceStandards, updateConfig }: ComplianceStandardsSectionProps) => {
  const complianceStandardsList = [
    { id: "cis", name: "CIS Benchmarks" },
    { id: "nist", name: "NIST 800-53" },
    { id: "pci-dss", name: "PCI DSS" },
    { id: "hipaa", name: "HIPAA" },
    { id: "gdpr", name: "GDPR" },
    { id: "iso27001", name: "ISO 27001" },
  ];

  const handleComplianceChange = (standardId: string, checked: boolean) => {
    const updatedStandards = checked
      ? [...complianceStandards, standardId]
      : complianceStandards.filter(id => id !== standardId);
    
    updateConfig(updatedStandards);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <FileCheck className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Standards de Conformité</h3>
      </div>
      
      <div className="space-y-4">
        {complianceStandardsList.map((standard) => (
          <div key={standard.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`compliance-${standard.id}`} 
              checked={complianceStandards.includes(standard.id)}
              onCheckedChange={(checked) => 
                handleComplianceChange(standard.id, checked === true)
              }
            />
            <Label htmlFor={`compliance-${standard.id}`}>{standard.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceStandardsSection;
