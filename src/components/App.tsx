import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import ActivityDisplay from "./ActivityDisplay";
import ContextProvider from "./ContextProvider";
import ChatGPTDisplay from "./ChatGPTDisplay";


const App = () => {
  return (
    <div className="App">
        <ContextProvider>
            <BrowserRouter>
                <NavBar></NavBar>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/Activity/:date"} element={<ActivityDisplay />} />
                    <Route path={"/Assistant/"} element={<ChatGPTDisplay />} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    </div>
  );
}

export default App;
