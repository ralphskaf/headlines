import React, { useEffect } from "react";
import News from "./components/News";
import { ToastContainer } from "react-toastify"; //toastify is used to show notifications
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet"; //helmet is used to change the title of the page
import "./css/bootstrap.min.css";
import "./css/aos.css";
import "./css/main.css";
import Aos from "aos";

function App() {
  useEffect(() => {
    // this is to initialize AOS library for the animations
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
