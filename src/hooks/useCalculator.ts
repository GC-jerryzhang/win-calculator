// 实现计算器核心逻辑
import { useState } from 'react';

// 定义计算器的状态类型
interface CalculatorState {
  display: string; // 当前显示的值
  firstOperand: string | null; // 第一个操作数
  operator: string | null; // 当前操作符
  isNewNumber: boolean; // 是否正在输入新的数字（用于清空显示或在现有数字后追加）
}

// 定义计算器的操作
interface CalculatorActions {
  handleNumber: (num: string) => void; // 处理数字按钮点击
  handleOperator: (op: string) => void; // 处理操作符按钮点击 (+, -, ×, ÷)
  calculate: () => string | undefined; // 处理基础计算
  clearDisplay: () => void; // 清除当前行 (CE)
  clearAll: () => void; // 清除所有状态 (C)
  handleDecimal: () => void; // 处理小数点按钮点击
  handleSpecialOperation: (operation: string) => string | undefined; // 处理特殊运算
  handleBackspace: () => void; // 处理回退按钮点击 (←)
}

// 定义计算器的回调函数
interface CalculatorCallbacks {
    // 传递计算过程结果
    onCalculationComplete?: (calculationString: string) => void;
    //传递计算过程操作符
    onSpecialOperationComplete?: (calculationString: string) => void;
}

export function useCalculator(callbacks: CalculatorCallbacks = {}): CalculatorState & CalculatorActions {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    firstOperand: null,
    operator: null,
    isNewNumber: true,
  });

  const { display, firstOperand, operator, isNewNumber } = state;
  const { onCalculationComplete, onSpecialOperationComplete } = callbacks;

  // 处理数字输入
  const handleNumber = (num: string) => {
    setState(prevState => ({
      ...prevState,
      // 如果是新数字输入，直接设置；否则追加。
      display: prevState.isNewNumber ? num : (prevState.display === "0" ? num : prevState.display + num),
      isNewNumber: false,
    }));
  };

  // 处理操作符输入
  const handleOperator = (op: string) => {
    // 如果当前已有操作符且不是新数字状态，则先计算之前的结果
    if (operator && !isNewNumber) {
       calculate(); // 计算之前的操作
    }
    // 设置第一个操作数和当前操作符，并准备输入新数字
    setState(prevState => ({
        ...prevState,
        firstOperand: prevState.display,
        operator: op,
        isNewNumber: true,
        display: "0", // 重置显示为 "0"
    }));
  };

  // 处理小数点输入
  const handleDecimal = () => {
    setState(prevState => {
        // 如果当前显示值已包含小数点，则不进行任何操作
        if (prevState.display.includes('.')) return prevState;

        if (prevState.isNewNumber) {
            // 如果是新数字状态，输入小数点显示 "0."
            return {
                ...prevState,
                display: "0.",
                isNewNumber: false, 
            };
        } else {
            // 否则，在现有数字后追加小数点
            return {
                ...prevState,
                display: prevState.display + ".",
                isNewNumber: false, 
            };
        }
    });
  };

  // 执行计算并更新状态
  const calculate = (): string | undefined => {
    // 如果没有操作符、第一个操作数，或者处于新数字输入状态（表示没有第二个操作数），则不计算
    if (!operator || firstOperand === null || isNewNumber) return undefined;

    const a = parseFloat(firstOperand);
    const b = parseFloat(display);
    let result: number;

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
        if (b === 0) {
            // 处理除以零的情况，显示错误
            setState({ display: "Cannot divide by zero", firstOperand: null, operator: null, isNewNumber: true });
            return undefined; // 计算失败，返回 undefined
        }
        result = a / b;
        break;
      default:
        return undefined; // 未知的操作符
    }

    const calculation = `${firstOperand} ${operator} ${display} = ${result}`;

    // 更新计算器状态
    setState({
        display: result.toString(),
        firstOperand: null, // 清除第一个操作数
        operator: null, // 清除操作符
        isNewNumber: true, // 准备输入新数字
    });

    // 通过回调通知外部计算完成，传递计算过程字符串
    onCalculationComplete?.(calculation);

    return calculation; // 返回计算过程字符串
  };

  // 清除当前显示 (CE)
  const clearDisplay = () => {
    setState(prevState => ({
      ...prevState,
      display: "0",
      newNumber: true, // 回到新数字输入状态
    }));
  };

  // 清除所有状态 (C)
  const clearAll = () => {
    setState({
      display: "0",
      firstOperand: null,
      operator: null,
      isNewNumber: true,
    });
  };

  // 处理特殊计算 
  const handleSpecialOperation = (operation: string): string | undefined => {
    const num = parseFloat(display);
    let result: number;
    let calculation: string; // 历史记录字符串

    switch (operation) {
      case "√x":
        if (num < 0) {
            // 处理负数开方，显示输入错误
            setState({ display: "Invalid input", firstOperand: null, operator: null, isNewNumber: true });
            return undefined;
        }
        result = Math.sqrt(num);
        calculation = `√（${display}） = ${result}`;
        break;
      case "x²":
        result = Math.pow(num, 2);
        calculation = `sqr（${display}） = ${result}`;
        break;
      case "⅟x":
        if (num === 0) {
            // 处理求倒数时除以零，显示错误输入
            setState({ display: "Invalid input", firstOperand: null, operator: null, isNewNumber: true });
            return undefined;
        }
        result = 1 / num;
        calculation = `1/（${display}） = ${result}`;
        break;
      case "%":
        result = num / 100;
        calculation = `${display} % = ${result}`; // 示例格式
        break;
      case "+/-":
        result = -num;
        calculation = `NEG（${display}） = ${result}`; // 示例格式
        break;
      default:
        return undefined; // 未知的特殊操作
    }

    // 更新计算器状态
    setState({
        ...state,
        display: result.toString(),
        firstOperand: null,
        operator: null,
        isNewNumber: true, // 准备输入新数字
    });

    // 通过回调通知外部特殊操作完成，传递计算过程字符串
    onSpecialOperationComplete?.(calculation);

    return calculation; // 返回计算过程字符串
  };

  // 处理回退按钮 (←)
  const handleBackspace = () => {
    setState(prevState => {
        const currentDisplay = prevState.display;

        if (currentDisplay === "0" || currentDisplay === "Error") {
            return prevState; // 在 "0" 或 "Error" 时不回退
        }

        if (currentDisplay.length === 1 || (currentDisplay.length === 2 && currentDisplay.startsWith("-"))) {
            return { ...prevState, display: "0", newNumber: true }; // 如果只剩一个数字（或负一个数字），回退到 "0"
        }

        // 否则，切掉最后一个字符
        return { ...prevState, display: currentDisplay.slice(0, -1), newNumber: false };
    });
  };



  // 返回状态和所有操作函数
  return {
    display,
    firstOperand,
    operator,
    isNewNumber,
    handleNumber,
    handleOperator,
    calculate,
    clearDisplay,
    clearAll,
    handleDecimal,
    handleSpecialOperation,
    handleBackspace,
  };
}