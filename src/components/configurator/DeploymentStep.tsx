
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectConfig } from "@/types/configurator";

interface DeploymentStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const DeploymentStep = ({ config, updateConfig }: DeploymentStepProps) => {
  const deploymentTypes = [
    {
      id: "kubernetes",
      name: "Kubernetes",
      description: "Déploiement orchestré via Kubernetes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#326CE5" d="M12.001 2c-.388 0-.771.116-1.09.338L4.338 7.662c-.636.437-.953 1.245-.953 2v6.676c0 .756.317 1.564.953 2.002l6.573 5.324c.636.437 1.544.437 2.18 0l6.573-5.324c.636-.438.953-1.246.953-2.002V9.662c0-.755-.317-1.563-.953-2L13.09 2.338A1.857 1.857 0 0012 2zm-.018 4.005c.21 0 .419.036.619.108a.776.776 0 01.33.259.97.97 0 01.185.388l.826 3.157.208.037a3.67 3.67 0 011.37.745l.383-.18 3.004-1.385c.143-.52.276-.88.402-.108a.697.697 0 01.402.079.83.83 0 01.287.316.642.642 0 01.059.431.75.75 0 01-.215.373l-2.092 2.5-.002.059a3.684 3.684 0 01.13 1.515l.36.232 2.996 1.42c.13.079.23.18.3.302a.77.77 0 010 .775.819.819 0 01-.3.301.766.766 0 01-.794.044l-3.083-1.35-.123.08c-.449.288-.96.5-1.503.625l-.059.357-.784 3.171a.766.766 0 01-.187.387.779.779 0 01-.33.259.822.822 0 01-.807-.002.775.775 0 01-.328-.26.968.968 0 01-.187-.386l-.783-3.171-.059-.357a3.647 3.647 0 01-1.516-.63l-.114-.075-3.084 1.35a.749.749 0 01-.393.073.67.67 0 01-.372-.117.811.811 0 01-.301-.301.767.767 0 01.015-.774.809.809 0 01.285-.288l2.996-1.42.037-.232a3.684 3.684 0 01.13-1.515l-.003-.059-2.092-2.5a.75.75 0 01-.215-.373.642.642 0 01.059-.431.83.83 0 01.287-.316.697.697 0 01.402-.079c.126.02.26.057.402.108l3.004 1.386.383.179a3.67 3.67 0 011.37-.745l.209-.037.825-3.157a.97.97 0 01.185-.388.776.776 0 01.33-.259c.2-.072.41-.108.62-.108zm.025 2.88a.316.316 0 00-.316.315v.631a.316.316 0 00.316.316.316.316 0 00.316-.316v-.631a.316.316 0 00-.316-.315zm-1.87.734a.316.316 0 00-.271.477l.316.547a.316.316 0 00.433.115.316.316 0 00.115-.432l-.316-.547a.316.316 0 00-.276-.16zm3.738 0a.316.316 0 00-.276.16l-.316.547a.316.316 0 00.115.432.316.316 0 00.433-.115l.316-.547a.316.316 0 00-.272-.477zM12 10.525a1.476 1.476 0 00-1.474 1.475c0 .815.66 1.474 1.474 1.474.815 0 1.475-.659 1.475-1.474 0-.816-.66-1.475-1.475-1.475zm-2.944.764a.315.315 0 00-.315.315c0 .15.105.273.252.303l.568.158a.315.315 0 00.387-.224.316.316 0 00-.224-.388l-.568-.157a.316.316 0 00-.1-.007zm5.883.002l-.563.156a.316.316 0 00-.224.388.315.315 0 00.387.224l.563-.156a.316.316 0 00.224-.388.316.316 0 00-.387-.224zm-3.095 2.36a.316.316 0 00-.387.224l-.157.566a.315.315 0 00.224.388.316.316 0 00.387-.224l.157-.568a.315.315 0 00-.224-.387zm.316 0a.315.315 0 00-.224.387l.157.568a.316.316 0 00.387.224.315.315 0 00.223-.388l-.156-.566a.316.316 0 00-.387-.224zm-3.414.91a.316.316 0 00-.276.16l-.316.546a.317.317 0 00.548.317l.316-.546a.316.316 0 00-.272-.478zm6.466.002a.316.316 0 00-.276.16.316.316 0 00.115.432l.546.316a.316.316 0 00.433-.115.316.316 0 00-.115-.432l-.547-.316a.316.316 0 00-.156-.045zm-3.212.835a.316.316 0 00-.315.315v.63a.316.316 0 00.315.317.316.316 0 00.317-.316v-.631a.316.316 0 00-.317-.315z" />
        </svg>
      ),
    },
    {
      id: "helm",
      name: "Helm Charts",
      description: "Gestionnaire de packages pour Kubernetes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#0F1689" d="M11.974 0C5.358 0 0 5.35 0 11.974c0 6.623 5.358 11.979 11.974 11.979 6.624 0 11.995-5.356 11.995-11.979C23.969 5.35 18.598 0 11.974 0zM3.848 14.13l.28-.919c.023 0 .251.06.439.06 1.088 0 1.471-.793 1.617-1.206l.184-.544c.043-.128 5.29-14.179 5.29-14.179h4.27c.085.279.36 1.16.786 2.545a772.915 772.915 0 003.073 9.632c.125.367.535 1.883.492 2.425-.42.502-3.158.899-6.542.899-3.383-.001-9.491-.264-9.889-.713zm15.899-4.267c.524-.855.842-1.851.842-2.92 0-3.097-2.514-5.61-5.611-5.61-3.097 0-5.61 2.513-5.61 5.61 0 3.097 2.513 5.61 5.61 5.61 1.09 0 2.104-.311 2.965-.847.277.512.62.94.932 1.223-.024-2.015 1.932-2.08 1.932-2.08s-.762-.596-1.06-.985z" />
        </svg>
      ),
    },
    {
      id: "serverless",
      name: "Serverless",
      description: "Déploiement sans serveur (AWS Lambda, Azure Functions)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="#FD5750">
          <path d="M0 2.977h7.084v1.771h-7.084v-1.771zm0 14.16h7.084v1.771h-7.084v-1.771zm16.916-7.962h7.084v1.771h-7.084v-1.771zm-7.473 0h2.642v1.771h-2.642v-1.771zm4.425 0h2.642v1.771h-2.642v-1.771zm-13.868-3.094h7.084v1.771h-7.084v-1.771zm9.047 12.217h2.642v1.771h-2.642v-1.771zm4.413 0h2.642v1.771h-2.642v-1.771zm4.413 0h2.642v1.771h-2.642v-1.771zm-13.873 0h4.425v1.771h-4.425v-1.771zm0-4.274h7.084v1.771h-7.084v-1.771zm16.916-7.098h7.084v1.771h-7.084v-1.771z" />
        </svg>
      ),
    },
  ];

  const databases = [
    { id: "postgresql", name: "PostgreSQL" },
    { id: "mysql", name: "MySQL" },
    { id: "mongodb", name: "MongoDB" },
    { id: "none", name: "Aucune base de données" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Type de déploiement</h2>
        <p className="text-slate-600 mb-6">
          Choisissez comment vous souhaitez déployer votre application
        </p>
        
        <RadioGroup
          value={config.deploymentType}
          onValueChange={(value) => updateConfig({ deploymentType: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {deploymentTypes.map((deploymentType) => (
            <div key={deploymentType.id}>
              <RadioGroupItem 
                value={deploymentType.id} 
                id={deploymentType.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={deploymentType.id}
                className="flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 h-full"
              >
                <div className="mb-4">
                  {deploymentType.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-lg">{deploymentType.name}</div>
                  <div className="text-sm text-slate-500">{deploymentType.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {config.deploymentType && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Services et dépendances</h2>
          <p className="text-slate-600 mb-6">
            Sélectionnez les services qui seront déployés avec votre application
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Base de données</h3>
              <RadioGroup
                value={config.database}
                onValueChange={(value) => updateConfig({ database: value })}
                className="space-y-2"
              >
                {databases.map((database) => (
                  <div key={database.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={database.id} id={`db-${database.id}`} />
                    <Label htmlFor={`db-${database.id}`}>{database.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Services additionnels</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="redis" 
                    checked={config.useRedis}
                    onCheckedChange={(checked) => 
                      updateConfig({ useRedis: checked === true })
                    }
                  />
                  <Label htmlFor="redis">Redis (Cache)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rabbitmq" 
                    checked={config.useRabbitMq}
                    onCheckedChange={(checked) => 
                      updateConfig({ useRabbitMq: checked === true })
                    }
                  />
                  <Label htmlFor="rabbitmq">RabbitMQ (Messaging)</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentStep;
