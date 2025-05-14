import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [activeTab, setActiveTab] = useState("history");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<string[]>([]);
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (operator && !newNumber) {
      calculate();
    }
    setFirstOperand(display);
    setOperator(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (!operator || !firstOperand || newNumber) return;
    
    let result: number;
    const a = parseFloat(firstOperand);
    const b = parseFloat(display);
    
    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "×":
        result = a * b;
        break;
      case "÷":
        result = b !== 0 ? a / b : NaN;
        break;
      default:
        return;
    }

    const calculation = `${firstOperand} ${operator} ${display} = ${result}`;
    setHistory([...history, calculation]);
    setDisplay(result.toString());
    setFirstOperand(null);
    setOperator(null);
    setNewNumber(true);
  };

  const clearDisplay = () => {
    setDisplay("0");
    setNewNumber(true);
  };

  const clearAll = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleSpecialOperation = (operation: string) => {
    const num = parseFloat(display);
    let result: number;

    switch (operation) {
      case "√x":
        result = Math.sqrt(num);
        break;
      case "x²":
        result = Math.pow(num, 2);
        break;
      case "⅟x":
        result = 1 / num;
        break;
      case "%":
        result = num / 100;
        break;
      case "+/-":
        result = -num;
        break;
      default:
        return;
    }

    const calculation = `${operation}(${display}) = ${result}`;
    setHistory([...history, calculation]);
    setDisplay(result.toString());
    setNewNumber(true);
  };

  return (
    <div className="calculator">
      <header>
        <span>Standard</span>
        <div className="tabs">
          <span 
            className={activeTab === "history" ? "active" : ""}
            onClick={() => switchTab("history")}
          >
            History
          </span>
          <span 
            className={activeTab === "memory" ? "active" : ""}
            onClick={() => switchTab("memory")}
          >
            Memory
          </span>
        </div>
      </header>
      <div className="display">{display}</div>
      <div className="side-panel">
        {activeTab === "history" ? (
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">{item}</div>
            ))}
          </div>
        ) : (
          <div className="memory-list">
            {memory.map((item, index) => (
              <div key={index} className="memory-item">{item}</div>
            ))}
          </div>
        )}
      </div>
      <div className="buttons">
        <button onClick={() => handleSpecialOperation("%")}>%</button>
        <button onClick={clearDisplay}>CE</button>
        <button onClick={clearAll}>C</button>
        <button onClick={() => setDisplay(display.slice(0, -1) || "0")}>←</button>
        <button onClick={() => handleSpecialOperation("⅟x")}>⅟x</button>
        <button onClick={() => handleSpecialOperation("x²")}>x²</button>
        <button onClick={() => handleSpecialOperation("√x")}>√x</button>
        <button onClick={() => handleOperator("÷")}>÷</button>
        <button onClick={() => handleNumber("7")}>7</button>
        <button onClick={() => handleNumber("8")}>8</button>
        <button onClick={() => handleNumber("9")}>9</button>
        <button onClick={() => handleOperator("×")}>×</button>
        <button onClick={() => handleNumber("4")}>4</button>
        <button onClick={() => handleNumber("5")}>5</button>
        <button onClick={() => handleNumber("6")}>6</button>
        <button onClick={() => handleOperator("-")}>-</button>
        <button onClick={() => handleNumber("1")}>1</button>
        <button onClick={() => handleNumber("2")}>2</button>
        <button onClick={() => handleNumber("3")}>3</button>
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={() => handleSpecialOperation("+/-")}>+/-</button>
        <button onClick={() => handleNumber("0")}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="equals" onClick={calculate}>=</button>
      </div>
    </div>
  );
}
