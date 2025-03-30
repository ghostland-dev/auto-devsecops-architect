
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import NotesInput from "@/components/configurator/NotesInput";

interface ConfiguratorNotesProps {
  notes: string;
  onChange: (notes: string) => void;
}

const ConfiguratorNotes = ({ notes, onChange }: ConfiguratorNotesProps) => {
  return (
    <div className="mt-8 mb-4">
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Notes du projet</h3>
              <NotesInput 
                value={notes || ""} 
                onChange={onChange}
                placeholder="Ajoutez ici des notes ou instructions spécifiques pour votre configuration DevSecOps..."
                description="Ces notes seront incluses dans la documentation générée et peuvent servir comme référence pour votre équipe."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguratorNotes;
