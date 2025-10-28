import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { useEffect } from 'react';
import { reportWebVitals } from '../utils/performance';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Disable service worker to prevent caching issues during development
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
          console.log('Service worker unregistered');
        });
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Head>
          <title>Brew Caffe - Digital Menu</title>
          <meta name="description" content="Digital menu for Brew Caffe restaurant" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="theme-color" content="#f97316" />
          
          {/* Disable all caching */}
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Brew Caffe" />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Export reportWebVitals for Next.js to use
export { reportWebVitals };
