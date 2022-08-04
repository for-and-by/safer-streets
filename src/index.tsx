import { useState } from "react";
import MapLayer from "./features/map/layer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MapLayer />
    </>
  );
}

export default App;
