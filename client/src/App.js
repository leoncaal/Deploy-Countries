import styles from "./App.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  return (
    <div >
      <div className={styles.divNav}>{location.pathname === "/home" && <NavBar />}</div>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
