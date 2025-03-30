
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAuthStore } from "@/stores/authStore";
import { useOrganizationStore } from "@/stores/organizationStore";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateOrganization from "./pages/CreateOrganization";
import Organization from "./pages/Organization";
import CreateProject from "./pages/CreateProject";
import Project from "./pages/Project";
import Configurator from "./pages/Configurator";
import Preview from "./pages/Preview";
import Documentation from "./pages/Documentation";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const { isAuthenticated } = useAuthStore();
  const { fetchOrganizations } = useOrganizationStore();

  useEffect(() => {
    // If the user is logged in, pre-fetch organizations
    if (isAuthenticated) {
      fetchOrganizations().catch(console.error);
    }
  }, [isAuthenticated, fetchOrganizations]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Protected routes - in a real app, these would have proper auth guards */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organizations/create" element={<CreateOrganization />} />
            <Route path="/organizations/:orgId" element={<Organization />} />
            <Route path="/organizations/:orgId/projects/create" element={<CreateProject />} />
            <Route path="/organizations/:orgId/projects/:projectId" element={<Project />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/preview" element={<Preview />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
