import { BabyProvider } from "./Context/BabyContext";
import "./global.css";
import { RouteApp } from "./Routes/index.jsx";

function App() {
  return (
    <>
      <BabyProvider>
        <RouteApp />
      </BabyProvider>
    </>
  );
}

export default App;
