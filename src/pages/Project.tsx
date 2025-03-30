
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrganizationStore } from '@/stores/organizationStore';
import { useConfigStore } from '@/stores/configStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Settings, History, ArrowRight, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { GenerationHistory } from '@/types/configurator';

const Project = () => {
  const { orgId, projectId } = useParams<{ orgId: string; projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentOrganization, setCurrentOrganization, setCurrentProject, fetchOrganizations } = useOrganizationStore();
  const { configHistory, generationHistory, createNewConfig } = useConfigStore();
  const [activeTab, setActiveTab] = useState("configurations");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orgId || !projectId) {
      navigate('/dashboard');
      return;
    }
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch organizations if not loaded yet
        if (!currentOrganization) {
          await fetchOrganizations();
        }
        
        // Set current organization and project
        setCurrentOrganization(orgId);
        setCurrentProject(projectId);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du projet",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [orgId, projectId, currentOrganization, fetchOrganizations, setCurrentOrganization, setCurrentProject, navigate, toast]);

  const handleCreateConfig = () => {
    createNewConfig();
    navigate(`/configurator`);
  };

  const handleEditConfig = (configId: string) => {
    navigate(`/configurator?config=${configId}`);
  };

  const handleViewGenerationHistory = (historyId: string) => {
    navigate(`/preview?history=${historyId}`);
  };

  const getCurrentProject = () => {
    if (!currentOrganization) return null;
    return currentOrganization.projects?.find(p => p.id === projectId) || null;
  };

  const project = getCurrentProject();

  if (isLoading || !project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button 
                onClick={() => navigate(`/organizations/${orgId}`)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {currentOrganization?.name}
              </button>
              <span className="text-muted-foreground">/</span>
              <h1 className="text-2xl font-bold">{project.name}</h1>
            </div>
            <p className="text-muted-foreground">
              {project.description || "Aucune description"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/organizations/${orgId}/projects/${projectId}/settings`)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
            <Button onClick={handleCreateConfig}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle configuration
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="configurations">Configurations</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="configurations">
            {configHistory.length === 0 ? (
              <Card className="w-full mb-8">
                <CardHeader>
                  <CardTitle>Aucune configuration</CardTitle>
                  <CardDescription>
                    Vous n'avez pas encore de configuration DevSecOps pour ce projet. Créez votre première configuration pour commencer.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={handleCreateConfig}>
                    Créer une configuration
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configHistory.map((config) => (
                  <Card key={config.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span className="truncate">
                          {config.language} / {config.framework}
                        </span>
                        <div className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                          v{config.version}
                        </div>
                      </CardTitle>
                      <CardDescription>
                        {config.updatedAt ? format(new Date(config.updatedAt), 'dd/MM/yyyy HH:mm') : 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">CI/CD:</span>
                          <span className="text-sm font-medium">{config.ciCdProvider || "Non défini"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Cloud:</span>
                          <span className="text-sm font-medium">{config.cloudProvider || "Non défini"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Déploiement:</span>
                          <span className="text-sm font-medium">{config.deploymentType || "Non défini"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => handleEditConfig(config.id!)}
                      >
                        Modifier
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des générations</CardTitle>
                <CardDescription>
                  Consultez l'historique des fichiers générés pour ce projet
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generationHistory.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    Aucun historique de génération disponible
                  </p>
                ) : (
                  <div className="space-y-4">
                    {generationHistory.map((history: GenerationHistory) => (
                      <div key={history.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-medium">Génération #{history.id.substring(0, 8)}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(history.timestamp), 'dd/MM/yyyy HH:mm')}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewGenerationHistory(history.id)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Voir les fichiers
                          </Button>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm">Fichiers générés: {history.files.length}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Microservices</CardTitle>
                  <CardDescription>
                    Gérez les microservices liés à ce projet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    Fonctionnalité en développement
                  </p>
                </CardContent>
                <CardFooter>
                  <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un microservice
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Environnements</CardTitle>
                  <CardDescription>
                    Gérez les environnements de déploiement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    Fonctionnalité en développement
                  </p>
                </CardContent>
                <CardFooter>
                  <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un environnement
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Project;
