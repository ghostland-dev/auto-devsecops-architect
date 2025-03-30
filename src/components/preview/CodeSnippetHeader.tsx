
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CodeSnippetHeaderProps {
  fileName: string;
  language: string;
}

const CodeSnippetHeader = ({ fileName, language }: CodeSnippetHeaderProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Find the closest pre element that contains the code
      const codeElement = document.querySelector(`pre[data-filename="${fileName}"]`);
      if (codeElement) {
        await navigator.clipboard.writeText(codeElement.textContent || "");
        setCopied(true);
        toast({
          title: "Code copié",
          description: `Le code a été copié dans votre presse-papiers.`,
        });
        
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-slate-800 border-b border-slate-700 rounded-t-lg">
      <div className="flex items-center">
        <span className="text-slate-400 text-xs font-mono">{fileName}</span>
        {language && (
          <span className="ml-2 px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
            {language}
          </span>
        )}
      </div>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-slate-700 transition-colors"
        aria-label="Copier le code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-slate-400" />
        )}
      </button>
    </div>
  );
};

export default CodeSnippetHeader;
