// CalculatorButtons 组件负责根据配置数据渲染 Button 组件网格
import Button from './Button'; 

// 定义每个按钮的数据结构类型
interface ButtonConfig {
    text: string; // 按钮上显示的文本
    type: 'number' | 'operator' | 'special' | 'clear' | 'equals' | 'backspace' | 'decimal'; // 按钮的类型
    value?: string; // 对于数字或特殊操作，传递具体的值
    className?: string; // CSS 类名
}

interface CalculatorButtonProps {
    onNumberClick: (num: string) => void; // 处理数字按钮点击
    onOperatorClick: (op: string) => void; // 处理操作符按钮点击
    onCalculateClick: () => void; // 处理等于按钮点击
    onClearDisplayClick: () => void; // 处理 CE 按钮点击
    onClearAllClick: () => void; // 处理 C 按钮点击
    onDecimalClick: () => void; // 处理小数点按钮点击
    onSpecialOperationClick: (operation: string) => void; // 处理特殊操作按钮点击
    onBackspaceClick: () => void; // 处理回退按钮点击
}

// 定义按钮的布局和配置数据
const buttonConfigs: ButtonConfig[] = [
    { text: '%', type: 'special', value: '%' },
    { text: 'CE', type: 'clear', value: 'display' },
    { text: 'C', type: 'clear', value: 'all' },
    { text: '←', type: 'backspace' }, // 回退
    { text: '⅟x', type: 'special', value: '⅟x' },
    { text: 'x²', type: 'special', value: 'x²' },
    { text: '√x', type: 'special', value: '√x' },
    { text: '÷', type: 'operator', value: '÷' },

    { text: '7', type: 'number', value: '7' },
    { text: '8', type: 'number', value: '8' },
    { text: '9', type: 'number', value: '9' },
    { text: '×', type: 'operator', value: '×' },

    { text: '4', type: 'number', value: '4' },
    { text: '5', type: 'number', value: '5' },
    { text: '6', type: 'number', value: '6' },
    { text: '-', type: 'operator', value: '-' },

    { text: '1', type: 'number', value: '1' },
    { text: '2', type: 'number', value: '2' },
    { text: '3', type: 'number', value: '3' },
    { text: '+', type: 'operator', value: '+' },

    { text: '+/-', type: 'special', value: '+/-' },
    { text: '0', type: 'number', value: '0' },
    { text: '.', type: 'decimal' },
    { text: '=', type: 'equals', className: 'equals' }, 
];



const CalculatorButtons  = (props : CalculatorButtonProps) => {

  // 根据按钮配置的类型和值，确定调用Props 中的哪个处理函数
  const getButtonHandler = (config: ButtonConfig) => {
    switch (config.type) {
      case 'number':
        return () => props.onNumberClick(config.value!); // 数字按钮调用 onNumberClick，传递值
      case 'operator':
        return () => props.onOperatorClick(config.value!); // 操作符按钮调用 onOperatorClick，传递值
      case 'special':
        return () => props.onSpecialOperationClick(config.value!); // 特殊操作按钮调用 onSpecialOperationClick，传递值
      case 'clear':
        if (config.value === 'display') return props.onClearDisplayClick; // CE 调用 clearDisplay
        if (config.value === 'all') return props.onClearAllClick; // C 调用 clearAll
        return undefined; 
      case 'equals':
        return props.onCalculateClick; // 等于按钮调用 calculate
      case 'backspace':
        return props.onBackspaceClick; // 回退按钮调用 backspace
      case 'decimal':
          return props.onDecimalClick; // 小数点按钮调用 decimal
      default:
        return undefined; 
    }
  };

  return (
    <div className="buttons">
      {/* 遍历按钮配置数据，渲染 Button 组件 */}
      {buttonConfigs.map((config, index) => {
          // 获取对应的点击处理函数
          const handler = getButtonHandler(config);
          return (
              <Button
                  key={index} // 使用 index 作为 key，确保唯一性
                  label={config.text} // 传递按钮文本
                  onClick={handler!} // 传递点击处理函数 (确保 handler 不为 undefined)
                  className={config.className} // 传递可选的类名
              />
          );
      })}
    </div>
  );
};

export default CalculatorButtons;