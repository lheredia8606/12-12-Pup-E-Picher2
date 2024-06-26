import { z } from "zod";
import { ApiCRUD } from "./ApiCRUD";

export type Dog = z.infer<typeof dogSchema>;
export type TSelectedTab = "favorite" | "unfavorite" | "createDog" | "none";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

function isPartialEqualToDog(partial: Partial<Dog>, full: Dog): boolean {
  for (const key of Object.keys(partial)) {
    const typedKey = key as keyof Dog;
    if (partial[typedKey] !== full[typedKey]) {
      return false;
    }
  }
  return true;
}

export const getFilteredDogs = (dogs: Dog[], filter: Partial<Dog>): Dog[] => {
  return dogs.filter((dog) => {
    return isPartialEqualToDog(filter, dog);
  });
};

export const dogCRUD = new ApiCRUD<Dog>("http://localhost:3000/dogs");
