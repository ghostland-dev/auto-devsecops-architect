
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizationStore } from '@/stores/organizationStore';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { PlusCircle, Settings, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const { organizations, currentOrganization, fetchOrganizations, setCurrentOrganization, isLoading } = useOrganizationStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch organizations
    fetchOrganizations()
      .then(() => setIsInitialized(true))
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer vos organisations",
          variant: "destructive",
        });
      });
  }, [isAuthenticated, fetchOrganizations, navigate, toast]);

  const handleCreateOrganization = () => {
    navigate('/organizations/create');
  };

  const handleSelectOrganization = (orgId: string) => {
    setCurrentOrganization(orgId);
    navigate(`/organizations/${orgId}`);
  };

  if (!isInitialized || isLoading) {
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <Button onClick={handleCreateOrganization}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle organisation
          </Button>
        </div>

        {organizations.length === 0 ? (
          <Card className="w-full mb-8">
            <CardHeader>
              <CardTitle>Bienvenue sur la plateforme DevSecOps</CardTitle>
              <CardDescription>
                Vous n'avez pas encore d'organisation. Créez votre première organisation pour commencer.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={handleCreateOrganization}>
                Créer une organisation
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <Card key={org.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="truncate">{org.name}</span>
                    <Button variant="ghost" size="icon" asChild>
                      <span onClick={() => navigate(`/organizations/${org.id}/settings`)}>
                        <Settings className="h-4 w-4" />
                      </span>
                    </Button>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{org.description || "Aucune description"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Projets: {org.projects?.length || 0}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => handleSelectOrganization(org.id)}
                  >
                    Accéder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
