import { useState } from "react";
import "./App.css";
import { ArrayElement, AutoComplete } from "./components/AutoComplete";
import medications from "./assets/medications.json";

function App() {
  const [selectedMedicationName, setSelectedMedicationName] = useState<
    string | undefined
  >(undefined);
  const onChange = (el: ArrayElement<typeof medications>) => {
    setSelectedMedicationName(el.name);
  };

  return (
    <div className="App">
      <AutoComplete onChange={onChange} />
      {selectedMedicationName && <div>{selectedMedicationName}</div>}
    </div>
  );
}

export default App;
