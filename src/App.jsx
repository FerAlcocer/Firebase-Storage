import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lista from "./components/Lista";

function App() {
  return (
    <>
      <div className="container">
        <Form />
        <Lista />
      </div>
    </>
  );
}

export default App;
