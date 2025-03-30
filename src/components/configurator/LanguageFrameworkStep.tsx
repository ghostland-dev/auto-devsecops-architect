
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectConfig } from "@/types/configurator";

interface LanguageFrameworkStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const LanguageFrameworkStep = ({ config, updateConfig }: LanguageFrameworkStepProps) => {
  const languages = [
    {
      id: "nodejs",
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      id: "python",
      name: "Python",
      description: "Interpreted high-level general-purpose programming language",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      id: "java",
      name: "Java",
      description: "High-level, class-based, object-oriented programming language",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      id: "go",
      name: "Go",
      description: "Statically typed, compiled programming language",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
  ];

  const frameworks = {
    nodejs: [
      { id: "express", name: "Express" },
      { id: "nest", name: "NestJS" },
      { id: "fastify", name: "Fastify" },
      { id: "koa", name: "Koa" },
    ],
    python: [
      { id: "django", name: "Django" },
      { id: "flask", name: "Flask" },
      { id: "fastapi", name: "FastAPI" },
      { id: "pyramid", name: "Pyramid" },
    ],
    java: [
      { id: "spring", name: "Spring Boot" },
      { id: "quarkus", name: "Quarkus" },
      { id: "micronaut", name: "Micronaut" },
    ],
    go: [
      { id: "gin", name: "Gin" },
      { id: "echo", name: "Echo" },
      { id: "fiber", name: "Fiber" },
    ],
  };

  const getFrameworksForLanguage = () => {
    if (!config.language) return [];
    return frameworks[config.language as keyof typeof frameworks] || [];
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Langage de programmation</h2>
        <p className="text-slate-600 mb-6">
          Sélectionnez le langage principal de votre application
        </p>
        
        <RadioGroup
          value={config.language}
          onValueChange={(value) => updateConfig({ language: value, framework: "" })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {languages.map((language) => (
            <div key={language.id}>
              <RadioGroupItem 
                value={language.id} 
                id={language.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={language.id}
                className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-indigo-600 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50"
              >
                <img 
                  src={language.icon} 
                  alt={language.name} 
                  className="w-10 h-10 mr-4 flex-shrink-0"
                />
                <div>
                  <div className="font-medium">{language.name}</div>
                  <div className="text-sm text-slate-500">{language.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {config.language && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Framework</h2>
          <p className="text-slate-600 mb-6">
            Choisissez le framework utilisé pour votre application
          </p>
          
          <Select 
            value={config.framework} 
            onValueChange={(value) => updateConfig({ framework: value })}
          >
            <SelectTrigger className="w-full md:w-96">
              <SelectValue placeholder="Sélectionnez un framework" />
            </SelectTrigger>
            <SelectContent>
              {getFrameworksForLanguage().map((framework) => (
                <SelectItem key={framework.id} value={framework.id}>
                  {framework.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default LanguageFrameworkStep;
