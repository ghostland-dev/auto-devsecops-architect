
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrganizationStore } from '@/stores/organizationStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const CreateProject = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createProject, isLoading } = useOrganizationStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [repository, setRepository] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orgId) {
      toast({
        title: "Erreur",
        description: "ID d'organisation manquant",
        variant: "destructive",
      });
      return;
    }
    
    if (!name) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est requis",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const newProject = await createProject(orgId, {
        name,
        description,
        repository,
      });
      
      toast({
        title: "Projet créé",
        description: "Votre projet a été créé avec succès",
      });
      
      navigate(`/organizations/${orgId}/projects/${newProject.id}`);
    } catch (error) {
      toast({
        title: "Échec de la création",
        description: "Une erreur s'est produite lors de la création du projet",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            Retour
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Créer un projet</CardTitle>
              <CardDescription>
                Créez un nouveau projet DevSecOps pour votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du projet</Label>
                  <Input
                    id="name"
                    placeholder="API E-commerce"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Une brève description de votre projet"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="repository">URL du dépôt Git (optionnel)</Label>
                  <Input
                    id="repository"
                    placeholder="https://github.com/organisation/projet"
                    value={repository}
                    onChange={(e) => setRepository(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Création en cours..." : "Créer le projet"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
