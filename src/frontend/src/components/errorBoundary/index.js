import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleError = (error) => {
    if(!(error.name == 'AxiosError' && error.response && error.response.status == 401)){    
      console.error("Error capturado por ErrorBoundary:", error);
      setHasError(true);
      navigate('/error');
    }
  };

  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      handleError(event.reason);
    };

    const handleErrorEvent = (event) => {
      handleError(event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleErrorEvent);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleErrorEvent);
    };
  }, []);

  return children;
};

export default ErrorBoundary;