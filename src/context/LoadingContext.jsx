import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = useState({});

    const setLoading = (key, isLoading, type = 'enhanced', message = 'Loading...') => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: isLoading ? { type, message } : null
        }));
    };

    const isLoading = (key) => {
        return !!loadingStates[key];
    };

    const getLoadingState = (key) => {
        return loadingStates[key] || null;
    };

    const clearAllLoading = () => {
        setLoadingStates({});
    };

    const value = {
        setLoading,
        isLoading,
        getLoadingState,
        clearAllLoading,
        loadingStates
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export default LoadingContext;
