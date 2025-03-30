
import { cn } from "@/lib/utils";

interface ConfiguratorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ConfiguratorSidebar = ({ activeTab, setActiveTab }: ConfiguratorSidebarProps) => {
  const steps = [
    {
      id: "language",
      name: "Langage & Framework",
      description: "Sélectionnez votre stack technique",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: "cicd",
      name: "CI/CD",
      description: "Configuration du pipeline",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      id: "cloud",
      name: "Cloud Provider",
      description: "Sélection du provider cloud",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      id: "deployment",
      name: "Déploiement",
      description: "Options de déploiement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-6">Configuration</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {index > 0 && (
              <div className={cn(
                "absolute left-5 -top-6 w-0.5 h-6",
                activeTab === step.id || steps.indexOf(steps.find(s => s.id === activeTab)!) > index 
                  ? "bg-indigo-600" 
                  : "bg-slate-300"
              )} />
            )}
            <button
              onClick={() => setActiveTab(step.id)}
              className={cn(
                "flex items-start w-full text-left",
                activeTab === step.id ? "text-indigo-600" : "text-slate-700"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full mr-3 flex-shrink-0",
                activeTab === step.id 
                  ? "bg-indigo-600 text-white" 
                  : steps.indexOf(steps.find(s => s.id === activeTab)!) > index 
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-slate-200 text-slate-700"
              )}>
                {steps.indexOf(steps.find(s => s.id === activeTab)!) > index ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>
              <div>
                <div className={cn(
                  "font-medium",
                  activeTab === step.id ? "text-indigo-600" : "text-slate-900"
                )}>
                  {step.name}
                </div>
                <div className="text-sm text-slate-500">{step.description}</div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfiguratorSidebar;
