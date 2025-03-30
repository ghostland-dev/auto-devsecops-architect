
import React from "react";

const FileStructureTree = () => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Structure des fichiers</h2>
      <div className="space-y-2">
        <div className="font-mono text-sm">
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold">📁 docker/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 Dockerfile</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 .dockerignore</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 docker-compose/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 docker-compose.yml</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 ci-cd/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 .github/workflows/main.yml</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 k8s/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 deployment.yml</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 service.yml</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 ingress.yml</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 terraform/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 main.tf</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 variables.tf</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 outputs.tf</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 helm/</div>
          <div className="pl-6 border-l-2 border-slate-300">📁 templates/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 values.yaml</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 env/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 .env.dev</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 .env.prod</div>
          <div className="pl-2 border-l-2 border-slate-300 text-slate-800 font-bold mt-2">📁 docs/</div>
          <div className="pl-6 border-l-2 border-slate-300">📄 README.md</div>
        </div>
      </div>
    </div>
  );
};

export default FileStructureTree;
