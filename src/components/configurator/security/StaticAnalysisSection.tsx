
import { Shield } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StaticAnalysisSectionProps {
  staticAnalysis: string[];
  updateConfig: (staticAnalysis: string[]) => void;
}

const StaticAnalysisSection = ({ staticAnalysis, updateConfig }: StaticAnalysisSectionProps) => {
  const staticAnalysisTools = [
    { id: "sonarqube", name: "SonarQube" },
    { id: "snyk", name: "Snyk" },
    { id: "checkmarx", name: "Checkmarx" },
    { id: "trivy", name: "Trivy" },
    { id: "prismacloud", name: "Prisma Cloud" },
  ];

  const handleStaticAnalysisChange = (toolId: string, checked: boolean) => {
    const updatedTools = checked
      ? [...staticAnalysis, toolId]
      : staticAnalysis.filter(id => id !== toolId);
    
    updateConfig(updatedTools);
  };

  return (
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
              checked={staticAnalysis.includes(tool.id)}
              onCheckedChange={(checked) => 
                handleStaticAnalysisChange(tool.id, checked === true)
              }
            />
            <Label htmlFor={`sast-${tool.id}`}>{tool.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticAnalysisSection;
