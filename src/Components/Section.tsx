import { ReactNode } from "react";
import { globalStates } from "../Providers/StateProvider";
import { Dog, TActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  
  const { activeTab, allDogs, setActiveTab } = globalStates();

  const getDogFavCount = (favorite: boolean) => {
    return allDogs.reduce((count: number, dog: Dog) => {
      return dog.isFavorite === favorite ? count + 1 : count;
    }, 0);
  };

  const changeActiveTab = (newActiveTab: TActiveTab) => {
    activeTab === newActiveTab
      ? setActiveTab("none")
      : setActiveTab(newActiveTab);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => {
              changeActiveTab("favorite");
            }}
          >
            favorited ( {getDogFavCount(true)} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unFavorite" ? "active" : ""}`}
            onClick={() => {
              changeActiveTab("unFavorite");
            }}
          >
            unfavorited ( {getDogFavCount(false)} )
          </div>
          <div
            className={`selector ${activeTab === "createDog" ? "active" : ""}`}
            onClick={() => {
              changeActiveTab("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
