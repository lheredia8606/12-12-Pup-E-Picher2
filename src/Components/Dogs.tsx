// Right now these dogs are constant, but in reality we should be getting these from our server

import { UseGlobalDog } from "../Providers/DogProvider";
import { UseGlobalActiveTab } from "../Providers/TabProvider";
import { Dog, getFilteredDogs } from "../types-helpers";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const { allDogs, onHeartClick, onTrashIconClick } = UseGlobalDog();
    const { selectedTab } = UseGlobalActiveTab();

    const getFilter = (): Partial<Dog> => {
      let filter: Partial<Dog> = {};
      if (selectedTab === "favorite") {
        filter = { isFavorite: true };
      } else if (selectedTab === "unfavorite") {
        filter = { isFavorite: false };
      }
      return filter;
    };

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {getFilteredDogs(allDogs, getFilter()).map((dog) => {
          return (
            <DogCard
              dog={dog}
              isLoading={false}
              onEmptyHeartClick={() => {
                onHeartClick(dog.id, { isFavorite: true });
              }}
              onHeartClick={() => {
                onHeartClick(dog.id, { isFavorite: false });
              }}
              onTrashIconClick={() => {
                onTrashIconClick(dog.id);
              }}
              key={dog.id}
            ></DogCard>
          );
        })}
      </>
    );
  };
