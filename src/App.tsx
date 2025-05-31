// Default Import

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Utility

import ScrollToTop from "./utility/ScrollToTop";
import CustomCursor from "./utility/CustomCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";

// Default Pages

import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/Landing/page";
import TeamPage from "./pages/Team/page";
import ContactPage from "./pages/Contact/page";

import LoginPage from "./pages/Login/page";
import RegisterPage from "./pages/Register/page";

// Utility Pages

import NotFoundPage from "./pages/Utility/not-found";
import LegalPage from "./pages/Utility/legal";
import ComingSoonPage from "./pages/Utility/coming-soon";
import LoadingScreenPage from "./utility/LoadingScreen";

// Features Pages

import MarketplaceDetailPage from "./pages/Marketplace/[id]/page";
import MarketplacePage from "./pages/Marketplace/page";
import ForumPage from "./pages/Forum/page";
import ArticlePage from "./pages/Article/page";
import ArticleDetailPage from "./pages/Article/[id]/page";

import FeaturesPage from "./pages/Features/page";

import ChatbotPage from "./pages/Chatbot/page";
import DiseaseDetectionPage from "./pages/Desease-Detection/page";

// Dashboard

import WeatherPage from "./pages/Dashboard/Weather/page";
import AddLivestockPage from "./pages/Dashboard/Livestock/add/page";

import DashboardAnalyticsPage from "./pages/Dashboard/Analytics/page";
import DashboardFeedingPage from "./pages/Dashboard/Feeding/page";
import DashboardHealthPage from "./pages/Dashboard/Health/page";
import DashboardLivestockPage from "./pages/Dashboard/Livestock/page";
import DashboardLivestockDetailPage from "./pages/Dashboard/Livestock/[id]/page";
import DashboardPage from "./pages/Dashboard/page";

// Context / Providers

import { AuthProvider } from "./context/auth-context";

// Loading Screen Animation

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return <LoadingScreenPage />;
};

function App() {
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTopFunction />
        <ScrollToTop />
        <CustomCursor />

        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

        <AnimatePresence mode="wait">
          {!loading && (
            <Routes>
              {/* Default Pages */}

              {/* <Route path="*" element={<NotFoundPage />} /> */}

              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path="/legal" element={<LegalPage />} />
                <Route path="/coming-soon" element={<ComingSoonPage />} />

                <Route path="/article" element={<ArticlePage />} />
                <Route path="/article/:id" element={<ArticleDetailPage />} />

                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route
                  path="/marketplace/:id"
                  element={<MarketplaceDetailPage />}
                />

                <Route path="/forum" element={<ForumPage />} />

                <Route path="/features" element={<FeaturesPage />} />

                <Route path="/chatbot" element={<ChatbotPage />} />
                <Route
                  path="/disease-detection"
                  element={<DiseaseDetectionPage />}
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/dashboard/livestock"
                element={<DashboardLivestockPage />}
              />
              <Route
                path="/dashboard/livestock/add"
                element={<AddLivestockPage />}
              />
              <Route
                path="/dashboard/livestock/:id"
                element={<DashboardLivestockDetailPage />}
              />

              <Route
                path="/dashboard/health"
                element={<DashboardHealthPage />}
              />
              <Route
                path="/dashboard/feeding"
                element={<DashboardFeedingPage />}
              />
              <Route
                path="/dashboard/analytics"
                element={<DashboardAnalyticsPage />}
              />

              <Route path="/dashboard/weather" element={<WeatherPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </AnimatePresence>
        <Toaster position="top-center" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
