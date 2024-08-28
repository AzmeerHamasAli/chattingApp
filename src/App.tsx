import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
// import { Switch } from "react-router-dom";
export interface IMessage {
  text: string;
  sender: "me" | "you";
  time: string;
  date: string;
}

export interface IChat {
  messages: IMessage[];
  number: string;
  id: string;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
