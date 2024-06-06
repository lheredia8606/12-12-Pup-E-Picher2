import { apiCRUD, Dog } from "./types";

export const reloadDogs = (setAllDogs: (dogs: Dog[]) => void) => {
  apiCRUD.getAll().then(setAllDogs);
};

export const modifyDog = (
  allDogs: Dog[],
  id: number,
  dogToUpdate: Partial<Dog>
): Dog[] => {
  return allDogs.map((dog) => {
    if (dog.id === id) {
      return Object.assign(dog, dogToUpdate);
    }
    return dog;
  });
};
