import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout.jsx';
import DesktopFX from './components/fx/DesktopOnly.jsx';
import PageTransition from './components/PageTransition.jsx';
import AmbientAudio from './components/AmbientAudio.jsx';
import ScrollProgress from './components/fx/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
import { routeLoaders } from './routes.js';

const About = lazy(routeLoaders['/about']);
const Portfolio = lazy(routeLoaders['/portfolio']);
const Contact = lazy(routeLoaders['/contact']);
const Privacy = lazy(routeLoaders['/privacy']);
const Terms = lazy(routeLoaders['/terms']);

function RouteFallback() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="font-label text-[16px] tracking-[0.4em] uppercase text-gold-300/60 animate-pulse">
        Loading…
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-[10001] px-4 py-2 rounded-full bg-gold-gradient text-ink font-body text-[13px] tracking-[0.14em] uppercase font-bold"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <DesktopFX />
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
    </>
  );
}
