
import React from "react";
import { ProjectConfig } from "@/types/configurator";

interface SecurityConfigSnippetProps {
  config?: ProjectConfig;
}

const SecurityConfigSnippet = ({ config }: SecurityConfigSnippetProps) => {
  const getSecurityConfig = () => {
    if (!config) return defaultSecurityConfig;

    const { securityOptions } = config;
    
    // Format the security configuration based on user selections
    return `# Security Configuration

# Analyse statique du code (SAST)
${securityOptions.staticAnalysis.includes("sonarqube") ? `sonarqube:
  enabled: true
  qualityGate:
    enabled: true
    threshold: 80
  exclusions: "**/*.test.js,**/*.spec.js"` : ""}
${securityOptions.staticAnalysis.includes("snyk") ? `
snyk:
  enabled: true
  severity: high
  failOnIssues: true` : ""}
${securityOptions.staticAnalysis.includes("trivy") || securityOptions.containerScan ? `
trivy:
  enabled: true
  ignoreUnfixed: true
  severity: CRITICAL,HIGH` : ""}

# Gestion des secrets
${securityOptions.secretsManagement ? `${securityOptions.secretsManagement}:
  enabled: true
  address: "https://${securityOptions.secretsManagement}.example.com"
  role: "${config.project?.name || "my-app"}"
  kvPath: "secret/${config.project?.id || "my-app"}"
  authMethod: "kubernetes"` : ""}

# Standards de conformité
compliance:
${securityOptions.complianceStandards.includes("cis") ? `  cis:
    enabled: true
    level: 2` : ""}
${securityOptions.complianceStandards.includes("pci-dss") ? `  pci-dss:
    enabled: true` : ""}
${securityOptions.complianceStandards.includes("nist") ? `  nist:
    enabled: true
    controls: ["AC-2", "AU-2", "SC-7"]` : ""}

# Protection des conteneurs
containerSecurity:
  nonRootUser: true
  readOnlyFilesystem: true
  privilegeEscalation: false
  runAsUser: 1000
  seccompProfile: "runtime/default"
  appArmor: "runtime/default"
  scanImages: ${securityOptions.containerScan ? "true" : "false"}
  denyUnauthorizedImages: ${securityOptions.containerScan ? "true" : "false"}

# Génération SBOM
sbom:
  enabled: ${securityOptions.sbomGeneration ? "true" : "false"}
  format: "cyclonedx"
  outputPath: "./sbom"

# Réseau Zero Trust
zeroTrust:
  enabled: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  mtls: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  networkPolicies:
    enabled: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
    defaultDeny: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  serviceIsolation: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  egressControl: ${securityOptions.zeroTrustNetworking ? "true" : "false"}

# Patching automatique des vulnérabilités
vulnerabilityPatching:
  enabled: ${securityOptions.autoVulnPatching ? "true" : "false"}
  autoRemediation: ${securityOptions.autoVulnPatching ? "true" : "false"}
  excludePatches: []
  notificationChannel: "slack"
  approvalRequired: true`;
  };

  const defaultSecurityConfig = `# Security Configuration

# Analyse statique du code (SAST)
sonarqube:
  enabled: true
  qualityGate:
    enabled: true
    threshold: 80
  exclusions: "**/*.test.js,**/*.spec.js"

snyk:
  enabled: true
  severity: high
  failOnIssues: true

trivy:
  enabled: true
  ignoreUnfixed: true
  severity: CRITICAL,HIGH

# Gestion des secrets
vault:
  enabled: true
  address: "https://vault.example.com"
  role: "my-app"
  kvPath: "secret/my-app"
  authMethod: "kubernetes"

# Standards de conformité
compliance:
  cis:
    enabled: true
    level: 2
  pci-dss:
    enabled: true
  nist:
    enabled: true
    controls: ["AC-2", "AU-2", "SC-7"]

# Protection des conteneurs
containerSecurity:
  nonRootUser: true
  readOnlyFilesystem: true
  privilegeEscalation: false
  runAsUser: 1000
  seccompProfile: "runtime/default"
  appArmor: "runtime/default"
  scanImages: true
  denyUnauthorizedImages: true

# Génération SBOM
sbom:
  enabled: true
  format: "cyclonedx"
  outputPath: "./sbom"

# Réseau Zero Trust
zeroTrust:
  enabled: true
  mtls: true
  networkPolicies:
    enabled: true
    defaultDeny: true
  serviceIsolation: true
  egressControl: true

# Patching automatique des vulnérabilités
vulnerabilityPatching:
  enabled: true
  autoRemediation: true
  excludePatches: []
  notificationChannel: "slack"
  approvalRequired: true`;

  return (
    <pre className="text-green-400 font-mono text-sm">
      {getSecurityConfig()}
    </pre>
  );
};

export default SecurityConfigSnippet;
