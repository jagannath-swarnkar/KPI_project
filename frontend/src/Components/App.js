import React from "react";
import "./App.css";
import Header from './Header';
import { Redirect } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function App() {
  if (!reactLocalStorage.get("token")) {
    return <Redirect to="/login" />;
  }
  return <div className="App"><Header /></div>;
}

export default App;
