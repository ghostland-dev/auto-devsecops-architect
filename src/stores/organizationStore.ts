
import { create } from 'zustand';
import { Organization, Project } from '@/types/configurator';

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  
  fetchOrganizations: () => Promise<void>;
  createOrganization: (organization: Partial<Organization>) => Promise<Organization>;
  updateOrganization: (id: string, updates: Partial<Organization>) => Promise<Organization>;
  deleteOrganization: (id: string) => Promise<void>;
  
  setCurrentOrganization: (orgId: string) => void;
  setCurrentProject: (projectId: string) => void;
  
  createProject: (orgId: string, project: Partial<Project>) => Promise<Project>;
  updateProject: (orgId: string, projectId: string, updates: Partial<Project>) => Promise<Project>;
  deleteProject: (orgId: string, projectId: string) => Promise<void>;
}

// This is a mock implementation. In a real app, you would connect to your backend.
export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  organizations: [],
  currentOrganization: null,
  currentProject: null,
  isLoading: false,
  error: null,
  
  fetchOrganizations: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock fetch - in a real app, this would be an API call
      const mockOrgs: Organization[] = [
        {
          id: "1",
          name: "Default Organization",
          description: "Your first organization",
          projects: [
            {
              id: "1",
              name: "Sample Project",
              description: "A sample DevSecOps project",
              repository: "https://github.com/org/sample-project",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        organizations: mockOrgs, 
        currentOrganization: mockOrgs[0],
        currentProject: mockOrgs[0].projects?.[0] || null,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch organizations" });
    }
  },
  
  createOrganization: async (organization) => {
    set({ isLoading: true, error: null });
    
    try {
      // Create a new organization object
      const newOrg: Organization = {
        id: Date.now().toString(),
        name: organization.name || "New Organization",
        description: organization.description || "",
        projects: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...organization
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({ 
        organizations: [...state.organizations, newOrg],
        isLoading: false
      }));
      
      return newOrg;
    } catch (error) {
      set({ isLoading: false, error: "Failed to create organization" });
      throw error;
    }
  },
  
  updateOrganization: async (id, updates) => {
    set({ isLoading: true, error: null });
    
    try {
      // Find and update the organization
      const updatedOrgs = get().organizations.map(org => 
        org.id === id 
          ? { ...org, ...updates, updatedAt: new Date().toISOString() } 
          : org
      );
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedOrg = updatedOrgs.find(org => org.id === id);
      
      if (!updatedOrg) {
        throw new Error("Organization not found");
      }
      
      set({ 
        organizations: updatedOrgs,
        currentOrganization: get().currentOrganization?.id === id 
          ? updatedOrg 
          : get().currentOrganization,
        isLoading: false
      });
      
      return updatedOrg;
    } catch (error) {
      set({ isLoading: false, error: "Failed to update organization" });
      throw error;
    }
  },
  
  deleteOrganization: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Filter out the organization
      const filteredOrgs = get().organizations.filter(org => org.id !== id);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        organizations: filteredOrgs,
        currentOrganization: get().currentOrganization?.id === id 
          ? filteredOrgs[0] || null 
          : get().currentOrganization,
        currentProject: get().currentOrganization?.id === id 
          ? null
          : get().currentProject,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false, error: "Failed to delete organization" });
      throw error;
    }
  },
  
  setCurrentOrganization: (orgId) => {
    const org = get().organizations.find(org => org.id === orgId);
    if (org) {
      set({ 
        currentOrganization: org,
        currentProject: org.projects?.[0] || null
      });
    }
  },
  
  setCurrentProject: (projectId) => {
    const org = get().currentOrganization;
    if (org) {
      const project = org.projects?.find(proj => proj.id === projectId);
      if (project) {
        set({ currentProject: project });
      }
    }
  },
  
  createProject: async (orgId, project) => {
    set({ isLoading: true, error: null });
    
    try {
      // Create a new project object
      const newProject: Project = {
        id: Date.now().toString(),
        name: project.name || "New Project",
        description: project.description || "",
        configurations: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...project
      };
      
      // Update the organization with the new project
      const updatedOrgs = get().organizations.map(org => {
        if (org.id === orgId) {
          return {
            ...org,
            projects: [...(org.projects || []), newProject],
            updatedAt: new Date().toISOString()
          };
        }
        return org;
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedOrg = updatedOrgs.find(org => org.id === orgId);
      
      set({ 
        organizations: updatedOrgs,
        currentOrganization: updatedOrg || get().currentOrganization,
        currentProject: newProject,
        isLoading: false
      });
      
      return newProject;
    } catch (error) {
      set({ isLoading: false, error: "Failed to create project" });
      throw error;
    }
  },
  
  updateProject: async (orgId, projectId, updates) => {
    set({ isLoading: true, error: null });
    
    try {
      // Find and update the project in the organization
      const updatedOrgs = get().organizations.map(org => {
        if (org.id === orgId) {
          const updatedProjects = (org.projects || []).map(proj => 
            proj.id === projectId 
              ? { ...proj, ...updates, updatedAt: new Date().toISOString() } 
              : proj
          );
          
          return {
            ...org,
            projects: updatedProjects,
            updatedAt: new Date().toISOString()
          };
        }
        return org;
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedOrg = updatedOrgs.find(org => org.id === orgId);
      const updatedProject = updatedOrg?.projects?.find(proj => proj.id === projectId);
      
      if (!updatedProject) {
        throw new Error("Project not found");
      }
      
      set({ 
        organizations: updatedOrgs,
        currentOrganization: updatedOrg || get().currentOrganization,
        currentProject: get().currentProject?.id === projectId 
          ? updatedProject 
          : get().currentProject,
        isLoading: false
      });
      
      return updatedProject;
    } catch (error) {
      set({ isLoading: false, error: "Failed to update project" });
      throw error;
    }
  },
  
  deleteProject: async (orgId, projectId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Find the organization and filter out the project
      const updatedOrgs = get().organizations.map(org => {
        if (org.id === orgId) {
          return {
            ...org,
            projects: (org.projects || []).filter(proj => proj.id !== projectId),
            updatedAt: new Date().toISOString()
          };
        }
        return org;
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedOrg = updatedOrgs.find(org => org.id === orgId);
      
      set({ 
        organizations: updatedOrgs,
        currentOrganization: updatedOrg || get().currentOrganization,
        currentProject: get().currentProject?.id === projectId 
          ? updatedOrg?.projects?.[0] || null 
          : get().currentProject,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false, error: "Failed to delete project" });
      throw error;
    }
  }
}));
