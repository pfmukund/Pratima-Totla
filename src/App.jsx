import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout.jsx';
import CustomCursor from './components/fx/CustomCursor.jsx';
import CursorDust from './components/fx/CursorDust.jsx';
import SmoothScroll from './components/fx/SmoothScroll.jsx';
import PageTransition from './components/PageTransition.jsx';
import AmbientAudio from './components/AmbientAudio.jsx';
import LoadingCurtain from './components/LoadingCurtain.jsx';
import ScrollProgress from './components/fx/ScrollProgress.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Home from './pages/Home.jsx'; // Eager-load home for instant first paint

// Code-split secondary routes — saves ~200KB from initial bundle (react-pageflip etc.)
const About = lazy(() => import('./pages/About.jsx'));
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="font-label text-[10px] tracking-[0.4em] uppercase text-gold-300/60 animate-pulse">
        Loading…
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <LanguageProvider>
      {/* Skip-to-content for screen reader / keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-[10001] px-4 py-2 rounded-full bg-gold-gradient text-ink font-label text-[11px] tracking-[0.22em] uppercase"
      >
        Skip to content
      </a>

      <LoadingCurtain />
      <ScrollProgress />
      <SmoothScroll />
      <CursorDust />
      <CustomCursor />
      <PageTransition />
      <AmbientAudio />
      <div className="grain-overlay" aria-hidden />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Suspense fallback={<RouteFallback />}><About /></Suspense>} />
            <Route path="/portfolio" element={<Suspense fallback={<RouteFallback />}><Portfolio /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<RouteFallback />}><Contact /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<RouteFallback />}><Privacy /></Suspense>} />
            <Route path="/terms" element={<Suspense fallback={<RouteFallback />}><Terms /></Suspense>} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </LanguageProvider>
  );
}
