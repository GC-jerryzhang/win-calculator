// 历史记录面板组件
interface HistoryPanelProps {
  history: string[]; // 需要显示的历史记录数组
}


const HistoryPanel = ({ history } : HistoryPanelProps) => {
  return (
    <div className="side-panel history-list">
      {history.length === 0 && <p>No history yet</p>}
      {history.map((item, index) => (
        <div key={index} className="history-item">{item}</div>
      ))}
    </div>
  );
};

export default HistoryPanel;