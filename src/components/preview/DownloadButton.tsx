
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Check, Download } from "lucide-react";

const DownloadButton = () => {
  const handleDownload = () => {
    toast({
      title: "Téléchargement lancé",
      description: "Votre archive DevSecOps a été générée et va être téléchargée.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: "Votre package DevSecOps est prêt à l'emploi!",
        action: (
          <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      });
    }, 2000);
  };

  return (
    <Button 
      onClick={handleDownload}
      className="bg-emerald-600 hover:bg-emerald-700 flex gap-2"
    >
      <Download className="h-5 w-5" />
      Télécharger le package
    </Button>
  );
};

export default DownloadButton;
