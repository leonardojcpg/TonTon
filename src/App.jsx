import { ToastContainer } from "react-toastify";
import { BabyProvider } from "./Context/BabyContext/index.jsx";
import "./global.css";
import { RouteApp } from "./Routes/index.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BabyProvider>
        <RouteApp />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BabyProvider>
    </>
  );
}

export default App;
