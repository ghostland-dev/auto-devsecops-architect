
import { ProjectConfig, TerraformConfig } from "@/types/configurator";

export const generateProvider = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig) {
    return "";
  }
  
  switch (terraformConfig.provider) {
    case "aws":
      return `provider "aws" {
  region = "${terraformConfig.region || "us-east-1"}"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  required_version = ">= 1.0.0"
}
`;
    case "gcp":
      return `provider "google" {
  project = "${config.project?.id || "my-project"}"
  region  = "${terraformConfig.region || "us-central1"}"
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  required_version = ">= 1.0.0"
}
`;
    case "azure":
      return `provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.0.0"
}
`;
    case "oci":
      return `provider "oci" {
  region = "${terraformConfig.region || "us-ashburn-1"}"
}

terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 4.0"
    }
  }
  required_version = ">= 1.0.0"
}
`;
    default:
      return "";
  }
};

export const generateBackend = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig || !terraformConfig.backendType) {
    return "";
  }
  
  switch (terraformConfig.backendType) {
    case "s3":
      return `terraform {
  backend "s3" {
    bucket = "${terraformConfig.backendConfig?.bucket || "terraform-state"}"
    key    = "${terraformConfig.backendConfig?.key || `${config.project?.id}/terraform.tfstate`}"
    region = "${terraformConfig.backendConfig?.region || terraformConfig.region || "us-east-1"}"
    encrypt = true
    dynamodb_table = "${terraformConfig.backendConfig?.dynamodb_table || "terraform-lock"}"
  }
}
`;
    case "gcs":
      return `terraform {
  backend "gcs" {
    bucket = "${terraformConfig.backendConfig?.bucket || "terraform-state"}"
    prefix = "${terraformConfig.backendConfig?.prefix || config.project?.id}"
  }
}
`;
    case "azurerm":
      return `terraform {
  backend "azurerm" {
    resource_group_name  = "${terraformConfig.backendConfig?.resource_group_name || "terraform-state"}"
    storage_account_name = "${terraformConfig.backendConfig?.storage_account_name || "terraformstate"}"
    container_name       = "${terraformConfig.backendConfig?.container_name || "tfstate"}"
    key                  = "${terraformConfig.backendConfig?.key || `${config.project?.id}.terraform.tfstate`}"
  }
}
`;
    case "local":
      return `terraform {
  backend "local" {
    path = "${terraformConfig.backendConfig?.path || "terraform.tfstate"}"
  }
}
`;
    default:
      return "";
  }
};

export const generateVariables = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  const appName = config.project?.id?.toLowerCase() || "myapp";
  
  let variables = `variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "${appName}"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "${config.environments[0] || "dev"}"
}

`;

  if (terraformConfig?.provider) {
    switch (terraformConfig.provider) {
      case "aws":
        variables += `variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "${terraformConfig.region || "us-east-1"}"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "${terraformConfig.vpcCidr || "10.0.0.0/16"}"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["${terraformConfig.region || "us-east-1"}a", "${terraformConfig.region || "us-east-1"}b", "${terraformConfig.region || "us-east-1"}c"]
}

variable "private_subnets" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnets" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

`;
        if (config.deploymentType === "kubernetes") {
          variables += `variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "${appName}-cluster"
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.25"
}

variable "node_group_desired_size" {
  description = "Desired size of the EKS node group"
  type        = number
  default     = 2
}

variable "node_group_min_size" {
  description = "Minimum size of the EKS node group"
  type        = number
  default     = 1
}

variable "node_group_max_size" {
  description = "Maximum size of the EKS node group"
  type        = number
  default     = 5
}

variable "node_group_instance_types" {
  description = "Instance types for the EKS node group"
  type        = list(string)
  default     = ["t3.medium"]
}

`;
        }
        if (config.database) {
          variables += `variable "db_instance_class" {
  description = "Database instance class"
  type        = string
  default     = "db.t3.medium"
}

variable "db_allocated_storage" {
  description = "Allocated storage for the database (in GB)"
  type        = number
  default     = 20
}

variable "db_max_allocated_storage" {
  description = "Maximum allocated storage for the database (in GB)"
  type        = number
  default     = 100
}

variable "db_identifier" {
  description = "Database identifier"
  type        = string
  default     = "${appName}-db"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "${appName.replace(/-/g, '_')}"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "${appName.replace(/-/g, '_')}_user"
}

`;
        }
        break;
      
      case "gcp":
        variables += `variable "gcp_region" {
  description = "GCP region"
  type        = string
  default     = "${terraformConfig.region || "us-central1"}"
}

variable "gcp_zone" {
  description = "GCP zone"
  type        = string
  default     = "${terraformConfig.region || "us-central1"}-a"
}

`;
        if (config.deploymentType === "kubernetes") {
          variables += `variable "gke_cluster_name" {
  description = "Name of the GKE cluster"
  type        = string
  default     = "${appName}-cluster"
}

variable "gke_num_nodes" {
  description = "Number of GKE nodes"
  type        = number
  default     = 2
}

variable "gke_machine_type" {
  description = "Machine type for GKE nodes"
  type        = string
  default     = "e2-medium"
}

`;
        }
        break;
      
      case "azure":
        variables += `variable "azure_location" {
  description = "Azure location"
  type        = string
  default     = "${terraformConfig.region || "eastus"}"
}

variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
  default     = "${appName}-resources"
}

`;
        if (config.deploymentType === "kubernetes") {
          variables += `variable "aks_cluster_name" {
  description = "Name of the AKS cluster"
  type        = string
  default     = "${appName}-aks"
}

variable "aks_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_DS2_v2"
}

variable "aks_node_count" {
  description = "Number of AKS nodes"
  type        = number
  default     = 2
}

`;
        }
        break;
    }
  }
  
  return variables;
};

export const generateNetworking = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig) {
    return "";
  }
  
  const resourcePrefix = terraformConfig.resourcePrefix || config.project?.id?.toLowerCase() || "myapp";
  
  switch (terraformConfig.provider) {
    case "aws":
      return `# VPC and Networking
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = "${resourcePrefix}-vpc"
  cidr = var.vpc_cidr

  azs             = var.availability_zones
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

# Security Groups
resource "aws_security_group" "app" {
  name        = "${resourcePrefix}-app-sg"
  description = "Security group for ${var.app_name} application"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${resourcePrefix}-app-sg"
    Environment = var.environment
    Project     = var.app_name
  }
}

`;
    case "gcp":
      return `# VPC and Networking
resource "google_compute_network" "vpc" {
  name                    = "${resourcePrefix}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${resourcePrefix}-subnet"
  region        = var.gcp_region
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.0.0.0/24"
}

# Firewall rules
resource "google_compute_firewall" "allow_internal" {
  name    = "${resourcePrefix}-allow-internal"
  network = google_compute_network.vpc.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }

  source_ranges = ["10.0.0.0/24"]
}

resource "google_compute_firewall" "allow_http" {
  name    = "${resourcePrefix}-allow-http"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
}

`;
    case "azure":
      return `# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.azure_location
}

# Virtual Network
resource "azurerm_virtual_network" "vnet" {
  name                = "${resourcePrefix}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_subnet" "subnet" {
  name                 = "${resourcePrefix}-subnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Network Security Group
resource "azurerm_network_security_group" "nsg" {
  name                = "${resourcePrefix}-nsg"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule {
    name                       = "HTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "HTTPS"
    priority                   = 101
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

`;
    default:
      return "";
  }
};

export const generateKubernetesInfra = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig || config.deploymentType !== "kubernetes") {
    return "";
  }
  
  const resourcePrefix = terraformConfig.resourcePrefix || config.project?.id?.toLowerCase() || "myapp";
  
  switch (terraformConfig.provider) {
    case "aws":
      return `# EKS Cluster
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

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

`;
    case "gcp":
      return `# GKE Cluster
resource "google_container_cluster" "primary" {
  name     = var.gke_cluster_name
  location = var.gcp_region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "${resourcePrefix}-node-pool"
  location   = var.gcp_region
  cluster    = google_container_cluster.primary.name
  node_count = var.gke_num_nodes

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/compute",
    ]

    labels = {
      env = var.environment
    }

    machine_type = var.gke_machine_type
    tags         = ["gke-node", "${resourcePrefix}-gke"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

`;
    case "azure":
      return `# AKS Cluster
resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "${resourcePrefix}-k8s"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = var.aks_vm_size
    vnet_subnet_id = azurerm_subnet.subnet.id
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

`;
    default:
      return "";
  }
};

export const generateDatabaseInfra = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig || !config.database || config.database === "none") {
    return "";
  }
  
  const resourcePrefix = terraformConfig.resourcePrefix || config.project?.id?.toLowerCase() || "myapp";
  
  let dbEngine, dbEngineVersion, dbPort;
  
  switch (config.database) {
    case "postgresql":
      dbEngine = "postgres";
      dbEngineVersion = "15";
      dbPort = 5432;
      break;
    case "mysql":
      dbEngine = "mysql";
      dbEngineVersion = "8.0";
      dbPort = 3306;
      break;
    case "mongodb":
      // MongoDB is typically deployed via Atlas or a helm chart, not directly via Terraform
      return "";
    default:
      return "";
  }
  
  switch (terraformConfig.provider) {
    case "aws":
      return `# Database - ${config.database.toUpperCase()}
module "db_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = "${resourcePrefix}-db-sg"
  description = "${config.database.toUpperCase()} security group"
  vpc_id      = module.vpc.vpc_id

  computed_ingress_with_source_security_group_id = [
    {
      rule                     = "${config.database}"
      source_security_group_id = aws_security_group.app.id
    }
  ]
  number_of_computed_ingress_with_source_security_group_id = 1

  egress_rules = ["all-all"]

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 5.0"

  identifier = var.db_identifier

  engine               = "${dbEngine}"
  engine_version       = "${dbEngineVersion}"
  family               = "${dbEngine}${dbEngineVersion.split('.')[0]}"
  major_engine_version = "${dbEngineVersion.split('.')[0]}"
  instance_class       = var.db_instance_class

  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage

  db_name  = var.db_name
  username = var.db_username
  port     = ${dbPort}

  multi_az               = var.environment == "production"
  subnet_ids             = module.vpc.database_subnets
  vpc_security_group_ids = [module.db_security_group.security_group_id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  backup_retention_period = var.environment == "production" ? 30 : 7
  skip_final_snapshot     = var.environment != "production"
  deletion_protection     = var.environment == "production"

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

`;
    case "gcp":
      return `# Database - ${config.database.toUpperCase()}
resource "google_sql_database_instance" "instance" {
  name             = "${resourcePrefix}-db"
  database_version = "${dbEngine.toUpperCase()}_${dbEngineVersion.replace('.', '_')}"
  region           = var.gcp_region

  settings {
    tier = "db-f1-micro"
    
    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "all"
        value = "0.0.0.0/0"
      }
    }
    
    backup_configuration {
      enabled            = true
      binary_log_enabled = true
    }
  }

  deletion_protection = var.environment == "production"
}

resource "google_sql_database" "database" {
  name     = "${resourcePrefix.replace(/-/g, '_')}"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name     = "${resourcePrefix.replace(/-/g, '_')}_user"
  instance = google_sql_database_instance.instance.name
  password = "changeme" # Should be replaced with a secure password
}

`;
    case "azure":
      if (config.database === "postgresql") {
        return `# Database - PostgreSQL
resource "azurerm_postgresql_server" "postgresql" {
  name                = "${resourcePrefix}-postgresql"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku_name = "GP_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = "${resourcePrefix.replace(/-/g, '_')}_admin"
  administrator_login_password = "changeme" # Should be replaced with a secure password
  version                      = "11"
  ssl_enforcement_enabled      = true
}

resource "azurerm_postgresql_database" "postgresql_db" {
  name                = "${resourcePrefix.replace(/-/g, '_')}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.postgresql.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

resource "azurerm_postgresql_firewall_rule" "postgresql_fw_rule" {
  name                = "AllowAll"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.postgresql.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "255.255.255.255"
}

`;
      } else if (config.database === "mysql") {
        return `# Database - MySQL
resource "azurerm_mysql_server" "mysql" {
  name                = "${resourcePrefix}-mysql"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku_name = "B_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = "${resourcePrefix.replace(/-/g, '_')}_admin"
  administrator_login_password = "changeme" # Should be replaced with a secure password
  version                      = "8.0"
  ssl_enforcement_enabled      = true
}

resource "azurerm_mysql_database" "mysql_db" {
  name                = "${resourcePrefix.replace(/-/g, '_')}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_mysql_server.mysql.name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"
}

resource "azurerm_mysql_firewall_rule" "mysql_fw_rule" {
  name                = "AllowAll"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_mysql_server.mysql.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "255.255.255.255"
}

`;
      }
      return "";
    default:
      return "";
  }
};

export const generateStorageInfra = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig) {
    return "";
  }
  
  const resourcePrefix = terraformConfig.resourcePrefix || config.project?.id?.toLowerCase() || "myapp";
  
  switch (terraformConfig.provider) {
    case "aws":
      return `# S3 Bucket for application storage
module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 3.0"

  bucket = "${resourcePrefix}-bucket"
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

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

`;
    case "gcp":
      return `# GCS Bucket for application storage
resource "google_storage_bucket" "bucket" {
  name     = "${resourcePrefix}-bucket"
  location = var.gcp_region

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }
}

`;
    case "azure":
      return `# Azure Storage Account
resource "azurerm_storage_account" "storage" {
  name                     = "${resourcePrefix.replace(/-/g, '')}storage"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = var.environment
    project     = var.app_name
  }
}

resource "azurerm_storage_container" "container" {
  name                  = "${resourcePrefix}-container"
  storage_account_name  = azurerm_storage_account.storage.name
  container_access_type = "private"
}

`;
    default:
      return "";
  }
};

export const generateOutputs = (config: ProjectConfig): string => {
  const { terraformConfig } = config;
  
  if (!terraformConfig) {
    return "";
  }
  
  let outputs = "";
  
  switch (terraformConfig.provider) {
    case "aws":
      outputs += `output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}

`;
      if (config.deploymentType === "kubernetes") {
        outputs += `output "eks_cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_id" {
  description = "EKS cluster ID"
  value       = module.eks.cluster_id
}

output "eks_cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

`;
      }
      
      if (config.database && config.database !== "none") {
        outputs += `output "db_instance_address" {
  description = "The address of the RDS instance"
  value       = module.db.db_instance_address
}

output "db_instance_endpoint" {
  description = "The connection endpoint"
  value       = module.db.db_instance_endpoint
}

output "db_instance_name" {
  description = "The database name"
  value       = module.db.db_instance_name
}

`;
      }
      
      outputs += `output "s3_bucket_id" {
  description = "The name of the bucket"
  value       = module.s3_bucket.s3_bucket_id
}

output "s3_bucket_arn" {
  description = "The ARN of the bucket"
  value       = module.s3_bucket.s3_bucket_arn
}

`;
      break;
    
    case "gcp":
      outputs += `output "vpc_name" {
  description = "The name of the VPC"
  value       = google_compute_network.vpc.name
}

output "subnet_name" {
  description = "The name of the subnet"
  value       = google_compute_subnetwork.subnet.name
}

`;
      
      if (config.deploymentType === "kubernetes") {
        outputs += `output "kubernetes_cluster_name" {
  description = "GKE Cluster Name"
  value       = google_container_cluster.primary.name
}

output "kubernetes_cluster_host" {
  description = "GKE Cluster Host"
  value       = google_container_cluster.primary.endpoint
}

`;
      }
      
      if (config.database && config.database !== "none") {
        outputs += `output "db_instance_name" {
  description = "The name of the database instance"
  value       = google_sql_database_instance.instance.name
}

output "db_instance_connection_name" {
  description = "The connection name of the database instance"
  value       = google_sql_database_instance.instance.connection_name
}

`;
      }
      
      outputs += `output "storage_bucket_name" {
  description = "The name of the storage bucket"
  value       = google_storage_bucket.bucket.name
}

`;
      break;
    
    case "azure":
      outputs += `output "resource_group_name" {
  description = "The name of the resource group"
  value       = azurerm_resource_group.rg.name
}

output "virtual_network_name" {
  description = "The name of the virtual network"
  value       = azurerm_virtual_network.vnet.name
}

output "subnet_id" {
  description = "The ID of the subnet"
  value       = azurerm_subnet.subnet.id
}

`;
      
      if (config.deploymentType === "kubernetes") {
        outputs += `output "kubernetes_cluster_name" {
  description = "The name of the AKS cluster"
  value       = azurerm_kubernetes_cluster.aks.name
}

output "kubernetes_cluster_id" {
  description = "The ID of the AKS cluster"
  value       = azurerm_kubernetes_cluster.aks.id
}

output "kubernetes_cluster_fqdn" {
  description = "The FQDN of the AKS cluster"
  value       = azurerm_kubernetes_cluster.aks.fqdn
}

`;
      }
      
      if (config.database && config.database !== "none") {
        if (config.database === "postgresql") {
          outputs += `output "postgresql_server_name" {
  description = "The name of the PostgreSQL server"
  value       = azurerm_postgresql_server.postgresql.name
}

output "postgresql_server_fqdn" {
  description = "The FQDN of the PostgreSQL server"
  value       = azurerm_postgresql_server.postgresql.fqdn
}

`;
        } else if (config.database === "mysql") {
          outputs += `output "mysql_server_name" {
  description = "The name of the MySQL server"
  value       = azurerm_mysql_server.mysql.name
}

output "mysql_server_fqdn" {
  description = "The FQDN of the MySQL server"
  value       = azurerm_mysql_server.mysql.fqdn
}

`;
        }
      }
      
      outputs += `output "storage_account_name" {
  description = "The name of the storage account"
  value       = azurerm_storage_account.storage.name
}

output "storage_container_name" {
  description = "The name of the storage container"
  value       = azurerm_storage_container.container.name
}

`;
      break;
  }
  
  return outputs;
};

export const generateTerraformFiles = (config: ProjectConfig): {
  provider: string;
  variables: string;
  main: string;
  backend: string;
  outputs: string;
} => {
  // Generate provider.tf
  const providerFile = generateProvider(config);
  
  // Generate variables.tf
  const variablesFile = generateVariables(config);
  
  // Generate backend.tf
  const backendFile = generateBackend(config);
  
  // Generate main.tf
  const networkingSection = generateNetworking(config);
  const kubernetesSection = generateKubernetesInfra(config);
  const databaseSection = generateDatabaseInfra(config);
  const storageSection = generateStorageInfra(config);
  
  const mainFile = `${networkingSection}${kubernetesSection}${databaseSection}${storageSection}`;
  
  // Generate outputs.tf
  const outputsFile = generateOutputs(config);
  
  return {
    provider: providerFile,
    variables: variablesFile,
    main: mainFile,
    backend: backendFile,
    outputs: outputsFile
  };
};
