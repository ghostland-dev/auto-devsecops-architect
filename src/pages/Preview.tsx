
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FileStructureTree from "@/components/preview/FileStructureTree";
import FilePreviewTabs from "@/components/preview/FilePreviewTabs";
import DownloadButton from "@/components/preview/DownloadButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Edit, Copy, Share2 } from "lucide-react";

const Preview = () => {
  const [activeTab, setActiveTab] = useState("dockerfile");
  const [previewMode, setPreviewMode] = useState<"code" | "summary">("code");
  const navigate = useNavigate();
  
  const goBackToConfigurator = () => {
    navigate("/configurator");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goBackToConfigurator}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-1">Aperçu des fichiers générés</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                    Prêt pour le déploiement
                  </Badge>
                  <span className="text-sm text-muted-foreground">Généré le {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="h-4 w-4" />
                Copier
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
              <DownloadButton />
            </div>
          </div>
          
          <Tabs value={previewMode} onValueChange={(value) => setPreviewMode(value as "code" | "summary")} className="mb-6">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="summary">Résumé</TabsTrigger>
            </TabsList>
            
            <TabsContent value="code">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <FileStructureTree />
                <FilePreviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration du projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Langage</dt>
                        <dd className="text-sm mt-1">Java</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Framework</dt>
                        <dd className="text-sm mt-1">Spring Boot</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">CI/CD</dt>
                        <dd className="text-sm mt-1">GitHub Actions</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Cloud Provider</dt>
                        <dd className="text-sm mt-1">AWS</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Fichiers générés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="text-sm flex justify-between">
                        <span>Dockerfile</span>
                        <Badge variant="outline">Prêt</Badge>
                      </li>
                      <li className="text-sm flex justify-between">
                        <span>docker-compose.yml</span>
                        <Badge variant="outline">Prêt</Badge>
                      </li>
                      <li className="text-sm flex justify-between">
                        <span>GitHub Actions workflow</span>
                        <Badge variant="outline">Prêt</Badge>
                      </li>
                      <li className="text-sm flex justify-between">
                        <span>Kubernetes manifests</span>
                        <Badge variant="outline">Prêt</Badge>
                      </li>
                      <li className="text-sm flex justify-between">
                        <span>Terraform files</span>
                        <Badge variant="outline">Prêt</Badge>
                      </li>
                      <li className="text-sm flex justify-between">
                        <span>Security configuration</span>
                        <Badge variant="outline">Prêt</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Étapes suivantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        Vos fichiers DevSecOps sont prêts à être utilisés. Voici les prochaines étapes recommandées:
                      </p>
                      <ol className="list-decimal ml-5 space-y-2 text-sm">
                        <li>Téléchargez l'archive contenant tous les fichiers</li>
                        <li>Intégrez ces fichiers dans votre dépôt de code</li>
                        <li>Configurez les variables d'environnement nécessaires</li>
                        <li>Lancez votre premier pipeline CI/CD</li>
                        <li>Vérifiez les rapports de sécurité générés</li>
                      </ol>
                      
                      <div className="flex gap-2 mt-6">
                        <Button className="gap-2">
                          <Download className="h-4 w-4" />
                          Télécharger
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Modifier la configuration
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-12" />
          
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Besoin d'aide pour l'implémentation?</h2>
            <p className="mb-6">
              Notre équipe d'experts peut vous aider à intégrer cette configuration dans votre environnement de production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Contacter un expert</Button>
              <Button variant="outline">Consulter la documentation</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
