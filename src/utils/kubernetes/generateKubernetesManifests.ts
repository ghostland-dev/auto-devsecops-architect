
import { ProjectConfig, KubernetesConfig } from "@/types/configurator";

export const generateNamespace = (config: ProjectConfig): string => {
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  
  return `apiVersion: v1
kind: Namespace
metadata:
  name: ${namespace}
  labels:
    name: ${namespace}
    project: ${config.project?.id || "unknown"}
`;
};

export const generateDeployment = (config: ProjectConfig): string => {
  const appName = config.project?.id?.toLowerCase() || "myapp";
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  const replicas = config.kubernetesConfig?.replicas || 3;
  const deploymentStrategy = config.kubernetesConfig?.deploymentStrategy || "RollingUpdate";
  const port = getDefaultPort(config.language, config.framework);
  const image = `${config.containerRegistry || "docker.io"}/${appName}:latest`;
  
  return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}
  namespace: ${namespace}
  labels:
    app: ${appName}
    project: ${config.project?.id || "unknown"}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${appName}
  strategy:
    type: ${deploymentStrategy}
    ${deploymentStrategy === "RollingUpdate" ? `rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1` : ""}
  template:
    metadata:
      labels:
        app: ${appName}
    spec:
      containers:
      - name: ${appName}
        image: ${image}
        imagePullPolicy: Always
        ports:
        - containerPort: ${port}
          name: http
        env:
        - name: NODE_ENV
          value: "production"
${generateEnvVariables(config)}
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
${config.containerRegistry ? `      imagePullSecrets:
      - name: regcred` : ""}
`;
};

export const generateService = (config: ProjectConfig): string => {
  const appName = config.project?.id?.toLowerCase() || "myapp";
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  const serviceType = config.kubernetesConfig?.serviceType || "ClusterIP";
  const port = getDefaultPort(config.language, config.framework);
  
  return `apiVersion: v1
kind: Service
metadata:
  name: ${appName}-service
  namespace: ${namespace}
  labels:
    app: ${appName}
    project: ${config.project?.id || "unknown"}
spec:
  selector:
    app: ${appName}
  ports:
  - port: 80
    targetPort: ${port}
    protocol: TCP
    name: http
  type: ${serviceType}
`;
};

export const generateIngress = (config: ProjectConfig): string => {
  if (!config.kubernetesConfig?.ingressEnabled) {
    return "";
  }
  
  const appName = config.project?.id?.toLowerCase() || "myapp";
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  const domain = config.kubernetesConfig?.ingressDomain || `${appName}.example.com`;
  
  return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${appName}-ingress
  namespace: ${namespace}
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - ${domain}
    secretName: ${appName}-tls
  rules:
  - host: ${domain}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${appName}-service
            port:
              number: 80
`;
};

export const generateConfigMap = (config: ProjectConfig): string => {
  if (!config.kubernetesConfig?.configMaps || 
      Object.keys(config.kubernetesConfig.configMaps).length === 0) {
    return "";
  }
  
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  
  let configMaps = "";
  
  for (const [name, data] of Object.entries(config.kubernetesConfig.configMaps)) {
    configMaps += `apiVersion: v1
kind: ConfigMap
metadata:
  name: ${name}
  namespace: ${namespace}
data:
${Object.entries(data).map(([key, value]) => `  ${key}: "${value}"`).join('\n')}
---
`;
  }
  
  return configMaps;
};

export const generateSecret = (config: ProjectConfig): string => {
  if (!config.kubernetesConfig?.secrets || 
      Object.keys(config.kubernetesConfig.secrets).length === 0) {
    return "";
  }
  
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  
  let secrets = "";
  
  for (const [name, data] of Object.entries(config.kubernetesConfig.secrets)) {
    secrets += `apiVersion: v1
kind: Secret
metadata:
  name: ${name}
  namespace: ${namespace}
type: Opaque
data:
${Object.entries(data).map(([key, value]) => `  ${key}: "${btoa(value)}"`).join('\n')}
---
`;
  }
  
  return secrets;
};

export const generatePersistentVolume = (config: ProjectConfig): string => {
  if (!config.kubernetesConfig?.persistentVolumes || 
      config.kubernetesConfig.persistentVolumes.length === 0) {
    return "";
  }
  
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  const appName = config.project?.id?.toLowerCase() || "myapp";
  
  let pv = "";
  let pvc = "";
  
  for (const volume of config.kubernetesConfig.persistentVolumes) {
    const volumeName = `${appName}-${volume.name}`;
    
    pv += `apiVersion: v1
kind: PersistentVolume
metadata:
  name: ${volumeName}-pv
  labels:
    type: local
    app: ${appName}
spec:
  storageClassName: ${volume.storageClassName || "standard"}
  capacity:
    storage: ${volume.size}
  accessModes:
    ${volume.accessModes ? volume.accessModes.map(mode => `- ${mode}`).join('\n    ') : '- ReadWriteOnce'}
  hostPath:
    path: "/mnt/data/${volumeName}"
---
`;
    
    pvc += `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ${volumeName}-pvc
  namespace: ${namespace}
spec:
  storageClassName: ${volume.storageClassName || "standard"}
  accessModes:
    ${volume.accessModes ? volume.accessModes.map(mode => `- ${mode}`).join('\n    ') : '- ReadWriteOnce'}
  resources:
    requests:
      storage: ${volume.size}
---
`;
  }
  
  return pv + pvc;
};

export const generateHPA = (config: ProjectConfig): string => {
  if (!config.kubernetesConfig?.autoscaling?.enabled) {
    return "";
  }
  
  const appName = config.project?.id?.toLowerCase() || "myapp";
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  const minReplicas = config.kubernetesConfig.autoscaling.minReplicas || 1;
  const maxReplicas = config.kubernetesConfig.autoscaling.maxReplicas || 10;
  const targetCPU = config.kubernetesConfig.autoscaling.targetCPUUtilizationPercentage || 80;
  
  return `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${appName}-hpa
  namespace: ${namespace}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${appName}
  minReplicas: ${minReplicas}
  maxReplicas: ${maxReplicas}
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: ${targetCPU}
`;
};

export const generateNetworkPolicy = (config: ProjectConfig): string => {
  if (!config.kubernetesConfig?.networkPolicies || 
      config.kubernetesConfig.networkPolicies.length === 0) {
    return "";
  }
  
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  
  let policies = "";
  
  for (const policy of config.kubernetesConfig.networkPolicies) {
    policies += `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ${policy.name}
  namespace: ${namespace}
spec:
  podSelector:
    matchLabels:
${Object.entries(policy.podSelector).map(([key, value]) => `      ${key}: ${value}`).join('\n')}
${policy.ingress ? `  ingress:
${policy.ingress.map(ing => `  - from:
${ing.from.map(from => `    - ${from.namespaceSelector ? `namespaceSelector:
        matchLabels:
${Object.entries(from.namespaceSelector).map(([key, value]) => `          ${key}: ${value}`).join('\n')}` : ''}
      ${from.podSelector ? `podSelector:
        matchLabels:
${Object.entries(from.podSelector).map(([key, value]) => `          ${key}: ${value}`).join('\n')}` : ''}`).join('\n')}`).join('\n')}` : ''}
${policy.egress ? `  egress:
${policy.egress.map(eg => `  - to:
${eg.to.map(to => `    - ${to.namespaceSelector ? `namespaceSelector:
        matchLabels:
${Object.entries(to.namespaceSelector).map(([key, value]) => `          ${key}: ${value}`).join('\n')}` : ''}
      ${to.podSelector ? `podSelector:
        matchLabels:
${Object.entries(to.podSelector).map(([key, value]) => `          ${key}: ${value}`).join('\n')}` : ''}`).join('\n')}`).join('\n')}` : ''}
  policyTypes:
${policy.ingress ? '  - Ingress\n' : ''}${policy.egress ? '  - Egress' : ''}
---
`;
  }
  
  return policies;
};

export const generateStatefulSet = (config: ProjectConfig): string => {
  // Only generate StatefulSet for database services or if explicitly configured
  if (config.database !== "postgresql" && config.database !== "mysql" && config.database !== "mongodb") {
    return "";
  }
  
  const appName = `${config.project?.id?.toLowerCase() || "myapp"}-${config.database}`;
  const namespace = config.kubernetesConfig?.namespace || 
                    config.project?.id?.toLowerCase() || 
                    "default";
  
  let image, port, volumeMountPath;
  
  switch (config.database) {
    case "postgresql":
      image = "postgres:15";
      port = 5432;
      volumeMountPath = "/var/lib/postgresql/data";
      break;
    case "mysql":
      image = "mysql:8.0";
      port = 3306;
      volumeMountPath = "/var/lib/mysql";
      break;
    case "mongodb":
      image = "mongo:6.0";
      port = 27017;
      volumeMountPath = "/data/db";
      break;
    default:
      return "";
  }
  
  return `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ${appName}
  namespace: ${namespace}
  labels:
    app: ${appName}
    project: ${config.project?.id || "unknown"}
spec:
  serviceName: "${appName}-headless"
  replicas: 1
  selector:
    matchLabels:
      app: ${appName}
  template:
    metadata:
      labels:
        app: ${appName}
    spec:
      containers:
      - name: ${appName}
        image: ${image}
        ports:
        - containerPort: ${port}
          name: db
        env:
${getDatabaseEnvVars(config.database, config.project?.id?.toLowerCase() || "myapp")}
        volumeMounts:
        - name: data
          mountPath: ${volumeMountPath}
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "standard"
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: ${appName}-headless
  namespace: ${namespace}
  labels:
    app: ${appName}
spec:
  clusterIP: None
  selector:
    app: ${appName}
  ports:
  - port: ${port}
    targetPort: ${port}
---
apiVersion: v1
kind: Service
metadata:
  name: ${appName}
  namespace: ${namespace}
  labels:
    app: ${appName}
spec:
  selector:
    app: ${appName}
  ports:
  - port: ${port}
    targetPort: ${port}
  type: ClusterIP
`;
};

// Helper functions
const getDefaultPort = (language: string, framework?: string): number => {
  switch (language) {
    case "nodejs":
      return framework === "nextjs" ? 3000 : 3000;
    case "python":
      return framework === "django" ? 8000 : framework === "fastapi" ? 8000 : 5000;
    case "java":
      return 8080;
    case "go":
      return 8080;
    case "ruby":
      return 3000;
    case "php":
      return 80;
    case "dotnet":
      return 80;
    case "rust":
      return 8080;
    default:
      return 8080;
  }
};

const generateEnvVariables = (config: ProjectConfig): string => {
  let envVars = "";
  
  // Add database connection env vars if database is configured
  if (config.database && config.database !== "none") {
    envVars += `        - name: DB_HOST
          value: "${config.project?.id?.toLowerCase() || "myapp"}-${config.database}"
        - name: DB_PORT
          value: "${getDatabasePort(config.database)}"
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: password
        - name: DB_NAME
          value: "${config.project?.id?.toLowerCase() || "myapp"}"\n`;
  }
  
  // Add Redis connection env vars if Redis is enabled
  if (config.useRedis) {
    envVars += `        - name: REDIS_HOST
          value: "${config.project?.id?.toLowerCase() || "myapp"}-redis"
        - name: REDIS_PORT
          value: "6379"\n`;
  }
  
  // Add RabbitMQ connection env vars if RabbitMQ is enabled
  if (config.useRabbitMq) {
    envVars += `        - name: RABBITMQ_HOST
          value: "${config.project?.id?.toLowerCase() || "myapp"}-rabbitmq"
        - name: RABBITMQ_PORT
          value: "5672"
        - name: RABBITMQ_USER
          valueFrom:
            secretKeyRef:
              name: rabbitmq-credentials
              key: username
        - name: RABBITMQ_PASSWORD
          valueFrom:
            secretKeyRef:
              name: rabbitmq-credentials
              key: password\n`;
  }
  
  // Add Kafka connection env vars if Kafka is enabled
  if (config.useKafka) {
    envVars += `        - name: KAFKA_BOOTSTRAP_SERVERS
          value: "${config.project?.id?.toLowerCase() || "myapp"}-kafka:9092"\n`;
  }
  
  return envVars;
};

const getDatabasePort = (databaseType: string): string => {
  switch (databaseType) {
    case "postgresql":
      return "5432";
    case "mysql":
      return "3306";
    case "mongodb":
      return "27017";
    default:
      return "5432";
  }
};

const getDatabaseEnvVars = (databaseType: string, appName: string): string => {
  switch (databaseType) {
    case "postgresql":
      return `        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: username
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: password
        - name: POSTGRES_DB
          value: "${appName}"`;
    case "mysql":
      return `        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: password
        - name: MYSQL_DATABASE
          value: "${appName}"
        - name: MYSQL_USER
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: username
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: password`;
    case "mongodb":
      return `        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: password
        - name: MONGO_INITDB_DATABASE
          value: "${appName}"`;
    default:
      return "";
  }
};

export const generateKubernetesManifests = (config: ProjectConfig): string => {
  let manifests = "";
  
  // Generate Namespace
  manifests += generateNamespace(config);
  manifests += "---\n";
  
  // Generate ConfigMaps
  const configMaps = generateConfigMap(config);
  if (configMaps) {
    manifests += configMaps;
  }
  
  // Generate Secrets
  const secrets = generateSecret(config);
  if (secrets) {
    manifests += secrets;
  }
  
  // Generate PersistentVolumes and Claims
  const persistentVolumes = generatePersistentVolume(config);
  if (persistentVolumes) {
    manifests += persistentVolumes;
  }
  
  // Generate StatefulSet for databases
  const statefulSet = generateStatefulSet(config);
  if (statefulSet) {
    manifests += statefulSet;
  }
  
  // Generate Deployment
  manifests += generateDeployment(config);
  manifests += "---\n";
  
  // Generate Service
  manifests += generateService(config);
  manifests += "---\n";
  
  // Generate Ingress
  const ingress = generateIngress(config);
  if (ingress) {
    manifests += ingress;
    manifests += "---\n";
  }
  
  // Generate HPA
  const hpa = generateHPA(config);
  if (hpa) {
    manifests += hpa;
    manifests += "---\n";
  }
  
  // Generate NetworkPolicy
  const networkPolicy = generateNetworkPolicy(config);
  if (networkPolicy) {
    manifests += networkPolicy;
  }
  
  return manifests;
};
