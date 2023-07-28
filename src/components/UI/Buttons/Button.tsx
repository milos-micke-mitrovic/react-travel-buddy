import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  additionalClasses,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-white ${
        disabled ? "bg-gray-300" : "bg-gray-700"
      } ${additionalClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
