import React, { ReactNode, MouseEventHandler } from "react";

interface CircleButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  additionalClasses?: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  onClick,
  children,
  additionalClasses,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center cursor-pointer rounded-full border
         border-main-dark w-4 h-4 text-main-dark text-[8px] font-bold ${additionalClasses}`}
    >
      {children}
    </div>
  );
};

export default CircleButton;
