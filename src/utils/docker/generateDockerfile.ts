
import { ProjectConfig, LanguageDetails } from "@/types/configurator";

export const generateDockerfile = (config: ProjectConfig): string => {
  const { language, framework, languageDetails } = config;
  
  if (!language) {
    return "# Select a language to generate a Dockerfile";
  }

  switch (language) {
    case "nodejs":
      return generateNodejsDockerfile(framework, languageDetails);
    case "python":
      return generatePythonDockerfile(framework, languageDetails);
    case "java":
      return generateJavaDockerfile(framework, languageDetails);
    case "go":
      return generateGoDockerfile(framework, languageDetails);
    case "ruby":
      return generateRubyDockerfile(framework, languageDetails);
    case "php":
      return generatePhpDockerfile(framework, languageDetails);
    case "dotnet":
      return generateDotNetDockerfile(framework, languageDetails);
    case "rust":
      return generateRustDockerfile(framework, languageDetails);
    default:
      return `# Dockerfile for ${language} application\n# Custom configuration required`;
  }
};

const generateNodejsDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const nodeVersion = details?.version || "18";
  const packageManager = details?.packageManager || "npm";
  const buildCommand = framework === "nextjs" ? "npm run build" : "npm run build";
  const startCommand = framework === "nextjs" ? "npm start" : "node dist/main.js";
  const port = "3000";

  return `# Dockerfile generated for Node.js${framework ? ` (${framework})` : ''}
FROM node:${nodeVersion}-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN ${packageManager} ci

# Copy source code
COPY . .

# Build the application
RUN ${buildCommand}

# Production stage
FROM node:${nodeVersion}-alpine AS production

WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/${framework === "nextjs" ? ".next" : "dist"} ./${framework === "nextjs" ? ".next" : "dist"}

# Set environment variables
ENV NODE_ENV=production
ENV PORT=${port}

# Expose port
EXPOSE ${port}

# Use non-root user for security
USER node

# Start the application
CMD ["${startCommand}"]`;
};

const generatePythonDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const pythonVersion = details?.version || "3.11";
  const port = framework === "django" ? "8000" : "5000";
  const startCommand = framework === "django" ? "python manage.py runserver 0.0.0.0:8000" : 
                      framework === "flask" ? "flask run --host=0.0.0.0" :
                      framework === "fastapi" ? "uvicorn main:app --host 0.0.0.0 --port 8000" : 
                      "python app.py";

  return `# Dockerfile generated for Python${framework ? ` (${framework})` : ''}
FROM python:${pythonVersion}-slim AS builder

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Production stage
FROM python:${pythonVersion}-slim

WORKDIR /app

# Copy dependencies and code
COPY --from=builder /usr/local/lib/python${pythonVersion}/site-packages /usr/local/lib/python${pythonVersion}/site-packages
COPY --from=builder /app .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=${port}

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Start the application
CMD ["${startCommand}"]`;
};

const generateJavaDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const javaVersion = details?.version || "17";
  const buildTool = details?.buildTool || "maven";
  const port = "8080";

  if (buildTool === "maven") {
    return `# Dockerfile generated for Java${framework ? ` (${framework})` : ''}
FROM maven:3.8-openjdk-${javaVersion} AS builder

WORKDIR /app

# Copy POM file
COPY pom.xml .
# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Production stage
FROM openjdk:${javaVersion}-slim

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Start the application
CMD ["java", "-jar", "app.jar"]`;
  } else {
    return `# Dockerfile generated for Java${framework ? ` (${framework})` : ''}
FROM gradle:7.4-jdk${javaVersion} AS builder

WORKDIR /app

# Copy build files
COPY build.gradle settings.gradle ./
# Download dependencies
RUN gradle dependencies

# Copy source code
COPY src ./src

# Build the application
RUN gradle build -x test

# Production stage
FROM openjdk:${javaVersion}-slim

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Start the application
CMD ["java", "-jar", "app.jar"]`;
  }
};

const generateGoDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const goVersion = details?.version || "1.19";
  const port = "8080";

  return `# Dockerfile generated for Go${framework ? ` (${framework})` : ''}
FROM golang:${goVersion}-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# Production stage
FROM alpine:3.17

WORKDIR /app

# Install CA certificates
RUN apk --no-cache add ca-certificates

# Copy executable
COPY --from=builder /app/app .

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN adduser -D appuser
USER appuser

# Start the application
CMD ["./app"]`;
};

const generateRubyDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const rubyVersion = details?.version || "3.2";
  const port = "3000";

  return `# Dockerfile generated for Ruby${framework ? ` (${framework})` : ''}
FROM ruby:${rubyVersion}-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache build-base postgresql-dev

# Copy Gemfile
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

# Copy application code
COPY . .

# Production stage
FROM ruby:${rubyVersion}-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache postgresql-client

# Copy gems and application from builder
COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
COPY --from=builder /app .

# Set environment variables
ENV RAILS_ENV=production
ENV PORT=${port}

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the application
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]`;
};

const generatePhpDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const phpVersion = details?.version || "8.2";
  const port = "80";

  return `# Dockerfile generated for PHP${framework ? ` (${framework})` : ''}
FROM composer:2 AS composer

WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-dev

# Copy application code
COPY . .
RUN composer dump-autoload --optimize

# Production stage
FROM php:${phpVersion}-fpm-alpine

WORKDIR /var/www/html

# Install extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy application from composer stage
COPY --from=composer /app .

# Configure PHP
COPY php.ini /usr/local/etc/php/conf.d/

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start PHP-FPM
CMD ["php-fpm"]`;
};

const generateDotNetDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const dotnetVersion = details?.version || "7.0";
  const port = "80";

  return `# Dockerfile generated for .NET${framework ? ` (${framework})` : ''}
FROM mcr.microsoft.com/dotnet/sdk:${dotnetVersion} AS build

WORKDIR /source

# Copy csproj and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy and publish application
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# Production stage
FROM mcr.microsoft.com/dotnet/aspnet:${dotnetVersion}

WORKDIR /app

# Copy from build stage
COPY --from=build /app ./

# Set environment variables
ENV ASPNETCORE_URLS=http://+:${port}
ENV DOTNET_RUNNING_IN_CONTAINER=true

# Expose port
EXPOSE ${port}

# Start the application
CMD ["dotnet", "YourApp.dll"]`;
};

const generateRustDockerfile = (framework?: string, details?: LanguageDetails): string => {
  const rustVersion = details?.version || "1.67";
  const port = "8080";

  return `# Dockerfile generated for Rust${framework ? ` (${framework})` : ''}
FROM rust:${rustVersion}-slim AS builder

WORKDIR /usr/src/app

# Copy Cargo files
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release && rm -rf src

# Copy source code
COPY . .
RUN touch src/main.rs && cargo build --release

# Production stage
FROM debian:buster-slim

WORKDIR /usr/src/app

# Install dependencies
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy binary from builder stage
COPY --from=builder /usr/src/app/target/release/app .

# Expose port
EXPOSE ${port}

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Start the application
CMD ["./app"]`;
};
