
import { ProjectConfig } from "@/types/configurator";

export const generateDockerCompose = (config: ProjectConfig): string => {
  const { 
    language, 
    framework, 
    database, 
    useRedis, 
    useRabbitMq, 
    deploymentType,
    environmentsConfig,
    languageDetails
  } = config;
  
  if (!language) {
    return "# Select a language to generate a docker-compose.yml";
  }

  const appServicePort = getDefaultPort(language, framework);
  const appName = config.project?.name?.toLowerCase().replace(/\s+/g, '-') || "myapp";
  
  let composeFile = `version: '3.8'\n\nservices:\n`;
  
  // Add app service
  composeFile += generateAppService(config, appName, appServicePort);
  
  // Add database service if needed
  if (database && database !== "none") {
    composeFile += generateDatabaseService(database, appName);
  }
  
  // Add Redis service if needed
  if (useRedis) {
    composeFile += generateRedisService(appName);
  }
  
  // Add RabbitMQ service if needed
  if (useRabbitMq) {
    composeFile += generateRabbitMQService(appName);
  }
  
  // Add networks
  composeFile += `\nnetworks:\n  ${appName}-network:\n    driver: bridge\n`;
  
  // Add volumes
  composeFile += `\nvolumes:\n`;
  if (database && database !== "none") {
    composeFile += `  ${database}-data:\n`;
  }
  if (useRedis) {
    composeFile += `  redis-data:\n`;
  }
  if (useRabbitMq) {
    composeFile += `  rabbitmq-data:\n`;
  }
  
  return composeFile;
};

const getDefaultPort = (language: string, framework?: string): string => {
  switch (language) {
    case "nodejs":
      return framework === "nextjs" ? "3000" : "3000";
    case "python":
      return framework === "django" ? "8000" : framework === "fastapi" ? "8000" : "5000";
    case "java":
      return "8080";
    case "go":
      return "8080";
    case "ruby":
      return "3000";
    case "php":
      return "80";
    case "dotnet":
      return "80";
    case "rust":
      return "8080";
    default:
      return "8080";
  }
};

const generateAppService = (config: ProjectConfig, appName: string, port: string): string => {
  const { language, framework, database, useRedis, useRabbitMq } = config;
  
  let service = `  app:\n`;
  service += `    build:\n      context: .\n      dockerfile: Dockerfile\n`;
  service += `    ports:\n      - "${port}:${port}"\n`;
  service += `    environment:\n`;
  service += `      - NODE_ENV=development\n`;
  
  // Add database environment variables
  if (database && database !== "none") {
    service += `      - DB_HOST=${database}\n`;
    service += `      - DB_PORT=${getDatabasePort(database)}\n`;
    service += `      - DB_USER=${getDatabaseUser(database)}\n`;
    service += `      - DB_PASSWORD=${getDatabasePassword()}\n`;
    service += `      - DB_NAME=${appName}\n`;
  }
  
  // Add Redis environment variables
  if (useRedis) {
    service += `      - REDIS_HOST=redis\n`;
    service += `      - REDIS_PORT=6379\n`;
  }
  
  // Add RabbitMQ environment variables
  if (useRabbitMq) {
    service += `      - RABBITMQ_HOST=rabbitmq\n`;
    service += `      - RABBITMQ_PORT=5672\n`;
    service += `      - RABBITMQ_USER=guest\n`;
    service += `      - RABBITMQ_PASSWORD=guest\n`;
  }
  
  // Add volumes for development
  service += `    volumes:\n`;
  service += `      - ./:/app\n`;
  
  // Skip node_modules mounting for Node.js
  if (language === "nodejs") {
    service += `      - /app/node_modules\n`;
  }
  
  // Add depends on
  let dependsOn = [];
  if (database && database !== "none") dependsOn.push(database);
  if (useRedis) dependsOn.push("redis");
  if (useRabbitMq) dependsOn.push("rabbitmq");
  
  if (dependsOn.length > 0) {
    service += `    depends_on:\n`;
    dependsOn.forEach(dep => {
      service += `      - ${dep}\n`;
    });
  }
  
  // Add networks
  service += `    networks:\n      - ${appName}-network\n`;
  
  // Add healthcheck
  service += `    healthcheck:\n      test: ["CMD"`
  
  switch (language) {
    case "nodejs":
      service += `, "wget", "--spider", "http://localhost:${port}/health"]\n`;
      break;
    case "python":
      service += `, "curl", "-f", "http://localhost:${port}/health"]\n`;
      break;
    case "java":
      service += `, "curl", "-f", "http://localhost:${port}/actuator/health"]\n`;
      break;
    default:
      service += `, "wget", "--spider", "http://localhost:${port}/health"]\n`;
  }
  
  service += `      interval: 30s\n      timeout: 10s\n      retries: 3\n\n`;
  
  return service;
};

const generateDatabaseService = (databaseType: string, appName: string): string => {
  switch (databaseType) {
    case "postgresql":
      return `  postgres:\n` +
        `    image: postgres:15-alpine\n` +
        `    ports:\n` +
        `      - "5432:5432"\n` +
        `    environment:\n` +
        `      - POSTGRES_USER=postgres\n` +
        `      - POSTGRES_PASSWORD=postgres\n` +
        `      - POSTGRES_DB=${appName}\n` +
        `    volumes:\n` +
        `      - postgresql-data:/var/lib/postgresql/data\n` +
        `    networks:\n` +
        `      - ${appName}-network\n` +
        `    healthcheck:\n` +
        `      test: ["CMD-SHELL", "pg_isready -U postgres"]\n` +
        `      interval: 10s\n` +
        `      timeout: 5s\n` +
        `      retries: 5\n\n`;
    
    case "mysql":
      return `  mysql:\n` +
        `    image: mysql:8.0\n` +
        `    ports:\n` +
        `      - "3306:3306"\n` +
        `    environment:\n` +
        `      - MYSQL_ROOT_PASSWORD=rootpassword\n` +
        `      - MYSQL_DATABASE=${appName}\n` +
        `      - MYSQL_USER=mysql\n` +
        `      - MYSQL_PASSWORD=mysql\n` +
        `    volumes:\n` +
        `      - mysql-data:/var/lib/mysql\n` +
        `    networks:\n` +
        `      - ${appName}-network\n` +
        `    healthcheck:\n` +
        `      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]\n` +
        `      interval: 10s\n` +
        `      timeout: 5s\n` +
        `      retries: 5\n\n`;
    
    case "mongodb":
      return `  mongodb:\n` +
        `    image: mongo:6.0\n` +
        `    ports:\n` +
        `      - "27017:27017"\n` +
        `    environment:\n` +
        `      - MONGO_INITDB_ROOT_USERNAME=mongodb\n` +
        `      - MONGO_INITDB_ROOT_PASSWORD=mongodb\n` +
        `      - MONGO_INITDB_DATABASE=${appName}\n` +
        `    volumes:\n` +
        `      - mongodb-data:/data/db\n` +
        `    networks:\n` +
        `      - ${appName}-network\n` +
        `    healthcheck:\n` +
        `      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet\n` +
        `      interval: 10s\n` +
        `      timeout: 5s\n` +
        `      retries: 5\n\n`;
    
    default:
      return "";
  }
};

const generateRedisService = (appName: string): string => {
  return `  redis:\n` +
    `    image: redis:7-alpine\n` +
    `    ports:\n` +
    `      - "6379:6379"\n` +
    `    volumes:\n` +
    `      - redis-data:/data\n` +
    `    networks:\n` +
    `      - ${appName}-network\n` +
    `    healthcheck:\n` +
    `      test: ["CMD", "redis-cli", "ping"]\n` +
    `      interval: 10s\n` +
    `      timeout: 5s\n` +
    `      retries: 5\n\n`;
};

const generateRabbitMQService = (appName: string): string => {
  return `  rabbitmq:\n` +
    `    image: rabbitmq:3-management-alpine\n` +
    `    ports:\n` +
    `      - "5672:5672"  # AMQP port\n` +
    `      - "15672:15672"  # Management interface port\n` +
    `    volumes:\n` +
    `      - rabbitmq-data:/var/lib/rabbitmq\n` +
    `    networks:\n` +
    `      - ${appName}-network\n` +
    `    healthcheck:\n` +
    `      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]\n` +
    `      interval: 10s\n` +
    `      timeout: 5s\n` +
    `      retries: 5\n\n`;
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

const getDatabaseUser = (databaseType: string): string => {
  switch (databaseType) {
    case "postgresql":
      return "postgres";
    case "mysql":
      return "mysql";
    case "mongodb":
      return "mongodb";
    default:
      return "dbuser";
  }
};

const getDatabasePassword = (): string => {
  return "postgres"; // In a real app, this should be a generated secure password
};
