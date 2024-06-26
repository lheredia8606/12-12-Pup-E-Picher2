import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { UseGlobalActiveTab } from "./Providers/TabProvider";

export function App() {
  const { selectedTab } = UseGlobalActiveTab();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <>{selectedTab === "createDog" ? <CreateDogForm /> : <Dogs />}</>
      </Section>
    </div>
  );
}
