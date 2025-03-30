
import { useState } from "react";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const fileStructure: FileNode[] = [
  {
    name: "docker",
    type: "folder",
    children: [
      { name: "Dockerfile", type: "file" },
      { name: ".dockerignore", type: "file" }
    ]
  },
  {
    name: "docker-compose",
    type: "folder",
    children: [
      { name: "docker-compose.yml", type: "file" }
    ]
  },
  {
    name: "ci-cd",
    type: "folder",
    children: [
      { 
        name: ".github", 
        type: "folder",
        children: [
          {
            name: "workflows",
            type: "folder",
            children: [
              { name: "main.yml", type: "file" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "k8s",
    type: "folder",
    children: [
      { name: "deployment.yml", type: "file" },
      { name: "service.yml", type: "file" },
      { name: "ingress.yml", type: "file" }
    ]
  },
  {
    name: "terraform",
    type: "folder",
    children: [
      { name: "main.tf", type: "file" },
      { name: "variables.tf", type: "file" },
      { name: "outputs.tf", type: "file" }
    ]
  },
  {
    name: "helm",
    type: "folder",
    children: [
      { name: "templates", type: "folder", children: [] },
      { name: "values.yaml", type: "file" }
    ]
  },
  {
    name: "env",
    type: "folder",
    children: [
      { name: ".env.dev", type: "file" },
      { name: ".env.prod", type: "file" }
    ]
  },
  {
    name: "docs",
    type: "folder",
    children: [
      { name: "README.md", type: "file" }
    ]
  }
];

const TreeNode = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 1);

  const toggleOpen = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    }
  };

  const paddingLeft = `${level * 16}px`;

  return (
    <div>
      <div 
        className={`flex items-center py-1 hover:bg-slate-100 rounded px-2 cursor-pointer ${node.type === 'file' ? 'pl-8' : ''}`}
        style={{ marginLeft: node.type === 'file' ? paddingLeft : paddingLeft }}
        onClick={toggleOpen}
      >
        {node.type === "folder" && (
          isOpen ? (
            <ChevronDown className="h-4 w-4 text-slate-500 mr-1" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-500 mr-1" />
          )
        )}
        
        {node.type === "folder" ? (
          <Folder className="h-4 w-4 text-indigo-600 mr-2" />
        ) : (
          <File className="h-4 w-4 text-slate-500 mr-2" />
        )}
        
        <span className={`text-sm ${node.type === "folder" ? "font-medium" : ""}`}>
          {node.name}
        </span>
      </div>
      
      {node.type === "folder" && isOpen && node.children && (
        <div className="ml-2">
          {node.children.map((childNode, index) => (
            <TreeNode key={index} node={childNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileStructureTree = () => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Structure des fichiers</h2>
      <div className="space-y-1">
        {fileStructure.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </div>
    </div>
  );
};

export default FileStructureTree;
