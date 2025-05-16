// TabSwitcher 组件,负责渲染历史记录和内存 Tab 按钮并处理切换逻辑
interface TabSwitcherProps {
  activeTab: string; 
  onSwitchTab: (tab: string) => void; 
  onToggleHistoryPopup: () => void; 
}


const TabSwitcher = ({ activeTab, onSwitchTab, onToggleHistoryPopup } : TabSwitcherProps) => {
  // 处理历史记录 Tab 点击事件
  const handleHistoryClick = () => {
    // 根据屏幕宽度判断是切换 Tab 还是显示弹出层
    if (window.innerWidth <= 768) { 
      onToggleHistoryPopup(); 
    } else {
      onSwitchTab("history"); 
    }
  };

  return (
    <div className="tabs">
      {/* 历史记录 Tab 按钮 */}
      <span
        className={activeTab === "history" ? "active" : ""} 
        onClick={handleHistoryClick} 
      >
        History
      </span>
      {/* 内存 Tab 按钮 */}
      <span
        className={activeTab === "memory" ? "active" : ""} 
        onClick={() => onSwitchTab("memory")} 
      >
        Memory
      </span>
    </div>
  );
};

export default TabSwitcher;