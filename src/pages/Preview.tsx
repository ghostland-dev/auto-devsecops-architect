
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FileStructureTree from "@/components/preview/FileStructureTree";
import FilePreviewTabs from "@/components/preview/FilePreviewTabs";
import DownloadButton from "@/components/preview/DownloadButton";

const Preview = () => {
  const [activeTab, setActiveTab] = useState("dockerfile");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Aperçu des fichiers générés</h1>
          <DownloadButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FileStructureTree />
          <FilePreviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  );
};

export default Preview;
