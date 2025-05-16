import { useState } from 'react';

// 历史记录状态管理
export function useHistory() {
  const [history, setHistory] = useState<string[]>([]); // 历史记录数组

  // 添加一条历史记录
  const addHistoryItem = (item: string) => {
    if (item && item.trim()) { // 防止添加空的记录
       setHistory(prevHistory => [...prevHistory, item]); 
    }
  };

  // 清空所有历史记录
  const clearHistory = () => {
    setHistory([]);
  };

  // 返回历史记录状态和操作函数
  return {
    history, 
    addHistoryItem, 
    clearHistory, 
  };
}