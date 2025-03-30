
import React from "react";
import CodeSnippetHeader from "../CodeSnippetHeader";
import { useConfigStore } from "@/stores/configStore";
import { generateDockerfile } from "@/utils/docker/generateDockerfile";

const DockerfileSnippet = () => {
  const config = useConfigStore(state => state.config);
  const dockerfileContent = generateDockerfile(config);
  
  return (
    <div className="rounded-lg overflow-hidden">
      <CodeSnippetHeader fileName="Dockerfile" language="docker" />
      <pre className="text-green-400 font-mono text-sm p-4" data-filename="Dockerfile">
        {dockerfileContent}
      </pre>
    </div>
  );
};

export default DockerfileSnippet;
