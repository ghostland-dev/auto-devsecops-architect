
import React from "react";
import CodeSnippetHeader from "../CodeSnippetHeader";
import { useConfigStore } from "@/stores/configStore";
import { generateKubernetesManifests } from "@/utils/kubernetes/generateKubernetesManifests";

const KubernetesSnippet = () => {
  const config = useConfigStore(state => state.config);
  const kubernetesContent = generateKubernetesManifests(config);
  
  return (
    <div className="rounded-lg overflow-hidden">
      <CodeSnippetHeader fileName="kubernetes-manifests.yaml" language="yaml" />
      <pre className="text-green-400 font-mono text-sm p-4" data-filename="kubernetes-manifests.yaml">
        {kubernetesContent}
      </pre>
    </div>
  );
};

export default KubernetesSnippet;
