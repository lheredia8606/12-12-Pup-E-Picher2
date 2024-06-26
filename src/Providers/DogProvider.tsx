import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, dogCRUD } from "../types-helpers";
import toast from "react-hot-toast";
import { UseIsloadingGlobal } from "./LoadinProvider";
import { dogPictures } from "../dog-pictures";

type TDogContextProps = {
  allDogs: Partial<Dog>[];
  setAllDogs: (dogs: Partial<Dog>[]) => void;
  selectedImageInput: string;
  setSelectedImageInput: (image: string) => void;
  nameInput: string;
  setNameInput: (name: string) => void;
  descriptionInput: string;
  setDescriptionInput: (desc: string) => void;
  onHeartClick: (id: number, dog: Partial<Dog>) => void;
  onTrashIconClick: (id: number) => void;
  addPersistentDog: () => void;
};
const dogContext = createContext({} as TDogContextProps);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Partial<Dog>[]>([]);
  const [selectedImageInput, setSelectedImageInput] = useState(
    dogPictures.BlueHeeler
  );
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const { setIsLoading } = UseIsloadingGlobal();

  const modifyLocalDog = (id: number, propsToModify: Partial<Dog>) => {
    return allDogs.map((currentDog) => {
      if (currentDog.id === id) {
        return { ...currentDog, ...propsToModify };
      }
      return currentDog;
    });
  };

  const deleteLocalDog = (id: number) => {
    return allDogs.filter((currentDog) => {
      return currentDog.id !== id;
    });
  };

  const onHeartClick = (id: number, dog: Partial<Dog>) => {
    setAllDogs(modifyLocalDog(id, dog));
    dogCRUD.update(id, dog).catch(() => {
      toast.error("Error updating the dog");
      setAllDogs(allDogs);
    });
  };

  const onTrashIconClick = (id: number) => {
    setAllDogs(deleteLocalDog(id));
    dogCRUD.delete(id).catch(() => {
      toast.error("Error trying to delete the dog");
      setAllDogs(allDogs);
    });
  };

  const addPersistentDog = () => {
    setIsLoading(true);
    const dogToAdd = {
      description: descriptionInput,
      image: selectedImageInput,
      isFavorite: false,
      name: nameInput,
    };
    setAllDogs([...allDogs, dogToAdd]);
    dogCRUD
      .post(dogToAdd)
      .then(() => {
        dogCRUD
          .getAll()
          .then(setAllDogs)
          .catch(() => {
            toast.error("Error loading persistent dogs");
          });
        setDescriptionInput("");
        setSelectedImageInput(dogPictures.BlueHeeler);
        setNameInput("");
      })
      .catch(() => {
        toast.error("Error trying to add the dog");
        setAllDogs(allDogs);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dogCRUD
      .getAll()
      .then(setAllDogs)
      .catch(() => {
        toast.error("Error Loading persistent dogs");
      });
  }, []);
  return (
    <>
      <dogContext.Provider
        value={{
          allDogs,
          setAllDogs,
          selectedImageInput,
          setSelectedImageInput,
          nameInput,
          setNameInput,
          descriptionInput,
          setDescriptionInput,
          onHeartClick,
          onTrashIconClick,
          addPersistentDog,
        }}
      >
        {children}
      </dogContext.Provider>
    </>
  );
};

export const UseGlobalDog = () => useContext(dogContext);
