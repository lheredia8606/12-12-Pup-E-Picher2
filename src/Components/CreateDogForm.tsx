import { dogPictures } from "../dog-pictures";
import { UseGlobalDog } from "../Providers/DogProvider";
import { UseIsloadingGlobal } from "../Providers/LoadinProvider";

export const CreateDogForm = () => {
  const {
    addPersistentDog,
    nameInput,
    setNameInput,
    descriptionInput,
    setDescriptionInput,
    setSelectedImageInput,
  } = UseGlobalDog();
  const { isLoading } = UseIsloadingGlobal();
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        addPersistentDog();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setSelectedImageInput(e.target.value);
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
      <input type="submit" value="submit" disabled={isLoading} />
    </form>
  );
};
