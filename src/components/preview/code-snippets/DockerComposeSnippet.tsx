
import React from "react";
import CodeSnippetHeader from "../CodeSnippetHeader";
import { useConfigStore } from "@/stores/configStore";
import { generateDockerCompose } from "@/utils/docker/generateDockerCompose";

const DockerComposeSnippet = () => {
  const config = useConfigStore(state => state.config);
  const dockerComposeContent = generateDockerCompose(config);
  
  return (
    <div className="rounded-lg overflow-hidden">
      <CodeSnippetHeader fileName="docker-compose.yml" language="yaml" />
      <pre className="text-green-400 font-mono text-sm p-4" data-filename="docker-compose.yml">
        {dockerComposeContent}
      </pre>
    </div>
  );
};

export default DockerComposeSnippet;
