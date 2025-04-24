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

// Loading Screen Animation

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <LoadingScreenPage/>
  )
};

function App() {

  const [loading, setLoading] = useState(true);

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <BrowserRouter>
      <ScrollToTopFunction />
      <ScrollToTop />
      <CustomCursor />

      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes>

            {/* Default Pages */}

            {/* <Route path="*" element={<NotFoundPage />} /> */}

            <Route path="/" element={<Layout />}>
              
                <Route index element={<LandingPage/>} />
                <Route path="/team" element={<TeamPage/>} />
                <Route path="/contact" element={<ContactPage/>} />

                <Route path="/legal" element={<LegalPage/>} />
                <Route path="/coming-soon" element={<ComingSoonPage/>} />
                
                <Route path="/article" element={<ArticlePage/>} />

                <Route path="/marketplace" element={<MarketplacePage/>} />
                <Route path="/marketplace/:id" element={<MarketplaceDetailPage/>} />

                <Route path="/forum" element={<ForumPage/>} />

                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />

            </Route>

            <Route path="*" element={<NotFoundPage/>} />

          </Routes>

        )}

      </AnimatePresence>
      <Toaster position="top-center" />
    </BrowserRouter>

  );
}

export default App;
