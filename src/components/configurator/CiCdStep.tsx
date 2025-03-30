
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ProjectConfig } from "@/types/configurator";

interface CiCdStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const CiCdStep = ({ config, updateConfig }: CiCdStepProps) => {
  const cicdProviders = [
    {
      id: "github",
      name: "GitHub Actions",
      description: "CI/CD service intégré à GitHub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      id: "gitlab",
      name: "GitLab CI/CD",
      description: "Service CI/CD intégré à GitLab",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
        </svg>
      ),
    },
    {
      id: "jenkins",
      name: "Jenkins",
      description: "Serveur d'automatisation open-source",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="#D33833">
          <path d="M4.738 4.333h.037c2.374-2.105 5.848-2.704 8.914-1.562 3.066 1.142 5.295 3.949 5.716 7.162h.017c4.158.441 7.387 3.992 7.387 8.26 0 4.578-3.721 8.285-8.285 8.285H5.019c-2.461.064-4.586-1.717-4.92-4.142-.334-2.426 1.16-4.747 3.512-5.445.024-.197.034-.393.027-.59-.064-2.478 1.922-4.533 4.401-4.569l.004-.002c-.615-1.044-1.038-2.179-1.256-3.362-.18-1.08-.075-2.019.43-2.933.151-.273.346-.521.578-.739l.005-.003c-.7.143-1.372.354-2.013.628L4.738 4.333zM4.516 9.217c-.331.383-.604.8-.82 1.242-.77 1.564-.327 3.441.999 4.704 1.326 1.262 3.275 1.588 4.92.814 1.646-.774 2.695-2.404 2.656-4.137.01-.84-.234-1.664-.697-2.373-.63.709-1.338 1.34-2.115 1.879-.546.376-1.111.729-1.693 1.058-.582.329-1.467.714-2.512 1.158-1.045.445-1.276.543-1.563.641l.825-4.986zm13.08 3.02c-.173.241-.324.498-.447.765-.124.267-.219.545-.284.829h-.016c-.811-.041-1.608.323-2.152.981-.543.658-.747 1.518-.552 2.335.196.817.776 1.498 1.566 1.838.79.341 1.695.265 2.419-.204.724-.47 1.197-1.244 1.269-2.078.073-.833-.261-1.652-.9-2.205l.097-2.261zm-7.649 2.861c.471.501.878 1.062 1.209 1.667.331.604.583 1.243.751 1.901.168.659.25 1.336.246 2.015-.004.679-.089 1.358-.255 2.02v.02H5.019c-1.463.04-2.738-1.012-2.967-2.454-.229-1.441.622-2.834 1.965-3.217.051-.011.102-.021.153-.03.001-.143.019-.286.054-.427.112-.455.385-.849.757-1.097.373-.247.82-.34 1.256-.256.436.084.817.343 1.056.718.239.375.324.829.234 1.265-.089.436-.341.82-.697 1.063-.356.244-.799.337-1.229.26-.231.228-.366.536-.376.86.005.466.21.909.567 1.224.357.314.828.469 1.303.427h2.28c.046-.587.066-1.177.06-1.767-.023-1.073-.231-2.135-.617-3.15-.347-.914-.803-1.784-1.357-2.592z"/>
        </svg>
      ),
    },
  ];

  const containerRegistries = [
    { id: "dockerhub", name: "Docker Hub" },
    { id: "ghcr", name: "GitHub Container Registry" },
    { id: "ecr", name: "AWS ECR" },
    { id: "acr", name: "Azure Container Registry" },
    { id: "gcr", name: "Google Container Registry" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Fournisseur CI/CD</h2>
        <p className="text-slate-600 mb-6">
          Sélectionnez la plateforme CI/CD que vous souhaitez utiliser
        </p>
        
        <RadioGroup
          value={config.ciCdProvider}
          onValueChange={(value) => updateConfig({ ciCdProvider: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {cicdProviders.map((provider) => (
            <div key={provider.id}>
              <RadioGroupItem 
                value={provider.id} 
                id={provider.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={provider.id}
                className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 h-full"
              >
                <div className="mb-3">
                  {provider.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-sm text-slate-500">{provider.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {config.ciCdProvider && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Configuration du dépôt</h2>
          <p className="text-slate-600 mb-6">
            Informations sur votre dépôt de code et registry Docker
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="repo-url">URL du dépôt Git</Label>
              <Input 
                id="repo-url" 
                placeholder="https://github.com/organisation/projet"
                value={config.repositoryUrl}
                onChange={(e) => updateConfig({ repositoryUrl: e.target.value })}
              />
              <p className="text-sm text-slate-500">L'URL complète de votre dépôt Git</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="container-registry">Registry de conteneurs</Label>
              <select 
                id="container-registry"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={config.containerRegistry}
                onChange={(e) => updateConfig({ containerRegistry: e.target.value })}
              >
                <option value="">Sélectionnez un registry</option>
                {containerRegistries.map((registry) => (
                  <option key={registry.id} value={registry.id}>
                    {registry.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-slate-500">Où seront stockées vos images Docker</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CiCdStep;
