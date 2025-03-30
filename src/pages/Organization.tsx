
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrganizationStore } from '@/stores/organizationStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { PlusCircle, Settings, Calendar, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Organization = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    organizations, 
    setCurrentOrganization, 
    currentOrganization,
    isLoading,
    fetchOrganizations
  } = useOrganizationStore();
  
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    if (!orgId) {
      navigate('/dashboard');
      return;
    }
    
    // If organizations is empty, fetch them
    if (organizations.length === 0) {
      fetchOrganizations().catch(() => {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les organisations",
          variant: "destructive",
        });
      });
    } else {
      // Set the current organization based on the URL parameter
      setCurrentOrganization(orgId);
    }
  }, [orgId, organizations, fetchOrganizations, setCurrentOrganization, navigate, toast]);

  const handleCreateProject = () => {
    if (!currentOrganization) return;
    navigate(`/organizations/${currentOrganization.id}/projects/create`);
  };

  const handleSelectProject = (projectId: string) => {
    if (!currentOrganization) return;
    navigate(`/organizations/${currentOrganization.id}/projects/${projectId}`);
  };

  if (isLoading || !currentOrganization) {
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
            <h1 className="text-3xl font-bold">{currentOrganization.name}</h1>
            <p className="text-muted-foreground mt-1">
              {currentOrganization.description || "Aucune description"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/organizations/${currentOrganization.id}/settings`)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
            <Button onClick={handleCreateProject}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau projet
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            {currentOrganization.projects?.length === 0 ? (
              <Card className="w-full mb-8">
                <CardHeader>
                  <CardTitle>Aucun projet</CardTitle>
                  <CardDescription>
                    Vous n'avez pas encore de projet dans cette organisation. Créez votre premier projet pour commencer.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={handleCreateProject}>
                    Créer un projet
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentOrganization.projects?.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span className="truncate">{project.name}</span>
                        <Button variant="ghost" size="icon" asChild>
                          <span onClick={() => navigate(`/organizations/${currentOrganization.id}/projects/${project.id}/settings`)}>
                            <Settings className="h-4 w-4" />
                          </span>
                        </Button>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description || "Aucune description"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        Créé le {project.createdAt ? format(new Date(project.createdAt), 'dd/MM/yyyy') : 'N/A'}
                      </div>
                      <p className="text-sm">
                        Configurations: {project.configurations?.length || 0}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => handleSelectProject(project.id)}
                      >
                        Accéder
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="members">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Membres de l'organisation</CardTitle>
                <CardDescription>
                  Gérez les membres et leurs droits d'accès dans l'organisation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Fonctionnalité en développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Journal des activités récentes dans l'organisation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Fonctionnalité en développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Organization;
