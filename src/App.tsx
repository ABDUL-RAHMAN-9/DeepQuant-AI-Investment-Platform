import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- PAGE IMPORTS ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FeatureDetailPage from "./pages/FeatureDetailPage"; 

// --- COMPONENT IMPORTS ---
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast Notifications */}
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        {/* 
           ScrollToTop must be inside BrowserRouter but outside Routes 
           to listen to location changes correctly.
        */}
        <ScrollToTop />
        
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Index />} />
          
          {/* Dynamic Feature Detail Page */}
          <Route path="/feature/:featureId" element={<FeatureDetailPage />} />
          
          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;