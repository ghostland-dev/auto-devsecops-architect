
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code, GitBranch, Cloud, Server, Shield, PackageOpen, Send, FileText } from "lucide-react";

interface ConfiguratorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ConfiguratorSidebar = ({ activeTab, setActiveTab }: ConfiguratorSidebarProps) => {
  const steps = [
    {
      id: "project",
      name: "Projet & Organisation",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "language",
      name: "Langage & Framework",
      icon: <Code className="h-5 w-5" />,
    },
    {
      id: "language-details",
      name: "Détails techniques",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      id: "cicd",
      name: "CI/CD",
      icon: <GitBranch className="h-5 w-5" />,
    },
    {
      id: "cloud",
      name: "Cloud Provider",
      icon: <Cloud className="h-5 w-5" />,
    },
    {
      id: "deployment",
      name: "Déploiement",
      icon: <Server className="h-5 w-5" />,
    },
    {
      id: "security",
      name: "Sécurité",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "delivery",
      name: "Livraison",
      icon: <Send className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Étapes</h2>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <Button 
            key={step.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              activeTab === step.id && "bg-slate-200 hover:bg-slate-300"
            )}
            onClick={() => setActiveTab(step.id)}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700">
              {step.icon}
            </div>
            <span>{step.name}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default ConfiguratorSidebar;
