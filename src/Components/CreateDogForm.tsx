import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { apiCRUD } from "../types";
import { globalStates } from "../Providers/StateProvider";
import { reloadDogs } from "../helpers";

export const CreateDogForm = () =>
  // no props allowed

  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [dogName, setDogName] = useState("");
    const [dogDescription, setDogDescription] = useState("");
    const { setAllDogs } = globalStates();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      apiCRUD
        .post({
          description: dogDescription,
          image: selectedImage,
          isFavorite: false,
          name: dogName,
        })
        .then(() => {
          setSelectedImage(dogPictures.BlueHeeler);
          setDogName("");
          setDogDescription("");
          reloadDogs(setAllDogs);
        });
    };
    return (
      <form action="" id="create-dog-form" onSubmit={onSubmitHandler}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={dogName}
          onChange={(e) => {
            setDogName(e.target.value);
          }}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={dogDescription}
          onChange={(e) => {
            setDogDescription(e.target.value);
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
