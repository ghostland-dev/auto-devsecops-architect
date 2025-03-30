
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectConfig } from "@/types/configurator";
import { DeliveryMethod } from "@/types/configurator";
import { Info } from "lucide-react";

interface DeliveryMethodStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const DeliveryMethodStep = ({ config, updateConfig }: DeliveryMethodStepProps) => {
  const [useEncryption, setUseEncryption] = useState(
    !!config.deliveryMethod?.details.encryptionKey
  );

  const updateDeliveryMethod = (type: DeliveryMethod['type']) => {
    const currentDetails = config.deliveryMethod?.details || {};
    updateConfig({
      deliveryMethod: {
        type,
        details: currentDetails
      }
    });
  };

  const updateDeliveryDetails = (field: keyof DeliveryMethod['details'], value: string) => {
    const current = config.deliveryMethod || {
      type: config.deliveryMethod?.type || "github",
      details: {}
    };
    
    updateConfig({
      deliveryMethod: {
        ...current,
        details: {
          ...current.details,
          [field]: value
        }
      }
    });
  };

  const handleEncryptionToggle = (enabled: boolean) => {
    setUseEncryption(enabled);
    if (!enabled) {
      // Supprimer la clé de chiffrement si l'option est désactivée
      const current = config.deliveryMethod || {
        type: config.deliveryMethod?.type || "github",
        details: {}
      };
      
      const { encryptionKey, ...otherDetails } = current.details;
      
      updateConfig({
        deliveryMethod: {
          ...current,
          details: otherDetails
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Méthode de livraison</h2>
        <p className="text-slate-600 mb-6">
          Choisissez comment vous souhaitez recevoir vos fichiers générés
        </p>

        <RadioGroup
          value={config.deliveryMethod?.type || "github"}
          onValueChange={(value: "github" | "mail" | "custom") => updateDeliveryMethod(value)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem 
              value="github" 
              id="method-github"
              className="peer sr-only"
            />
            <Label
              htmlFor="method-github"
              className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 h-full"
            >
              <svg className="w-10 h-10 mb-2" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/>
              </svg>
              <div className="font-medium">GitHub</div>
              <div className="text-sm text-slate-500 text-center">
                Création d'un dépôt et envoi des fichiers
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem 
              value="mail" 
              id="method-mail"
              className="peer sr-only"
            />
            <Label
              htmlFor="method-mail"
              className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 h-full"
            >
              <svg className="w-10 h-10 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#24292f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="#24292f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="font-medium">Email</div>
              <div className="text-sm text-slate-500 text-center">
                Réception des fichiers par email
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem 
              value="custom" 
              id="method-custom"
              className="peer sr-only"
            />
            <Label
              htmlFor="method-custom"
              className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 h-full"
            >
              <svg className="w-10 h-10 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H4C2.89543 11 2 11.8954 2 13V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V13C22 11.8954 21.1046 11 20 11Z" stroke="#24292f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#24292f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="font-medium">Dépôt personnalisé</div>
              <div className="text-sm text-slate-500 text-center">
                Livraison vers un dépôt sécurisé
              </div>
            </Label>
          </div>
        </RadioGroup>

        {config.deliveryMethod?.type === "github" && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-repo">URL du dépôt GitHub</Label>
                  <Input
                    id="github-repo"
                    value={config.deliveryMethod?.details.repository || ""}
                    onChange={(e) => updateDeliveryDetails('repository', e.target.value)}
                    placeholder="https://github.com/username/repository"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github-token">Token d'authentification GitHub</Label>
                  <Input
                    id="github-token"
                    type="password"
                    value={config.deliveryMethod?.details.authToken || ""}
                    onChange={(e) => updateDeliveryDetails('authToken', e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="text-sm text-slate-500">
                    Vous pouvez créer un token d'accès personnel sur GitHub dans Paramètres &gt; Paramètres développeur
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {config.deliveryMethod?.type === "mail" && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-address">Adresse email</Label>
                  <Input
                    id="email-address"
                    type="email"
                    value={config.deliveryMethod?.details.email || ""}
                    onChange={(e) => updateDeliveryDetails('email', e.target.value)}
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-encryption"
                    checked={useEncryption}
                    onCheckedChange={handleEncryptionToggle}
                  />
                  <Label htmlFor="use-encryption">Chiffrer l'archive</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        L'archive sera chiffrée avec le mot de passe fourni
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {useEncryption && (
                  <div className="space-y-2">
                    <Label htmlFor="encryption-key">Mot de passe de chiffrement</Label>
                    <Input
                      id="encryption-key"
                      type="password"
                      value={config.deliveryMethod?.details.encryptionKey || ""}
                      onChange={(e) => updateDeliveryDetails('encryptionKey', e.target.value)}
                      placeholder="Mot de passe pour déchiffrer l'archive"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {config.deliveryMethod?.type === "custom" && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-url">URL du dépôt personnalisé</Label>
                  <Input
                    id="custom-url"
                    value={config.deliveryMethod?.details.customUrl || ""}
                    onChange={(e) => updateDeliveryDetails('customUrl', e.target.value)}
                    placeholder="https://depot.votreentreprise.com/projet"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="custom-token">Token d'authentification</Label>
                  <Input
                    id="custom-token"
                    type="password"
                    value={config.deliveryMethod?.details.authToken || ""}
                    onChange={(e) => updateDeliveryDetails('authToken', e.target.value)}
                    placeholder="Token d'authentification"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-encryption-custom"
                    checked={useEncryption}
                    onCheckedChange={handleEncryptionToggle}
                  />
                  <Label htmlFor="use-encryption-custom">Chiffrer les fichiers</Label>
                </div>
                
                {useEncryption && (
                  <div className="space-y-2">
                    <Label htmlFor="encryption-key-custom">Clé de chiffrement</Label>
                    <Input
                      id="encryption-key-custom"
                      type="password"
                      value={config.deliveryMethod?.details.encryptionKey || ""}
                      onChange={(e) => updateDeliveryDetails('encryptionKey', e.target.value)}
                      placeholder="Clé pour le chiffrement des fichiers"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DeliveryMethodStep;
