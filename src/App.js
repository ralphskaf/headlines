import React, { useEffect } from "react";
import News from "./components/News";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import "./css/bootstrap.min.css";
import "./css/aos.css";
import "./App.css";
import Aos from "aos";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="App">
      <Helmet>
        <title>News Website</title>
      </Helmet>
      <ToastContainer />
      <News />
    </div>
  );
}

export default App;
