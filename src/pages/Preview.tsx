
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";
import { Check, Download } from "lucide-react";

const Preview = () => {
  const [activeTab, setActiveTab] = useState("dockerfile");
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement lancé",
      description: "Votre archive DevSecOps a été générée et va être téléchargée.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: "Votre package DevSecOps est prêt à l'emploi!",
        action: (
          <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Aperçu des fichiers générés</h1>
          <Button 
            onClick={handleDownload}
            className="bg-emerald-600 hover:bg-emerald-700 flex gap-2"
          >
            <Download className="h-5 w-5" />
            Télécharger le package
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
          
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
                <TabsTrigger value="docker-compose">docker-compose</TabsTrigger>
                <TabsTrigger value="github-action">GitHub Action</TabsTrigger>
                <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
                <TabsTrigger value="terraform">Terraform</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dockerfile" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
                <pre className="text-green-400 font-mono text-sm">
{`# Dockerfile généré automatiquement pour une application Node.js Express
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
CMD ["node", "dist/main.js"]`}
                </pre>
              </TabsContent>
              
              <TabsContent value="docker-compose" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
                <pre className="text-green-400 font-mono text-sm">
{`version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: ./docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=myapp
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - ./:/app
      - /app/node_modules
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:`}
                </pre>
              </TabsContent>
              
              <TabsContent value="github-action" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
                <pre className="text-green-400 font-mono text-sm">
{`name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint code
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        
      - name: Upload build artifact
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  security-scan:
    runs-on: ubuntu-latest
    needs: build-and-test
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  build-docker-image:
    runs-on: ubuntu-latest
    needs: security-scan
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ghcr.io/\${{ github.repository }}
          tags: |
            type=ref,event=branch
            type=sha,format=short
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    runs-on: ubuntu-latest
    needs: build-docker-image
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'latest'
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Update kubeconfig
        run: aws eks update-kubeconfig --name my-cluster --region us-east-1
      
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/deployment.yml
          kubectl apply -f k8s/service.yml
          kubectl apply -f k8s/ingress.yml
          kubectl rollout status deployment/myapp`}
                </pre>
              </TabsContent>
              
              <TabsContent value="kubernetes" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
                <pre className="text-green-400 font-mono text-sm">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: default
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: ghcr.io/myorg/myapp:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: db-host
        - name: DB_PORT
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: db-port
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: db-user
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: db-password
        - name: DB_NAME
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: db-name
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
      imagePullSecrets:
      - name: regcred

---

apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: default
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  type: ClusterIP

---

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: default
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80`}
                </pre>
              </TabsContent>
              
              <TabsContent value="terraform" className="bg-slate-900 p-4 rounded-lg h-[calc(100vh-260px)] overflow-auto">
                <pre className="text-green-400 font-mono text-sm">
{`provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = var.vpc_name
  cidr = var.vpc_cidr

  azs             = var.availability_zones
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"

  tags = var.tags
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = var.cluster_name
  cluster_version = var.kubernetes_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      desired_size = var.node_group_desired_size
      min_size     = var.node_group_min_size
      max_size     = var.node_group_max_size

      instance_types = var.node_group_instance_types
      capacity_type  = "ON_DEMAND"

      update_config = {
        max_unavailable_percentage = 25
      }
    }
  }

  cluster_security_group_additional_rules = {
    egress_all = {
      description = "Allow all outbound"
      protocol    = "-1"
      from_port   = 0
      to_port     = 0
      type        = "egress"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  tags = var.tags
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 5.0"

  identifier = var.db_identifier

  engine               = "postgres"
  engine_version       = "15"
  family               = "postgres15"
  major_engine_version = "15"
  instance_class       = var.db_instance_class

  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage

  db_name  = var.db_name
  username = var.db_username
  port     = 5432

  multi_az               = var.environment == "production"
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [module.security_group_rds.security_group_id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  backup_retention_period = var.environment == "production" ? 30 : 7
  skip_final_snapshot     = var.environment != "production"
  deletion_protection     = var.environment == "production"

  tags = var.tags
}

module "security_group_rds" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = "\${var.db_identifier}-sg"
  description = "PostgreSQL security group"
  vpc_id      = module.vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      description = "PostgreSQL access from within VPC"
      cidr_blocks = module.vpc.vpc_cidr_block
    },
  ]

  tags = var.tags
}

module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 3.0"

  bucket = var.s3_bucket_name
  acl    = "private"

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  versioning = {
    enabled = true
  }

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = var.tags
}

output "eks_cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = module.eks.cluster_name
}

output "rds_hostname" {
  description = "RDS instance hostname"
  value       = module.rds.db_instance_address
}

output "rds_port" {
  description = "RDS instance port"
  value       = module.rds.db_instance_port
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = module.s3_bucket.s3_bucket_id
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}`}
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
