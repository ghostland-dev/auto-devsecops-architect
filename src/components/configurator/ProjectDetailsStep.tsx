
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Organization, Project, ProjectConfig } from "@/types/configurator";
import { useToast } from "@/components/ui/use-toast";

interface ProjectDetailsStepProps {
  config: ProjectConfig;
  updateConfig: (config: Partial<ProjectConfig>) => void;
}

const ProjectDetailsStep = ({ config, updateConfig }: ProjectDetailsStepProps) => {
  const { toast } = useToast();
  const [organization, setOrganization] = useState<Organization>(
    config.organization || { name: "", id: "" }
  );
  const [project, setProject] = useState<Project>(
    config.project || { name: "", id: "" }
  );

  const handleOrganizationChange = (field: keyof Organization, value: string) => {
    const newOrg = { ...organization, [field]: value };
    setOrganization(newOrg);
    updateConfig({ organization: newOrg });
  };

  const handleProjectChange = (field: keyof Project, value: string) => {
    const newProj = { ...project, [field]: value };
    setProject(newProj);
    updateConfig({ project: newProj });
  };

  const generateId = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAutoGenerateIds = () => {
    if (organization.name) {
      const orgId = generateId(organization.name);
      handleOrganizationChange('id', orgId);
    }
    
    if (project.name) {
      const projId = generateId(project.name);
      handleProjectChange('id', projId);
    }

    toast({
      title: "IDs générés",
      description: "Les identifiants ont été générés à partir des noms.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Détails de l'organisation</h2>
        <p className="text-slate-600 mb-6">
          Entrez les informations relatives à votre organisation
        </p>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Nom de l'organisation</Label>
                <Input
                  id="org-name"
                  value={organization.name}
                  onChange={(e) => handleOrganizationChange('name', e.target.value)}
                  placeholder="Exemple: Acme Corp"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="org-id">Identifiant de l'organisation</Label>
                <Input
                  id="org-id"
                  value={organization.id}
                  onChange={(e) => handleOrganizationChange('id', e.target.value)}
                  placeholder="Exemple: acme-corp"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="org-description">Description</Label>
                <Textarea
                  id="org-description"
                  value={organization.description || ""}
                  onChange={(e) => handleOrganizationChange('description', e.target.value)}
                  placeholder="Description brève de l'organisation"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Détails du projet</h2>
        <p className="text-slate-600 mb-6">
          Entrez les informations relatives à votre projet DevSecOps
        </p>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">Nom du projet</Label>
                <Input
                  id="project-name"
                  value={project.name}
                  onChange={(e) => handleProjectChange('name', e.target.value)}
                  placeholder="Exemple: API e-commerce"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-id">Identifiant du projet</Label>
                <Input
                  id="project-id"
                  value={project.id}
                  onChange={(e) => handleProjectChange('id', e.target.value)}
                  placeholder="Exemple: ecommerce-api"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={project.description || ""}
                  onChange={(e) => handleProjectChange('description', e.target.value)}
                  placeholder="Description brève du projet"
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="project-repository">URL du dépôt</Label>
                <Input
                  id="project-repository"
                  value={project.repository || ""}
                  onChange={(e) => handleProjectChange('repository', e.target.value)}
                  placeholder="https://github.com/organisation/projet"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAutoGenerateIds}
              >
                Générer les identifiants automatiquement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
