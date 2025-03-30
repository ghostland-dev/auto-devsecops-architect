
import React from "react";
import { ProjectConfig } from "@/types/configurator";
import { generateSecurityConfig } from "@/utils/securityConfigFormatter";
import CodeSnippetHeader from "@/components/preview/CodeSnippetHeader";

interface SecurityConfigSnippetProps {
  config?: ProjectConfig;
}

const SecurityConfigSnippet = ({ config }: SecurityConfigSnippetProps) => {
  const securityConfig = generateSecurityConfig(config);
  
  return (
    <>
      <CodeSnippetHeader fileName="security-config.yaml" language="yaml" />
      <pre data-filename="security-config.yaml" className="text-green-400 font-mono text-sm">
        {securityConfig}
      </pre>
    </>
  );
};

export default SecurityConfigSnippet;
