import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TActiveTab, Dog, apiCRUD } from "../types";
import { modifyDog } from "../helpers";
import toast from "react-hot-toast";

type TStatesContext = {
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTab: TActiveTab;
  setActiveTab: (activeTab: TActiveTab) => void;
  updateDog: (id: number, dog: Partial<Dog>) => Promise<void>;
};

const StateContext = createContext<TStatesContext>({} as TStatesContext);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TActiveTab>("none");

  useEffect(() => {
    apiCRUD.getAll().then(setAllDogs);
  }, []);

  const updateDog = (id: number, dog: Partial<Dog>) => {
    const tempDogs = [...allDogs];
    console.log("tempDogs " + tempDogs);

    const newDog = modifyDog(allDogs, id, { isFavorite: true });
    setAllDogs(newDog);
    console.log("new dog");
    console.log(newDog);

    return apiCRUD
      .update(id, { isFavorite: true })
      .then(() => {
        toast.success("dog was updated");
        return;
      })
      .catch(() => {
        console.log("error in favoriting");
        console.log(tempDogs);
        setAllDogs(tempDogs);
      });
  };

  return (
    <>
      <StateContext.Provider
        value={{
          activeTab,
          allDogs,
          isLoading,
          setActiveTab,
          setAllDogs,
          setIsLoading,
          updateDog,
        }}
      >
        {children}
      </StateContext.Provider>
    </>
  );
};

export const globalStates = () => useContext(StateContext);
