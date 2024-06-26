import { createContext, ReactNode, useContext, useState } from "react";

type TLoadingContextProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const loadingContext = createContext({} as TLoadingContextProps);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {
        <loadingContext.Provider value={{ isLoading, setIsLoading }}>
          {children}
        </loadingContext.Provider>
      }
    </>
  );
};

export const UseIsloadingGlobal = () => useContext(loadingContext);
