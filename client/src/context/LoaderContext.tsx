// src/context/LoaderContext.tsx
import React, { createContext, useContext, useState } from "react";
import GlobalLoader from "../Components/Loader/Loader";

type LoaderContextType = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType>({
  loading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && <GlobalLoader />}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
