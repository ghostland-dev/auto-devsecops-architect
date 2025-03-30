
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizationStore } from '@/stores/organizationStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const CreateOrganization = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createOrganization, isLoading } = useOrganizationStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erreur",
        description: "Le nom de l'organisation est requis",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const newOrg = await createOrganization({
        name,
        description,
      });
      
      toast({
        title: "Organisation créée",
        description: "Votre organisation a été créée avec succès",
      });
      
      navigate(`/organizations/${newOrg.id}`);
    } catch (error) {
      toast({
        title: "Échec de la création",
        description: "Une erreur s'est produite lors de la création de l'organisation",
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
              <CardTitle className="text-2xl font-bold">Créer une organisation</CardTitle>
              <CardDescription>
                Créez une nouvelle organisation pour gérer vos projets DevSecOps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de l'organisation</Label>
                  <Input
                    id="name"
                    placeholder="Acme Inc."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Une brève description de votre organisation"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
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
                    {isLoading ? "Création en cours..." : "Créer l'organisation"}
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

export default CreateOrganization;
