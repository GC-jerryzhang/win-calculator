// 按钮组件的定义
interface ButtonProps {
    label: string; // 按钮的标签
    onClick: () => void; // 点击的函数
    className?: string; // 自定义样式类名
}

const Button = ({ label, onClick, className } : ButtonProps) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;