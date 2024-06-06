import { CreateDogForm } from "./Components/CreateDogForm";
import { DogCard } from "./Components/DogCard";
import { Section } from "./Components/Section";
import { modifyDog, reloadDogs } from "./helpers";
import { globalStates } from "./Providers/StateProvider";
import { apiCRUD } from "./types";
export function App() {
  const { allDogs, setAllDogs, activeTab, isLoading, updateDog } =
    globalStates();

  const getFilteredDogs = () => {
    if (activeTab === "favorite")
      return allDogs.filter((dog) => {
        return dog.isFavorite;
      });
    else if (activeTab === "unFavorite")
      return allDogs.filter((dog) => {
        return !dog.isFavorite;
      });
    else return allDogs;
  };

  //if i implements this here or in the helpers file a have to pass a lot of attributes
  const onEmptyHeartClick = () => {};
  const onHeartClick = () => {};
  const onTrashIconClick = () => {};

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <>
          {activeTab !== "createDog" &&
            getFilteredDogs().map((dog) => {
              return (
                <DogCard
                  dog={dog}
                  isLoading={isLoading}
                  onEmptyHeartClick={() => {
                    updateDog(dog.id, {});
                  }}
                  onHeartClick={() => {
                    setAllDogs(
                      modifyDog(allDogs, dog.id, { isFavorite: false })
                    );

                    apiCRUD.update(dog.id, { isFavorite: false }).catch(() => {
                      console.log("Error in unfavorite");
                      setAllDogs(allDogs);
                      console.log(allDogs);
                    });
                  }}
                  onTrashIconClick={() => {
                    apiCRUD.delete(dog.id).then(() => {
                      reloadDogs(setAllDogs);
                    });
                  }}
                  key={dog.id}
                ></DogCard>
              );
            })}

          {activeTab === "createDog" && <CreateDogForm></CreateDogForm>}
        </>
      </Section>
    </div>
  );
}
