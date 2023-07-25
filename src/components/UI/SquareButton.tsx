import React, { ReactNode, MouseEventHandler } from "react";

interface SquareButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const SquareButton: React.FC<SquareButtonProps> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center cursor-pointer p-2 bg-main-light hover:bg-main-dark rounded-lg w-8 h-8 text-white font-bold"
    >
      {children}
    </div>
  );
};

export default SquareButton;
