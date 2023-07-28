import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-sm w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md flex overflow-auto  max-h-screen md:max-h-[90%]">
        {children}
      </div>
    </div>
  );
};

export default Card;
