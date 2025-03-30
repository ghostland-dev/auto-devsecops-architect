
import React from "react";
import Navbar from "@/components/Navbar";
import DocCard from "@/components/documentation/DocCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FileText, Code, Server, Shield, Cloud, BookOpen, File, GitBranch } from "lucide-react";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Documentation cards data
  const documentationCards = [
    {
      id: "getting-started",
      title: "Guide de démarrage",
      description: "Apprenez les bases de la configuration de votre premier projet DevSecOps",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#guide-demarrage",
      tags: ["débutant", "tutoriel"],
      category: "guides"
    },
    {
      id: "ci-cd-pipelines",
      title: "Pipelines CI/CD",
      description: "Comment configurer et optimiser vos pipelines d'intégration et de déploiement continus",
      icon: <GitBranch className="h-6 w-6" />,
      link: "#ci-cd-pipelines",
      tags: ["CI/CD", "GitHub Actions", "GitLab CI"],
      category: "guides"
    },
    {
      id: "kubernetes",
      title: "Déploiements Kubernetes",
      description: "Bonnes pratiques pour déployer vos applications sur Kubernetes",
      icon: <Server className="h-6 w-6" />,
      link: "#kubernetes-deployments",
      tags: ["Kubernetes", "orchestration", "conteneurs"],
      category: "infrastructure"
    },
    {
      id: "dockerfile",
      title: "Dockerfiles avancés",
      description: "Techniques pour créer des images Docker optimisées et sécurisées",
      icon: <Code className="h-6 w-6" />,
      link: "#advanced-dockerfiles",
      tags: ["Docker", "conteneurisation", "multi-stage builds"],
      category: "infrastructure"
    },
    {
      id: "terraform",
      title: "Infrastructure as Code",
      description: "Utiliser Terraform pour gérer votre infrastructure cloud de manière déclarative",
      icon: <Cloud className="h-6 w-6" />,
      link: "#infrastructure-as-code",
      tags: ["Terraform", "IaC", "cloud"],
      category: "infrastructure"
    },
    {
      id: "security-best-practices",
      title: "Sécurité DevOps",
      description: "Meilleures pratiques pour sécuriser votre pipeline de développement",
      icon: <Shield className="h-6 w-6" />,
      link: "#security-best-practices",
      tags: ["sécurité", "SAST", "DAST", "secrets"],
      category: "securite"
    },
    {
      id: "compliance",
      title: "Conformité et standards",
      description: "Guide sur la conformité aux standards de l'industrie (GDPR, ISO, etc.)",
      icon: <FileText className="h-6 w-6" />,
      link: "#compliance-standards",
      tags: ["GDPR", "ISO 27001", "SOC 2", "conformité"],
      category: "securite"
    },
    {
      id: "templates",
      title: "Templates DevSecOps",
      description: "Collection de templates prêts à l'emploi pour différents environnements",
      icon: <File className="h-6 w-6" />,
      link: "#templates",
      tags: ["templates", "configurations", "exemples"],
      category: "ressources"
    }
  ];

  // Filter cards based on search query and active tab
  const filteredCards = documentationCards.filter(card => {
    const matchesSearch = 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === "all" || card.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Documentation</h1>
              <p className="text-muted-foreground">
                Ressources et guides pour maîtriser vos configurations DevSecOps
              </p>
            </div>
            <Input
              type="search"
              placeholder="Rechercher dans la documentation..."
              className="max-w-xs"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="securite">Sécurité</TabsTrigger>
              <TabsTrigger value="ressources">Ressources</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <DocCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  link={card.link}
                  tags={card.tags}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Aucun résultat trouvé pour <span className="font-medium">"{searchQuery}"</span>
              </p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Réinitialiser la recherche
              </Button>
            </div>
          )}
          
          <Separator className="my-12" />
          
          <div className="bg-slate-50 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
            <p className="mb-6">
              Notre équipe est disponible pour vous accompagner dans la mise en place de vos projets DevSecOps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Contacter le support</Button>
              <Button variant="outline">Consulter la FAQ</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
