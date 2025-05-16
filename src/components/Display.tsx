//Display 组件只负责渲染计算器的显示区域
interface DisplayProps {
  value: string;    
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="display">{value}</div> // 显示当前值
  );
};

export default Display;