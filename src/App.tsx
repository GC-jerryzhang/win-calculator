import { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [activeTab, setActiveTab] = useState("history"); // 记录Tab的状态
  const [history, setHistory] = useState<string[]>([]); // 计算历史
  const [memory, setMemory] = useState<string[]>([]); // 计算器内存 
  const [firstOperand, setFirstOperand] = useState<string | null>(null); // 第一个操作数
  const [operator, setOperator] = useState<string | null>(null); // 存储当前操作符
  const [newNumber, setNewNumber] = useState(true); // 是否需要输入新数字

  // 历史记录和内存记录的切换
  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  // 处理数字输入
  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  // 处理操作符
  // 如果当前有操作符且不是新数字，则计算结果
  // 如果没有操作符，则设置第一个操作数和操作符
  const handleOperator = (op: string) => {
    if (operator && !newNumber) {
      calculate();
    }
    setFirstOperand(display);
    setOperator(op);
    setNewNumber(true);
  };

  // 计算结果并更新历史记录
  const calculate = () => {
    if (!operator || !firstOperand || newNumber) return; // 如果没有操作符或第一个操作数，或者是新数字，则不计算
    
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
        result = b !== 0 ? a / b : NaN; // 除数不能为0
        break;
      default:
        return;
    }

    const calculation = `${firstOperand} ${operator} ${display} = ${result}`;  // 记录计算过程
    setHistory([...history, calculation]);  // 更新历史记录
    setDisplay(result.toString());
    setFirstOperand(null);
    setOperator(null);
    setNewNumber(true);
  };

  //  实现CE按钮功能
  const clearDisplay = () => {
    setDisplay("0");
    setNewNumber(true);
  };

  // 实现C按钮功能
  const clearAll = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setNewNumber(true);
  };

  // 实现小数点按钮功能
  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // 实现特殊操作按钮功能，并更新历史记录
  // 处理平方根、平方、倒数、百分比和正负号
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
