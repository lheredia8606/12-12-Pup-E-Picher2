import { ReactNode } from "react";
import { UseGlobalDog } from "../Providers/DogProvider";
import { getFilteredDogs } from "../types-helpers";
import { UseGlobalActiveTab } from "../Providers/TabProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs } = UseGlobalDog();
  const { selectedTab, changeTab } = UseGlobalActiveTab();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${selectedTab === "favorite" ? "active" : ""}`}
            onClick={() => {
              changeTab("favorite");
            }}
          >
            favorited ( {getFilteredDogs(allDogs, { isFavorite: true }).length}{" "}
            )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              selectedTab === "unfavorite" ? "active" : ""
            }`}
            onClick={() => {
              changeTab("unfavorite");
            }}
          >
            unfavorited ({" "}
            {getFilteredDogs(allDogs, { isFavorite: false }).length} )
          </div>
          <div
            className={`selector ${
              selectedTab === "createDog" ? "active" : ""
            }`}
            onClick={() => {
              changeTab("createDog");
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
