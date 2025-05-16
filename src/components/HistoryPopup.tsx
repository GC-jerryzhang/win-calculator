// HistoryPopup 组件用于在移动端显示历史记录的弹出层
interface HistoryPopupProps {
  show: boolean; 
  onClose: () => void; 
  history: string[]; 
}

export default function HistoryPopup({ show, onClose, history }: HistoryPopupProps) {
  return (
    <div className={`history-popup ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="history-popup-content" onClick={(e) => e.stopPropagation()}>
        <header className="popup-header">
          <h2>History</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </header>
        <div className="history-list">
          {history.length > 0 ? (
            history.map((item, index) => (
              <div key={index} className="history-item">{item}</div>
            ))
          ) : (
            <div className="history-empty">No history yet</div>
          )}
        </div>
      </div>
    </div>
  );
}