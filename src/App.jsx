import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import mockdata from "../leetcode1.json";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {mockdata.slice().map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.problem_description}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
