
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectConfig } from "@/types/configurator";

interface FilePreviewProps {
  config: ProjectConfig;
}

const FilePreview = ({ config }: FilePreviewProps) => {
  const [activeTab, setActiveTab] = useState("dockerfile");
  
  const getDockerfilePreview = () => {
    if (!config.language) return "# Sélectionnez un langage pour voir un aperçu du Dockerfile";
    
    if (config.language === "nodejs") {
      return `# Dockerfile généré pour Node.js${config.framework ? ` (${config.framework})` : ''}
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers package.json et installation des dépendances
COPY package*.json ./
RUN npm ci

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape de production
FROM node:18-alpine AS production

WORKDIR /app

# Copie des fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Configuration des variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposition du port
EXPOSE 3000

# Utilisateur non-root pour la sécurité
USER node

# Lancement de l'application
CMD ["node", "dist/main.js"]`;
    } else if (config.language === "python") {
      return `# Dockerfile généré pour Python${config.framework ? ` (${config.framework})` : ''}
FROM python:3.11-slim AS builder

WORKDIR /app

# Installation des dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code source
COPY . .

# Étape de production
FROM python:3.11-slim

WORKDIR /app

# Copie des dépendances et du code
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /app .

# Configuration des variables d'environnement
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Exposition du port
EXPOSE 8000

# Utilisateur non-root pour la sécurité
RUN useradd -m appuser
USER appuser

# Lancement de l'application
CMD ["python", "app.py"]`;
    } else if (config.language === "java") {
      return `# Dockerfile généré pour Java${config.framework ? ` (${config.framework})` : ''}
FROM maven:3.8-openjdk-17 AS builder

WORKDIR /app

# Copie du fichier pom.xml
COPY pom.xml .
# Téléchargement des dépendances
RUN mvn dependency:go-offline

# Copie du code source
COPY src ./src

# Build de l'application
RUN mvn package -DskipTests

# Étape de production
FROM openjdk:17-slim

WORKDIR /app

# Copie du jar depuis l'étape de build
COPY --from=builder /app/target/*.jar app.jar

# Exposition du port
EXPOSE 8080

# Utilisateur non-root pour la sécurité
RUN useradd -m appuser
USER appuser

# Lancement de l'application
CMD ["java", "-jar", "app.jar"]`;
    } else if (config.language === "go") {
      return `# Dockerfile généré pour Go${config.framework ? ` (${config.framework})` : ''}
FROM golang:1.19-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY go.mod go.sum ./
RUN go mod download

# Copie du code source
COPY . .

# Build de l'application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# Étape de production
FROM alpine:3.17

WORKDIR /app

# Installation des certificats CA
RUN apk --no-cache add ca-certificates

# Copie de l'exécutable
COPY --from=builder /app/app .

# Exposition du port
EXPOSE 8080

# Utilisateur non-root pour la sécurité
RUN adduser -D appuser
USER appuser

# Lancement de l'application
CMD ["./app"]`;
    }
    
    return "# Sélectionnez un langage pour voir un aperçu du Dockerfile";
  };
  
  const getCiCdPreview = () => {
    if (!config.ciCdProvider) return "# Sélectionnez un fournisseur CI/CD pour voir un aperçu";
    
    if (config.ciCdProvider === "github") {
      return `# GitHub Actions Workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup ${config.language === "nodejs" ? "Node.js" : config.language === "python" ? "Python" : config.language === "java" ? "Java" : "Go"}
        uses: ${config.language === "nodejs" ? "actions/setup-node@v3" : config.language === "python" ? "actions/setup-python@v4" : config.language === "java" ? "actions/setup-java@v3" : "actions/setup-go@v4"}
        with:
          ${config.language === "nodejs" ? "node-version: '18'" : config.language === "python" ? "python-version: '3.11'" : config.language === "java" ? "java-version: '17'" : "go-version: '1.19'"}
      
      # Installation des dépendances et tests
      # ...
      
  security-scan:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Security Scans
        # ...
        
  build-docker:
    needs: security-scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and Push Docker image
        uses: docker/build-push-action@v4
        # ...
        
  deploy:
    needs: build-docker
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ${config.cloudProvider || "your cloud provider"}
        # ...`;
    } else if (config.ciCdProvider === "gitlab") {
      return `# GitLab CI/CD Pipeline
stages:
  - build
  - test
  - security
  - docker
  - deploy

variables:
  DOCKER_IMAGE: ${config.containerRegistry ? `${config.containerRegistry}/myapp` : "myapp"}

build:
  stage: build
  image: ${config.language === "nodejs" ? "node:18-alpine" : config.language === "python" ? "python:3.11-slim" : config.language === "java" ? "maven:3.8-openjdk-17" : "golang:1.19-alpine"}
  script:
    # Build commands...
  artifacts:
    paths:
      - dist/

test:
  stage: test
  image: ${config.language === "nodejs" ? "node:18-alpine" : config.language === "python" ? "python:3.11-slim" : config.language === "java" ? "maven:3.8-openjdk-17" : "golang:1.19-alpine"}
  script:
    # Test commands...

security:
  stage: security
  image: aquasec/trivy
  script:
    - trivy fs --severity HIGH,CRITICAL .

docker:
  stage: docker
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE

deploy:
  stage: deploy
  image: bitnami/kubectl
  script:
    # Deploy commands...
  environment:
    name: production
  only:
    - main`;
    } else if (config.ciCdProvider === "jenkins") {
      return `// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "${config.containerRegistry ? `${config.containerRegistry}/myapp` : "myapp"}"
    }
    
    stages {
        stage('Build') {
            steps {
                // Build commands...
            }
        }
        
        stage('Test') {
            steps {
                // Test commands...
            }
        }
        
        stage('Security Scan') {
            steps {
                // Security scan commands...
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                // Deploy commands...
            }
        }
    }
    
    post {
        always {
            // Clean up...
        }
    }
}`;
    }
    
    return "# Sélectionnez un fournisseur CI/CD pour voir un aperçu";
  };
  
  const getKubernetesPreview = () => {
    if (!config.deploymentType) return "# Sélectionnez un type de déploiement pour voir un aperçu";
    
    if (config.deploymentType === "kubernetes") {
      return `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: ${config.containerRegistry ? `${config.containerRegistry}/myapp:latest` : "myapp:latest"}
        ports:
        - containerPort: ${config.language === "nodejs" ? "3000" : config.language === "python" ? "8000" : "8080"}
        resources:
          limits:
            cpu: "1"
            memory: "512Mi"
          requests:
            cpu: "500m"
            memory: "256Mi"
        env:
        - name: NODE_ENV
          value: "production"
        ${config.database ? `- name: DB_HOST\n          valueFrom:\n            secretKeyRef:\n              name: db-secrets\n              key: host` : ""}
        livenessProbe:
          httpGet:
            path: /health
            port: ${config.language === "nodejs" ? "3000" : config.language === "python" ? "8000" : "8080"}
          initialDelaySeconds: 30
          periodSeconds: 10
        
---
# Service
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: ${config.language === "nodejs" ? "3000" : config.language === "python" ? "8000" : "8080"}
  type: ClusterIP

---
# Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port: 
              number: 80`;
    } else if (config.deploymentType === "helm") {
      return `# Helm Chart values.yaml
replicaCount: 3

image:
  repository: ${config.containerRegistry ? `${config.containerRegistry}/myapp` : "myapp"}
  tag: latest
  pullPolicy: Always

service:
  type: ClusterIP
  port: 80
  targetPort: ${config.language === "nodejs" ? "3000" : config.language === "python" ? "8000" : "8080"}

ingress:
  enabled: true
  className: "nginx"
  hosts:
    - host: myapp.example.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 1000m
    memory: 512Mi
  requests:
    cpu: 500m
    memory: 256Mi

${config.database ? `database:\n  enabled: true\n  type: "${config.database}"` : ""}

${config.useRedis ? "redis:\n  enabled: true" : ""}

${config.useRabbitMq ? "rabbitmq:\n  enabled: true" : ""}

env:
  - name: NODE_ENV
    value: "production"`;
    } else if (config.deploymentType === "serverless") {
      return `# serverless.yml
service: myapp

provider:
  name: ${config.cloudProvider === "aws" ? "aws" : "azure"}
  runtime: ${config.language === "nodejs" ? "nodejs18.x" : config.language === "python" ? "python3.11" : config.language === "java" ? "java17" : "go1.x"}
  region: ${config.cloudProvider === "aws" ? "us-east-1" : "westus2"}
  
functions:
  api:
    handler: ${config.language === "nodejs" ? "src/handler.api" : config.language === "python" ? "src/handler.api" : config.language === "java" ? "com.example.Handler::handleRequest" : "src/handler.Api"}
    events:
      - http:
          path: /
          method: any
      - http:
          path: /{proxy+}
          method: any

resources:
  Resources:
    ${config.database ? `MyDatabase:\n      Type: AWS::RDS::DBInstance\n      Properties:\n        Engine: ${config.database === "postgresql" ? "postgres" : config.database}` : ""}`;
    }
    
    return "# Sélectionnez un type de déploiement pour voir un aperçu";
  };
  
  const getTerraformPreview = () => {
    if (!config.cloudProvider) return "# Sélectionnez un cloud provider pour voir un aperçu Terraform";
    
    if (config.cloudProvider === "aws") {
      return `# Terraform pour AWS
provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = "myapp-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Environment = "${config.environments?.includes("prod") ? "production" : "development"}"
    Project     = "myapp"
  }
}

${config.deploymentType === "kubernetes" ? `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = "myapp-cluster"
  cluster_version = "1.24"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      desired_size = 2
      min_size     = 1
      max_size     = 3

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }
}` : ""}

${config.database ? `module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 5.0"

  identifier = "myapp-db"

  engine               = "${config.database === "postgresql" ? "postgres" : config.database}"
  engine_version       = "${config.database === "postgresql" ? "14" : config.database === "mysql" ? "8.0" : "5.7"}"
  family               = "${config.database === "postgresql" ? "postgres14" : config.database === "mysql" ? "mysql8.0" : "mysql5.7"}"
  major_engine_version = "${config.database === "postgresql" ? "14" : config.database === "mysql" ? "8.0" : "5.7"}"
  instance_class       = "db.t3.medium"

  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = "myapp"
  username = "myappuser"
  port     = "${config.database === "postgresql" ? "5432" : "3306"}"

  multi_az               = ${config.environments?.includes("prod") ? "true" : "false"}
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [aws_security_group.db.id]
}` : ""}

${config.useRedis ? `resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "myapp-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis.id]
}` : ""}`;
    } else if (config.cloudProvider === "azure") {
      return `# Terraform pour Azure
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "myapp-resources"
  location = "West Europe"
}

resource "azurerm_virtual_network" "main" {
  name                = "myapp-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "main" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

${config.deploymentType === "kubernetes" ? `resource "azurerm_kubernetes_cluster" "main" {
  name                = "myapp-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "myapp-k8s"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_D2_v2"
    vnet_subnet_id = azurerm_subnet.main.id
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "${config.environments?.includes("prod") ? "production" : "development"}"
  }
}` : ""}

${config.database ? `resource "azurerm_postgresql_server" "main" {
  name                = "myapp-postgres"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  sku_name = "GP_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = "psqladmin"
  administrator_login_password = "H@Sh1CoR3!"
  version                      = "11"
  ssl_enforcement_enabled      = true
}

resource "azurerm_postgresql_database" "main" {
  name                = "myappdb"
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_postgresql_server.main.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}` : ""}

${config.useRedis ? `resource "azurerm_redis_cache" "main" {
  name                = "myapp-redis"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  capacity            = 1
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
  }
}` : ""}`;
    } else if (config.cloudProvider === "gcp") {
      return `# Terraform pour Google Cloud Platform
provider "google" {
  project = "myapp-project"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_compute_network" "vpc" {
  name                    = "myapp-vpc"
  auto_create_subnetworks = "false"
}

resource "google_compute_subnetwork" "subnet" {
  name          = "myapp-subnet"
  region        = "us-central1"
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.0.0.0/24"
}

${config.deploymentType === "kubernetes" ? `resource "google_container_cluster" "primary" {
  name     = "myapp-gke"
  location = "us-central1"

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "myapp-node-pool"
  location   = "us-central1"
  cluster    = google_container_cluster.primary.name
  node_count = 2

  node_config {
    preemptible  = true
    machine_type = "e2-medium"

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}` : ""}

${config.database ? `resource "google_sql_database_instance" "main" {
  name             = "myapp-db-instance"
  database_version = "${config.database === "postgresql" ? "POSTGRES_14" : "MYSQL_8_0"}"
  region           = "us-central1"

  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "all"
        value = "0.0.0.0/0"
      }
    }
  }
}

resource "google_sql_database" "database" {
  name     = "myapp"
  instance = google_sql_database_instance.main.name
}

resource "google_sql_user" "users" {
  name     = "myappuser"
  instance = google_sql_database_instance.main.name
  password = "changeme"
}` : ""}

${config.useRedis ? `resource "google_redis_instance" "cache" {
  name           = "myapp-redis"
  memory_size_gb = 1
  region         = "us-central1"
}` : ""}`;
    }
    
    return "# Sélectionnez un cloud provider pour voir un aperçu Terraform";
  };
  
  const getPreviewContent = () => {
    switch (activeTab) {
      case "dockerfile":
        return getDockerfilePreview();
      case "cicd":
        return getCiCdPreview();
      case "kubernetes":
        return getKubernetesPreview();
      case "terraform":
        return getTerraformPreview();
      default:
        return "# Sélectionnez un onglet pour voir un aperçu";
    }
  };
  
  const isTabDisabled = (tab: string) => {
    if (tab === "dockerfile" && !config.language) return true;
    if (tab === "cicd" && !config.ciCdProvider) return true;
    if (tab === "kubernetes" && !config.deploymentType) return true;
    if (tab === "terraform" && !config.cloudProvider) return true;
    return false;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Aperçu des fichiers générés</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dockerfile" disabled={isTabDisabled("dockerfile")}>
              Dockerfile
            </TabsTrigger>
            <TabsTrigger value="cicd" disabled={isTabDisabled("cicd")}>
              CI/CD
            </TabsTrigger>
            <TabsTrigger value="kubernetes" disabled={isTabDisabled("kubernetes")}>
              Kubernetes
            </TabsTrigger>
            <TabsTrigger value="terraform" disabled={isTabDisabled("terraform")}>
              Terraform
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <pre className="bg-slate-900 text-green-400 p-4 rounded-md overflow-auto text-sm max-h-60">
              {getPreviewContent()}
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FilePreview;
