
import { ProjectConfig } from "@/types/configurator";

export const formatStaticAnalysis = (securityOptions: ProjectConfig["securityOptions"]) => {
  const snippets: string[] = [];
  
  if (securityOptions.staticAnalysis.includes("sonarqube")) {
    snippets.push(`sonarqube:
  enabled: true
  qualityGate:
    enabled: true
    threshold: 80
  exclusions: "**/*.test.js,**/*.spec.js"`);
  }
  
  if (securityOptions.staticAnalysis.includes("snyk")) {
    snippets.push(`
snyk:
  enabled: true
  severity: high
  failOnIssues: true`);
  }
  
  if (securityOptions.staticAnalysis.includes("trivy") || securityOptions.containerScan) {
    snippets.push(`
trivy:
  enabled: true
  ignoreUnfixed: true
  severity: CRITICAL,HIGH`);
  }
  
  return snippets.join("\n");
};

export const formatSecretsManagement = (config: ProjectConfig) => {
  const { securityOptions } = config;
  
  if (!securityOptions.secretsManagement) return "";
  
  return `${securityOptions.secretsManagement}:
  enabled: true
  address: "https://${securityOptions.secretsManagement}.example.com"
  role: "${config.project?.name || "my-app"}"
  kvPath: "secret/${config.project?.id || "my-app"}"
  authMethod: "kubernetes"`;
};

export const formatComplianceStandards = (securityOptions: ProjectConfig["securityOptions"]) => {
  const snippets: string[] = [];
  
  if (securityOptions.complianceStandards.includes("cis")) {
    snippets.push(`  cis:
    enabled: true
    level: 2`);
  }
  
  if (securityOptions.complianceStandards.includes("pci-dss")) {
    snippets.push(`  pci-dss:
    enabled: true`);
  }
  
  if (securityOptions.complianceStandards.includes("nist")) {
    snippets.push(`  nist:
    enabled: true
    controls: ["AC-2", "AU-2", "SC-7"]`);
  }
  
  return snippets.join("\n");
};

export const formatContainerSecurity = (securityOptions: ProjectConfig["securityOptions"]) => {
  return `containerSecurity:
  nonRootUser: true
  readOnlyFilesystem: true
  privilegeEscalation: false
  runAsUser: 1000
  seccompProfile: "runtime/default"
  appArmor: "runtime/default"
  scanImages: ${securityOptions.containerScan ? "true" : "false"}
  denyUnauthorizedImages: ${securityOptions.containerScan ? "true" : "false"}`;
};

export const formatSbom = (securityOptions: ProjectConfig["securityOptions"]) => {
  return `sbom:
  enabled: ${securityOptions.sbomGeneration ? "true" : "false"}
  format: "cyclonedx"
  outputPath: "./sbom"`;
};

export const formatZeroTrust = (securityOptions: ProjectConfig["securityOptions"]) => {
  return `zeroTrust:
  enabled: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  mtls: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  networkPolicies:
    enabled: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
    defaultDeny: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  serviceIsolation: ${securityOptions.zeroTrustNetworking ? "true" : "false"}
  egressControl: ${securityOptions.zeroTrustNetworking ? "true" : "false"}`;
};

export const formatVulnerabilityPatching = (securityOptions: ProjectConfig["securityOptions"]) => {
  return `vulnerabilityPatching:
  enabled: ${securityOptions.autoVulnPatching ? "true" : "false"}
  autoRemediation: ${securityOptions.autoVulnPatching ? "true" : "false"}
  excludePatches: []
  notificationChannel: "slack"
  approvalRequired: true`;
};

export const generateSecurityConfig = (config?: ProjectConfig) => {
  if (!config) return getDefaultSecurityConfig();

  const { securityOptions } = config;
  
  return `# Security Configuration

# Analyse statique du code (SAST)
${formatStaticAnalysis(securityOptions)}

# Gestion des secrets
${formatSecretsManagement(config)}

# Standards de conformité
compliance:
${formatComplianceStandards(securityOptions)}

# Protection des conteneurs
${formatContainerSecurity(securityOptions)}

# Génération SBOM
${formatSbom(securityOptions)}

# Réseau Zero Trust
${formatZeroTrust(securityOptions)}

# Patching automatique des vulnérabilités
${formatVulnerabilityPatching(securityOptions)}`;
};

export const getDefaultSecurityConfig = () => {
  return `# Security Configuration

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
};
