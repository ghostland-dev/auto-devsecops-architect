
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ProjectConfig } from "@/types/configurator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LanguageDetailsStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const LanguageDetailsStep = ({ config, updateConfig }: LanguageDetailsStepProps) => {
  const [newLibrary, setNewLibrary] = useState("");

  const getVersionOptions = () => {
    switch (config.language) {
      case "nodejs":
        return ["18", "16", "14", "12"];
      case "python":
        return ["3.11", "3.10", "3.9", "3.8", "3.7"];
      case "java":
        return ["17", "11", "8"];
      case "go":
        return ["1.19", "1.18", "1.17", "1.16"];
      default:
        return [];
    }
  };

  const getBuildToolOptions = () => {
    switch (config.language) {
      case "nodejs":
        return ["npm", "yarn", "pnpm"];
      case "python":
        return ["pip", "poetry", "pipenv"];
      case "java":
        return ["maven", "gradle", "ant"];
      case "go":
        return ["go build", "make"];
      default:
        return [];
    }
  };

  const getFrameworkVersionOptions = () => {
    if (!config.framework) return [];

    switch (config.framework) {
      case "express":
        return ["4.18", "4.17", "4.16"];
      case "django":
        return ["4.2", "4.1", "3.2"];
      case "spring":
        return ["3.0", "2.7", "2.6"];
      case "gin":
        return ["1.9", "1.8", "1.7"];
      default:
        return [];
    }
  };

  const getFrameworkFeatures = () => {
    switch (config.framework) {
      case "express":
        return ["Authentication", "Validation", "ORM", "GraphQL", "Swagger"];
      case "django":
        return ["Admin", "REST Framework", "Channels", "Celery", "GraphQL"];
      case "spring":
        return ["Security", "Data JPA", "WebFlux", "Actuator", "Cloud"];
      case "gin":
        return ["JWT", "Swagger", "GORM", "Validation", "Logging"];
      default:
        return [];
    }
  };

  const updateLanguageDetails = (field: keyof typeof config.languageDetails, value: any) => {
    const current = config.languageDetails || {};
    updateConfig({
      languageDetails: {
        ...current,
        [field]: value
      }
    });
  };

  const updateFrameworkDetails = (field: keyof typeof config.frameworkDetails, value: any) => {
    const current = config.frameworkDetails || {};
    updateConfig({
      frameworkDetails: {
        ...current,
        [field]: value
      }
    });
  };

  const addLibrary = () => {
    if (!newLibrary.trim()) return;
    
    const current = config.languageDetails?.additionalLibraries || [];
    if (!current.includes(newLibrary)) {
      updateLanguageDetails('additionalLibraries', [...current, newLibrary]);
      setNewLibrary("");
    }
  };

  const removeLibrary = (library: string) => {
    const current = config.languageDetails?.additionalLibraries || [];
    updateLanguageDetails(
      'additionalLibraries', 
      current.filter(lib => lib !== library)
    );
  };

  const toggleFrameworkFeature = (feature: string) => {
    const current = config.frameworkDetails?.features || [];
    if (current.includes(feature)) {
      updateFrameworkDetails(
        'features', 
        current.filter(f => f !== feature)
      );
    } else {
      updateFrameworkDetails('features', [...current, feature]);
    }
  };

  return (
    <div className="space-y-8">
      {config.language && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Détails de {config.language}</h2>
          <p className="text-slate-600 mb-6">
            Spécifiez les détails d'implémentation pour votre langage
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language-version">Version</Label>
                  <Select
                    value={config.languageDetails?.version || ""}
                    onValueChange={(value) => updateLanguageDetails('version', value)}
                  >
                    <SelectTrigger id="language-version">
                      <SelectValue placeholder="Sélectionnez une version" />
                    </SelectTrigger>
                    <SelectContent>
                      {getVersionOptions().map((version) => (
                        <SelectItem key={version} value={version}>
                          {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="build-tool">Outil de build</Label>
                  <Select
                    value={config.languageDetails?.buildTool || ""}
                    onValueChange={(value) => updateLanguageDetails('buildTool', value)}
                  >
                    <SelectTrigger id="build-tool">
                      <SelectValue placeholder="Sélectionnez un outil de build" />
                    </SelectTrigger>
                    <SelectContent>
                      {getBuildToolOptions().map((tool) => (
                        <SelectItem key={tool} value={tool}>
                          {tool}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="custom-docker">Image Docker personnalisée (optionnel)</Label>
                  <Input
                    id="custom-docker"
                    value={config.languageDetails?.customDockerImage || ""}
                    onChange={(e) => updateLanguageDetails('customDockerImage', e.target.value)}
                    placeholder="Ex: node:18-alpine-custom"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Bibliothèques additionnelles</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {config.languageDetails?.additionalLibraries?.map((lib) => (
                      <Badge key={lib} variant="secondary" className="flex items-center gap-1">
                        {lib}
                        <button 
                          onClick={() => removeLibrary(lib)}
                          className="ml-1 bg-slate-200 rounded-full h-4 w-4 flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newLibrary}
                      onChange={(e) => setNewLibrary(e.target.value)}
                      placeholder="Ajouter une bibliothèque"
                      className="flex-grow"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLibrary())}
                    />
                    <Button onClick={addLibrary} type="button">Ajouter</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {config.framework && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Détails de {config.framework}</h2>
          <p className="text-slate-600 mb-6">
            Spécifiez les détails d'implémentation pour votre framework
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="framework-version">Version</Label>
                  <Select
                    value={config.frameworkDetails?.version || ""}
                    onValueChange={(value) => updateFrameworkDetails('version', value)}
                  >
                    <SelectTrigger id="framework-version">
                      <SelectValue placeholder="Sélectionnez une version" />
                    </SelectTrigger>
                    <SelectContent>
                      {getFrameworkVersionOptions().map((version) => (
                        <SelectItem key={version} value={version}>
                          {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fonctionnalités</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {getFrameworkFeatures().map((feature) => {
                      const isSelected = config.frameworkDetails?.features?.includes(feature) || false;
                      return (
                        <div key={feature} className="flex items-center space-x-2">
                          <Switch 
                            id={`feature-${feature}`}
                            checked={isSelected}
                            onCheckedChange={() => toggleFrameworkFeature(feature)}
                          />
                          <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-config">Configuration personnalisée</Label>
                  <Textarea
                    id="custom-config"
                    value={config.frameworkDetails?.customConfig || ""}
                    onChange={(e) => updateFrameworkDetails('customConfig', e.target.value)}
                    placeholder="Configuration spécifique à votre framework (JSON, YAML, etc.)"
                    rows={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LanguageDetailsStep;
