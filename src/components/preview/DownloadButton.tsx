
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Check, Download } from "lucide-react";

const DownloadButton = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = () => {
    setIsDownloading(true);
    
    toast({
      title: "Téléchargement lancé",
      description: "Votre archive DevSecOps a été générée et va être téléchargée.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      
      toast({
        title: "Téléchargement terminé",
        description: "Votre package DevSecOps est prêt à l'emploi!",
        action: (
          <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      });
      
      // Trigger download (in a real app, this would be an actual file)
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob(["Simulated file content"], { type: "application/zip" }));
      link.download = "devsecops-package.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  return (
    <Button 
      onClick={handleDownload}
      className="bg-emerald-600 hover:bg-emerald-700 flex gap-2"
      disabled={isDownloading}
    >
      {isDownloading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-white" />
      ) : (
        <Download className="h-5 w-5" />
      )}
      {isDownloading ? "Génération en cours..." : "Télécharger le package"}
    </Button>
  );
};

export default DownloadButton;
