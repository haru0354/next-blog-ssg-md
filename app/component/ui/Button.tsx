type ButtonProps = {
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "gray";
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "blue",
  className,
  onClick,
}) => {
  const colors = {
    blue: "bg-sky-600 hover:bg-sky-200",
    green: "bg-green-600 hover:bg-green-200",
    red: "bg-red-600 hover:bg-red-200",
    gray: "bg-gray-600 hover:bg-gray-200",
  };

  return (
    <button
      className={`min-w-[180px] my-6 px-4 py-2 transition-colors duration-300 text-white hover:text-gray-700 border border-gray-400 rounded  
        ${colors[color]} 
        ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
