
import React from "react";

const SecurityConfigSnippet = () => {
  return (
    <pre className="text-green-400 font-mono text-sm">
{`# Security Configuration

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
  approvalRequired: true`}
    </pre>
  );
};

export default SecurityConfigSnippet;
