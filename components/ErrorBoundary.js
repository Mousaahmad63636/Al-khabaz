import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log Firebase-related errors but don't crash the app
    if (error.message && error.message.includes('onAuthStateChanged')) {
      console.warn('Firebase auth error caught by ErrorBoundary:', error.message);
      console.warn('This is likely due to missing Firebase configuration.');
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a Firebase auth error
      if (this.state.error?.message?.includes('onAuthStateChanged')) {
        // For Firebase auth errors, just show a simple message and continue
        return (
          <div className="min-h-screen flex items-center justify-center bg-menu-gray-50">
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500 mx-auto mb-4"></div>
              <p className="text-menu-gray-600">Loading application...</p>
              <p className="text-sm text-menu-gray-400 mt-2">
                Firebase configuration is being initialized
              </p>
            </div>
          </div>
        );
      }

      // For other errors, show a generic error page
      return (
        <div className="min-h-screen flex items-center justify-center bg-menu-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-menu-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-menu-gray-600 mb-4">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-menu-accent-500 hover:bg-menu-accent-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
