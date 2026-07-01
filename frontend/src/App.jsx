import Home from "./pages/HomePage.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
