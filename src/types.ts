import { z } from "zod";
import { ApiCRUD } from "./ApiCRUD";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type TActiveTab = "unFavorite" | "favorite" | "createDog" | "none";

export const apiCRUD = new ApiCRUD<Dog>("http://localhost:3000/dogs");
