import { useState } from 'react'; 
import Display from './components/Display';
import TabSwitcher from './components/TabSwitcher';
import HistoryPanel from './components/HistoryPanel';
import CalculatorButtons from './components/CalculatorButtons'; 
import HistoryPopup from './components/HistoryPopup';

// 引入自定义 Hook
import { useCalculator } from './hooks/useCalculator';
import { useHistory } from './hooks/useHistory';

// 引入样式
import "./App.css";


export default function App() {
  // 全局 UI 状态
  const [activeTab, setActiveTab] = useState("history");
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);

  // 自定义 Hook
  const historyHook = useHistory();
  const calculatorHook = useCalculator({
      onCalculationComplete: historyHook.addHistoryItem,
      onSpecialOperationComplete: historyHook.addHistoryItem,
  });

  // UI 控制函数
  const toggleHistoryPopup = () => setShowHistoryPopup(!showHistoryPopup);
  const switchTab = (tab: string) => setActiveTab(tab);


  return (
    <>
      <div className="calculator">
        <header>
          <span>Standard</span>
          <TabSwitcher
            activeTab={activeTab}
            onSwitchTab={(tab) => {
            if (window.innerWidth <= 768 && tab === "history") {
              // 在移动端点击 history 时，直接触发弹窗
              toggleHistoryPopup();
            } else {
              switchTab(tab);
            }
          }}
            onToggleHistoryPopup={toggleHistoryPopup}
          />
        </header>

        <Display value={calculatorHook.display} />

        <div className="side-panel">
          {activeTab === "history" && window.innerWidth > 768 ? (
          <HistoryPanel history={historyHook.history} />
        ) : null}
        </div>

        {/* 将计算器操作函数传递给 CalculatorButtons 组件 */}
        <CalculatorButtons
          onNumberClick={calculatorHook.handleNumber}
          onOperatorClick={calculatorHook.handleOperator}
          onCalculateClick={calculatorHook.calculate}
          onClearDisplayClick={calculatorHook.clearDisplay}
          onClearAllClick={calculatorHook.clearAll}
          onDecimalClick={calculatorHook.handleDecimal}
          onSpecialOperationClick={calculatorHook.handleSpecialOperation}
          onBackspaceClick={calculatorHook.handleBackspace}
        />
      </div>

      <HistoryPopup
        show={showHistoryPopup}
        onClose={() => {
          toggleHistoryPopup();
          if (window.innerWidth > 768) {
            switchTab("memory");
          }
        }}
        history={historyHook.history}
      />
    </>
  );
}