
import React, { useState } from "react";
import { 
  Folder,
  File,
  ChevronRight,
  ChevronDown,
  FileCode,
  FileCog,
  FileJson,
  FileText,
  FileKey
} from "lucide-react";

const FileStructureTree = () => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "docker": true,
    "k8s": true,
    "terraform": true,
    "ci": true,
    "security": true,
  });
  
  const toggleFolder = (folder: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [folder]: !expandedFolders[folder]
    });
  };
  
  const renderFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tf") || fileName.endsWith(".tfvars")) {
      return <FileCog className="h-4 w-4 text-purple-500" />;
    } else if (fileName.endsWith(".yaml") || fileName.endsWith(".yml")) {
      return <FileJson className="h-4 w-4 text-blue-500" />;
    } else if (fileName.endsWith(".sh")) {
      return <FileCode className="h-4 w-4 text-green-500" />;
    } else if (fileName.includes("Dockerfile")) {
      return <FileCode className="h-4 w-4 text-orange-500" />;
    } else if (fileName.endsWith(".key") || fileName.endsWith(".pem") || fileName.includes("secret")) {
      return <FileKey className="h-4 w-4 text-red-500" />;
    } else {
      return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 lg:col-span-1">
      <h2 className="text-lg font-bold mb-4">Structure des fichiers</h2>
      
      <div className="text-sm">
        <div className="mb-2">
          <button 
            className="flex items-center text-left w-full hover:bg-gray-100 p-1 rounded"
            onClick={() => toggleFolder("docker")}
          >
            {expandedFolders["docker"] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            <Folder className="h-4 w-4 text-blue-400 mr-2" />
            <span>docker</span>
          </button>
          
          {expandedFolders["docker"] && (
            <div className="ml-6 border-l border-gray-200 pl-2 py-1 space-y-1">
              <div className="flex items-center">
                {renderFileIcon("Dockerfile")}
                <span className="ml-2">Dockerfile</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("Dockerfile.prod")}
                <span className="ml-2">Dockerfile.prod</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("docker-compose.yml")}
                <span className="ml-2">docker-compose.yml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("docker-compose.prod.yml")}
                <span className="ml-2">docker-compose.prod.yml</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <button 
            className="flex items-center text-left w-full hover:bg-gray-100 p-1 rounded"
            onClick={() => toggleFolder("k8s")}
          >
            {expandedFolders["k8s"] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            <Folder className="h-4 w-4 text-blue-400 mr-2" />
            <span>k8s</span>
          </button>
          
          {expandedFolders["k8s"] && (
            <div className="ml-6 border-l border-gray-200 pl-2 py-1 space-y-1">
              <div className="flex items-center">
                {renderFileIcon("deployment.yaml")}
                <span className="ml-2">deployment.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("service.yaml")}
                <span className="ml-2">service.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("ingress.yaml")}
                <span className="ml-2">ingress.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("configmap.yaml")}
                <span className="ml-2">configmap.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("secrets.yaml")}
                <span className="ml-2">secrets.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("rbac.yaml")}
                <span className="ml-2">rbac.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("network-policy.yaml")}
                <span className="ml-2">network-policy.yaml</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <button 
            className="flex items-center text-left w-full hover:bg-gray-100 p-1 rounded"
            onClick={() => toggleFolder("terraform")}
          >
            {expandedFolders["terraform"] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            <Folder className="h-4 w-4 text-blue-400 mr-2" />
            <span>terraform</span>
          </button>
          
          {expandedFolders["terraform"] && (
            <div className="ml-6 border-l border-gray-200 pl-2 py-1 space-y-1">
              <div className="flex items-center">
                {renderFileIcon("main.tf")}
                <span className="ml-2">main.tf</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("variables.tf")}
                <span className="ml-2">variables.tf</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("outputs.tf")}
                <span className="ml-2">outputs.tf</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("terraform.tfvars")}
                <span className="ml-2">terraform.tfvars</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("providers.tf")}
                <span className="ml-2">providers.tf</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <button 
            className="flex items-center text-left w-full hover:bg-gray-100 p-1 rounded"
            onClick={() => toggleFolder("ci")}
          >
            {expandedFolders["ci"] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            <Folder className="h-4 w-4 text-blue-400 mr-2" />
            <span>ci</span>
          </button>
          
          {expandedFolders["ci"] && (
            <div className="ml-6 border-l border-gray-200 pl-2 py-1 space-y-1">
              <div className="flex items-center">
                {renderFileIcon(".github/workflows/ci-cd.yml")}
                <span className="ml-2">.github/workflows/ci-cd.yml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("Jenkinsfile")}
                <span className="ml-2">Jenkinsfile</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon(".gitlab-ci.yml")}
                <span className="ml-2">.gitlab-ci.yml</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <button 
            className="flex items-center text-left w-full hover:bg-gray-100 p-1 rounded"
            onClick={() => toggleFolder("security")}
          >
            {expandedFolders["security"] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            <Folder className="h-4 w-4 text-blue-400 mr-2" />
            <span>security</span>
          </button>
          
          {expandedFolders["security"] && (
            <div className="ml-6 border-l border-gray-200 pl-2 py-1 space-y-1">
              <div className="flex items-center">
                {renderFileIcon("security-config.yaml")}
                <span className="ml-2">security-config.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("sonarqube.properties")}
                <span className="ml-2">sonarqube.properties</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("trivy-config.yaml")}
                <span className="ml-2">trivy-config.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("vault-policy.hcl")}
                <span className="ml-2">vault-policy.hcl</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("snyk.yaml")}
                <span className="ml-2">snyk.yaml</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("compliance-checks.sh")}
                <span className="ml-2">compliance-checks.sh</span>
              </div>
              <div className="flex items-center">
                {renderFileIcon("sbom-cyclonedx.xml")}
                <span className="ml-2">sbom-cyclonedx.xml</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileStructureTree;
