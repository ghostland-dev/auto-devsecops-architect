
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProjectConfig } from "@/types/configurator";

interface CloudProviderStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const CloudProviderStep = ({ config, updateConfig }: CloudProviderStepProps) => {
  const cloudProviders = [
    {
      id: "aws",
      name: "Amazon Web Services",
      description: "Infrastructure cloud complète d'Amazon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="#FF9900">
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.843 4.843 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.399-.287-.767-.415l-1.077-.336c-.537-.168-.918-.399-1.141-.687-.224-.287-.336-.631-.336-1.03 0-.439.136-.83.407-1.173.271-.336.646-.599 1.125-.79.478-.192 1.03-.288 1.652-.288.319 0 .638.024.959.056.319.04.63.104.934.184.144.048.255.111.336.191a.5.5 0 0 1 .12.328v.375c0 .167-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.077.223-.263.143-.39.335-.39.583 0 .168.048.32.143.447.096.128.271.24.535.336l1.04.32c.535.16.926.383 1.163.67.239.288.359.639.359 1.062 0 .447-.136.846-.407 1.182-.272.336-.652.607-1.142.806-.49.192-1.061.288-1.708.288zm-7.658-13.279c-.143.071-.335.071-.479 0-.151-.083-.231-.239-.231-.415V2.246c0-.176.08-.332.231-.415a.507.507 0 0 1 .479 0c.152.083.232.239.232.415v2.387c0 .176-.08.24-.232.415zm.886-.082c.151.072.223.095.375.024.152-.083.224-.239.224-.415V.99c0-.176-.08-.332-.231-.415-.144-.071-.336-.071-.479 0-.151.083-.232.239-.232.415v2.387c0 .176.08.24.343.247zm1.5-.112c.152.072.344.072.487 0 .144-.083.223-.239.223-.415V.181c0-.176-.079-.332-.223-.415-.151-.071-.343-.071-.487 0-.143.083-.223.239-.223.415v1.885c0 .176.08.332.223.415z" />
        </svg>
      ),
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      description: "Services cloud Microsoft Azure",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="#0078D4">
          <path d="M13.05 4.24L6.56 18.05 2 18l5.09-8.76 5.96-5m.7 1.09L22 19.76H6.74l9.3-1.66-4.87-5.79 2.58-7z" />
        </svg>
      ),
    },
    {
      id: "gcp",
      name: "Google Cloud Platform",
      description: "Infrastructure cloud de Google",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M5.13 12.194l4.04-7.01 4.04 7.01-4.04 7.01z" />
          <path fill="#4285F4" d="M5.13 12.194l4.04 7.01-4.04 7.01-4.04-7.01z" />
          <path fill="#FBBC05" d="M5.13 12.194l-4.04-7.01 4.04-7.01 4.04 7.01z" />
          <path fill="#34A853" d="M18.79 5.184l4.04 7.01-4.04 7.01-4.04-7.01z" />
          <path fill="#4285F4" d="M14.75 12.194l4.04-7.01 4.04 7.01-4.04 7.01z" />
          <path fill="#EA4335" d="M5.13 12.194l4.04-7.01 9.62 0-4.04 7.01z" />
        </svg>
      ),
    },
    {
      id: "digitalocean",
      name: "DigitalOcean",
      description: "Cloud simplifié pour développeurs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="#0080FF">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM6.41463 13.0569H9.46342V16.1138H12.5203V13.0569H15.5691V10.0081H12.5203V6.96098H9.46342V10.0081H6.41463V13.0569ZM15.5691 15.5691H18.6179V12.5203H15.5691V15.5691ZM12.5203 18.6179H15.5691V15.5691H12.5203V18.6179Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Cloud Provider</h2>
        <p className="text-slate-600 mb-6">
          Sélectionnez le fournisseur cloud sur lequel vous souhaitez déployer
        </p>
        
        <RadioGroup
          value={config.cloudProvider}
          onValueChange={(value) => updateConfig({ cloudProvider: value })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {cloudProviders.map((provider) => (
            <div key={provider.id}>
              <RadioGroupItem 
                value={provider.id} 
                id={provider.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={provider.id}
                className="flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 h-full"
              >
                <div className="mb-4">
                  {provider.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-lg">{provider.name}</div>
                  <div className="text-sm text-slate-500">{provider.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {config.cloudProvider && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Environnements</h2>
          <p className="text-slate-600 mb-6">
            Sélectionnez les environnements pour lesquels générer des configurations
          </p>
          
          <div className="flex flex-wrap gap-4">
            {["dev", "staging", "prod"].map((env) => (
              <div key={env} className="flex items-center">
                <input
                  type="checkbox"
                  id={`env-${env}`}
                  checked={config.environments?.includes(env)}
                  onChange={(e) => {
                    const newEnvironments = e.target.checked
                      ? [...(config.environments || []), env]
                      : (config.environments || []).filter((e) => e !== env);
                    updateConfig({ environments: newEnvironments });
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`env-${env}`} className="ml-2 block text-sm text-gray-900">
                  {env === "dev" ? "Development" : env === "staging" ? "Staging" : "Production"}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudProviderStep;
