
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Documentation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-2">
                  <a 
                    href="#getting-started" 
                    className="block py-2 px-3 rounded hover:bg-slate-100 text-slate-800 hover:text-indigo-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("getting-started");
                    }}
                  >
                    Commencer
                  </a>
                  <a 
                    href="#docker" 
                    className="block py-2 px-3 rounded hover:bg-slate-100 text-slate-800 hover:text-indigo-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("docker");
                    }}
                  >
                    Docker
                  </a>
                  <a 
                    href="#kubernetes" 
                    className="block py-2 px-3 rounded hover:bg-slate-100 text-slate-800 hover:text-indigo-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("kubernetes");
                    }}
                  >
                    Kubernetes
                  </a>
                  <a 
                    href="#cicd" 
                    className="block py-2 px-3 rounded hover:bg-slate-100 text-slate-800 hover:text-indigo-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("cicd");
                    }}
                  >
                    CI/CD
                  </a>
                  <a 
                    href="#terraform" 
                    className="block py-2 px-3 rounded hover:bg-slate-100 text-slate-800 hover:text-indigo-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("terraform");
                    }}
                  >
                    Terraform
                  </a>
                  <a 
                    href="#faq" 
                    className="block py-2 px-3 rounded hover:bg-slate-100 text-slate-800 hover:text-indigo-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("faq");
                    }}
                  >
                    FAQ
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="getting-started">Commencer</TabsTrigger>
                <TabsTrigger value="docker">Docker</TabsTrigger>
                <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
                <TabsTrigger value="cicd">CI/CD</TabsTrigger>
                <TabsTrigger value="terraform">Terraform</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="getting-started">
                <Card>
                  <CardHeader>
                    <CardTitle>Commencer avec DevSecOps Generator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-semibold">Qu'est-ce que DevSecOps Generator?</h3>
                    <p>
                      DevSecOps Generator est une plateforme SaaS qui permet de générer automatiquement tous les fichiers nécessaires pour mettre en place une infrastructure DevSecOps complète pour vos projets de développement.
                    </p>

                    <h3 className="text-xl font-semibold">Comment ça marche?</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Configurez votre projet en sélectionnant votre stack technique, votre provider cloud et vos options de déploiement</li>
                      <li>Notre générateur crée automatiquement les fichiers Docker, Kubernetes, CI/CD et Terraform adaptés à votre configuration</li>
                      <li>Prévisualisez les fichiers générés dans l'interface</li>
                      <li>Téléchargez le package complet prêt à être intégré à votre projet</li>
                    </ol>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-4">
                      <h4 className="font-semibold text-indigo-800">Pour commencer</h4>
                      <p className="text-indigo-700 mt-2">
                        Rendez-vous sur la <a href="/configurator" className="text-indigo-600 underline">page de configuration</a> pour générer votre première infrastructure DevSecOps.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="docker">
                <Card>
                  <CardHeader>
                    <CardTitle>Docker</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Notre générateur crée des fichiers Docker optimisés pour votre stack technique. Les Dockerfiles générés suivent les meilleures pratiques de sécurité et d'optimisation.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Bonnes pratiques Docker</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Utilisation d'images de base officielles et légères (alpine)</li>
                            <li>Multi-stage builds pour réduire la taille des images finales</li>
                            <li>Exécution en tant qu'utilisateur non-root pour la sécurité</li>
                            <li>Copie sélective des fichiers nécessaires</li>
                            <li>Optimisation du cache des couches Docker</li>
                            <li>Configuration d'un .dockerignore approprié</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Docker Compose</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les fichiers docker-compose.yml générés permettent de:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Orchestrer plusieurs services (application, base de données, cache...)</li>
                            <li>Configurer les variables d'environnement par environnement</li>
                            <li>Définir les volumes pour la persistance des données</li>
                            <li>Configurer les healthchecks pour la fiabilité</li>
                            <li>Optimiser la communication entre les services via des réseaux internes</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="kubernetes">
                <Card>
                  <CardHeader>
                    <CardTitle>Kubernetes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Notre générateur produit des manifests Kubernetes adaptés à votre application, prêts à être déployés sur n'importe quel cluster Kubernetes.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Fichiers générés</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Deployments avec stratégie de mise à jour</li>
                            <li>Services pour exposer votre application</li>
                            <li>Ingress pour la configuration des routes externes</li>
                            <li>ConfigMaps et Secrets pour la gestion des configurations</li>
                            <li>StatefulSets pour les composants avec état</li>
                            <li>PersistentVolumeClaims pour le stockage persistant</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Bonnes pratiques Kubernetes</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Configuration des limites de ressources (CPU/RAM)</li>
                            <li>Définition des probes de santé (liveness, readiness)</li>
                            <li>Implémentation de la mise à l'échelle horizontale (HPA)</li>
                            <li>Configuration de la sécurité (RBAC, NetworkPolicies)</li>
                            <li>Organisation des manifests par environnement</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="cicd">
                <Card>
                  <CardHeader>
                    <CardTitle>CI/CD</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Notre générateur crée des pipelines CI/CD complets pour différentes plateformes d'intégration continue.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>GitHub Actions</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les workflows GitHub Actions générés incluent:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Build et test automatiques</li>
                            <li>Analyse de sécurité des dépendances</li>
                            <li>Scan des vulnérabilités dans les containers</li>
                            <li>Publication des images Docker</li>
                            <li>Déploiement automatique sur Kubernetes</li>
                            <li>Notification des résultats</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>GitLab CI/CD</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les pipelines GitLab CI/CD générés incluent:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Gestion des environnements (dev, staging, prod)</li>
                            <li>Validation du code (tests unitaires, tests d'intégration)</li>
                            <li>Analyse statique du code</li>
                            <li>Packaging et publication des artefacts</li>
                            <li>Déploiement automatique avec rollback en cas d'échec</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Jenkins</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les Jenkinsfiles générés incluent:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Pipeline déclaratif multi-étapes</li>
                            <li>Intégration avec les outils de qualité de code</li>
                            <li>Publication des rapports de tests</li>
                            <li>Gestion des artifacts</li>
                            <li>Déploiement paramétré par environnement</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="terraform">
                <Card>
                  <CardHeader>
                    <CardTitle>Terraform</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Notre générateur produit des configurations Terraform pour déployer votre infrastructure sur différents fournisseurs cloud.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>AWS</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les ressources AWS configurées incluent:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>VPC avec sous-réseaux publics et privés</li>
                            <li>EKS pour les clusters Kubernetes</li>
                            <li>RDS pour les bases de données</li>
                            <li>ElastiCache pour Redis</li>
                            <li>S3 pour le stockage d'objets</li>
                            <li>IAM pour la gestion des permissions</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Azure</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les ressources Azure configurées incluent:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>VNET avec sous-réseaux</li>
                            <li>AKS pour les clusters Kubernetes</li>
                            <li>Azure SQL Database</li>
                            <li>Azure Cache for Redis</li>
                            <li>Azure Blob Storage</li>
                            <li>Azure Key Vault pour les secrets</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Organisation des fichiers Terraform</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les fichiers Terraform sont organisés selon les meilleures pratiques:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Séparation par modules réutilisables</li>
                            <li>Variables pour la paramétrisation</li>
                            <li>Outputs pour les informations importantes</li>
                            <li>Configuration de backend pour le stockage d'état</li>
                            <li>Structuration par environnement</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Foire Aux Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Puis-je personnaliser les fichiers générés?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Oui, tous les fichiers générés sont téléchargeables et entièrement modifiables. Vous pouvez les adapter à vos besoins spécifiques après les avoir générés.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Quels langages de programmation sont supportés?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Notre générateur prend en charge de nombreux langages et frameworks, notamment:
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>JavaScript/TypeScript (Node.js, React, Angular, Vue.js)</li>
                            <li>Python (Django, Flask, FastAPI)</li>
                            <li>Java (Spring Boot, Quarkus)</li>
                            <li>Go</li>
                            <li>Ruby (Rails)</li>
                            <li>PHP (Laravel, Symfony)</li>
                            <li>Et bien d'autres...</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Les fichiers générés sont-ils sécurisés?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Oui, tous les fichiers générés suivent les meilleures pratiques de sécurité DevSecOps:
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Exécution en tant qu'utilisateur non-root dans les containers</li>
                            <li>Scans de vulnérabilités intégrés aux pipelines CI/CD</li>
                            <li>Gestion sécurisée des secrets</li>
                            <li>Configuration RBAC pour Kubernetes</li>
                            <li>Principe du moindre privilège pour les permissions cloud</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Comment puis-je accéder à mon historique de générations?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Les utilisateurs inscrits peuvent consulter et télécharger à nouveau leurs précédentes générations depuis leur tableau de bord personnel. Les projets sont conservés pendant 30 jours pour les comptes gratuits et indéfiniment pour les comptes premium.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Puis-je intégrer directement avec mon dépôt Git?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Oui, les utilisateurs premium peuvent bénéficier de l'intégration directe avec GitHub et GitLab. Cette fonctionnalité permet de créer automatiquement une pull request avec les fichiers générés directement dans votre dépôt.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
