
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Download } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DownloadButton = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startDownload = () => {
    setIsDownloading(true);
    setProgress(0);
    
    toast({
      title: "Téléchargement lancé",
      description: "Votre archive DevSecOps a été générée et va être téléchargée.",
    });
    
    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.floor(Math.random() * 10) + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            completeDownload();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  const completeDownload = () => {
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
  };

  const handleDownload = () => {
    setShowDialog(true);
  };

  return (
    <>
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
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Télécharger votre package DevSecOps</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de télécharger les fichiers générés pour votre configuration DevSecOps.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">Le package comprend:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                <span>Dockerfile optimisé</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                <span>Configuration Docker Compose</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                <span>Workflow GitHub Actions</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                <span>Fichiers de configuration Kubernetes</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                <span>Scripts Terraform pour l'infrastructure</span>
              </li>
            </ul>
          </div>
          
          {isDownloading && (
            <div className="py-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)}
              disabled={isDownloading}
            >
              Annuler
            </Button>
            <Button 
              onClick={startDownload}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={isDownloading}
            >
              {isDownloading ? "Téléchargement en cours..." : "Confirmer et télécharger"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadButton;
