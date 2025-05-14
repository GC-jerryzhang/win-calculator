import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  // ... 省略运算逻辑

  return (
    <div className="calculator">
      <header>
        <span>Standard</span>
        <div className="tabs">
          <span className="active">History</span>
          <span>Memory</span>
        </div>
      </header>
      <div className="display">{display}</div>
      <div className="buttons">
        <button>%</button>
        <button>CE</button>
        <button>C</button>
        <button>←</button>
        <button>⅟x</button>
        <button>x²</button> 
        <button>√x</button>
        <button>÷</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>×</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>+/-</button>
        <button>0</button>
        <button>.</button>
        <button className="equals">=</button>
      </div>
    </div>
  );
}
