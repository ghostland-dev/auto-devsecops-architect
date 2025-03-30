
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectConfig } from "@/types/configurator";
import { useState } from "react";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LanguageFrameworkStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const LanguageFrameworkStep = ({ config, updateConfig }: LanguageFrameworkStepProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeTab, setActiveTab] = useState("popular");
  
  const languages = {
    popular: [
      {
        id: "javascript",
        name: "JavaScript",
        description: "Langage de script dynamique pour le web",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        id: "typescript",
        name: "TypeScript",
        description: "JavaScript avec typage statique",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        id: "python",
        name: "Python",
        description: "Langage interprété polyvalent",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        id: "java",
        name: "Java",
        description: "Langage objet multi-plateforme",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
    ],
    frontend: [
      {
        id: "javascript",
        name: "JavaScript",
        description: "Langage de script dynamique pour le web",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        id: "typescript",
        name: "TypeScript",
        description: "JavaScript avec typage statique",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
    ],
    backend: [
      {
        id: "nodejs",
        name: "Node.js",
        description: "JavaScript runtime côté serveur",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        id: "python",
        name: "Python",
        description: "Langage interprété polyvalent",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        id: "java",
        name: "Java",
        description: "Langage objet multi-plateforme",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        id: "go",
        name: "Go",
        description: "Langage compilé performant",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
      },
      {
        id: "ruby",
        name: "Ruby",
        description: "Langage dynamique élégant",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
      },
      {
        id: "php",
        name: "PHP",
        description: "Langage de script pour le web",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
        id: "csharp",
        name: "C#",
        description: "Langage Microsoft .NET",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      },
      {
        id: "rust",
        name: "Rust",
        description: "Langage système performant et sûr",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
      },
      {
        id: "cpp",
        name: "C++",
        description: "Langage de programmation système",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        id: "kotlin",
        name: "Kotlin",
        description: "Alternative moderne à Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      },
      {
        id: "elixir",
        name: "Elixir",
        description: "Fonctionnel et concurrent sur BEAM",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
      },
    ],
    fullstack: [
      {
        id: "nextjs",
        name: "Next.js",
        description: "Framework React fullstack",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        id: "nuxtjs",
        name: "Nuxt.js",
        description: "Framework Vue fullstack",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
      },
      {
        id: "django",
        name: "Django",
        description: "Framework Python complet",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      },
      {
        id: "rails",
        name: "Ruby on Rails",
        description: "Framework Ruby productif",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
      },
      {
        id: "laravel",
        name: "Laravel",
        description: "Framework PHP élégant",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
      },
      {
        id: "dotnet",
        name: "ASP.NET Core",
        description: "Framework Microsoft",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
      },
    ],
  };

  const frameworks = {
    javascript: [
      { id: "react", name: "React" },
      { id: "vue", name: "Vue.js" },
      { id: "angular", name: "Angular" },
      { id: "svelte", name: "Svelte" },
    ],
    typescript: [
      { id: "react", name: "React" },
      { id: "vue", name: "Vue.js" },
      { id: "angular", name: "Angular" },
      { id: "svelte", name: "Svelte" },
    ],
    nodejs: [
      { id: "express", name: "Express.js" },
      { id: "nest", name: "NestJS" },
      { id: "fastify", name: "Fastify" },
      { id: "koa", name: "Koa" },
    ],
    python: [
      { id: "django", name: "Django" },
      { id: "flask", name: "Flask" },
      { id: "fastapi", name: "FastAPI" },
      { id: "tornado", name: "Tornado" },
    ],
    java: [
      { id: "spring", name: "Spring Boot" },
      { id: "jsf", name: "Jakarta Faces (JSF)" },
      { id: "struts", name: "Struts" },
      { id: "vaadin", name: "Vaadin" },
      { id: "quarkus", name: "Quarkus" },
      { id: "micronaut", name: "Micronaut" },
    ],
    ruby: [
      { id: "rails", name: "Ruby on Rails" },
      { id: "sinatra", name: "Sinatra" },
    ],
    php: [
      { id: "laravel", name: "Laravel" },
      { id: "symfony", name: "Symfony" },
      { id: "codeigniter", name: "CodeIgniter" },
      { id: "zend", name: "Zend Framework" },
    ],
    csharp: [
      { id: "aspnetcore", name: "ASP.NET Core" },
      { id: "blazor", name: "Blazor" },
    ],
    go: [
      { id: "gin", name: "Gin" },
      { id: "echo", name: "Echo" },
      { id: "fiber", name: "Fiber" },
    ],
    rust: [
      { id: "rocket", name: "Rocket" },
      { id: "actixweb", name: "Actix Web" },
      { id: "warp", name: "Warp" },
    ],
    cpp: [
      { id: "webtoolkit", name: "Wt (WebToolkit)" },
      { id: "cpprestsdk", name: "C++ REST SDK" },
    ],
    kotlin: [
      { id: "ktor", name: "Ktor" },
      { id: "springkotlin", name: "Spring Boot (Kotlin)" },
    ],
    elixir: [
      { id: "phoenix", name: "Phoenix" },
    ],
    nextjs: [{ id: "nextjs", name: "Next.js" }],
    nuxtjs: [{ id: "nuxtjs", name: "Nuxt.js" }],
    django: [{ id: "django", name: "Django" }],
    rails: [{ id: "rails", name: "Ruby on Rails" }],
    laravel: [{ id: "laravel", name: "Laravel" }],
    dotnet: [{ id: "aspnetcore", name: "ASP.NET Core" }],
  };

  const getLanguagesForTab = () => {
    return languages[activeTab as keyof typeof languages] || [];
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1' : 'grid-cols-4'}`}>
            <TabsTrigger value="popular" className={isMobile ? 'text-xs py-1 px-1.5' : ''}>Populaires</TabsTrigger>
            <TabsTrigger value="frontend" className={isMobile ? 'text-xs py-1 px-1.5' : ''}>Frontend</TabsTrigger>
            <TabsTrigger value="backend" className={isMobile ? 'text-xs py-1 px-1.5' : ''}>Backend</TabsTrigger>
            <TabsTrigger value="fullstack" className={isMobile ? 'text-xs py-1 px-1.5' : ''}>Fullstack</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <RadioGroup
          value={config.language}
          onValueChange={(value) => updateConfig({ language: value, framework: "" })}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {getLanguagesForTab().map((language) => (
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
