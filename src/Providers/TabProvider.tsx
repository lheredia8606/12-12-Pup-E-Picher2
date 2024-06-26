import { createContext, ReactNode, useContext, useState } from "react";
import { TSelectedTab } from "../types-helpers";

type tabContextProps = {
  selectedTab: TSelectedTab;
  setSelectedTab: (selectedTab: TSelectedTab) => void;
  changeTab: (string: TSelectedTab) => void;
};

const tabContext = createContext({} as tabContextProps);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<TSelectedTab>("none");

  const changeTab = (tabActivated: TSelectedTab) => {
    tabActivated === selectedTab
      ? setSelectedTab("none")
      : setSelectedTab(tabActivated);
  };
  return (
    <tabContext.Provider value={{ selectedTab, setSelectedTab, changeTab }}>
      {children}
    </tabContext.Provider>
  );
};

export const UseGlobalActiveTab = () => useContext(tabContext);
