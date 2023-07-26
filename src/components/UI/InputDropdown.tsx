import React, { ReactNode, useEffect, useRef, useState } from "react";

const InputDropdown: React.FC<{
  liItems?: string[];
  onClick?: (item: string, index: number) => void;
  index?: number;
  children?: ReactNode;
}> = ({ liItems, onClick, index = -1, children }) => {
  const inputDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log(event.target);

      if (
        isDropdownVisible &&
        inputDropdownRef.current &&
        !inputDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [index, onClick]);

  return (
    isDropdownVisible && (
      <div className="absolute z-10 bg-white" ref={inputDropdownRef}>
        <div
          className="w-0 h-0 
      border-l-[5px] border-l-transparent
      border-b-[5px] border-b-main-light
      border-r-[5px] border-r-transparent ml-5"
        ></div>

        {children
          ? children
          : onClick &&
            liItems && (
              <ul className="border border-main-light rounded-lg p-2">
                {liItems.map((item) => (
                  <li
                    key={item}
                    className="p-1 cursor-pointer hover:bg-main-light rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click propagation
                      onClick(item, index);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
      </div>
    )
  );
};

export default InputDropdown;
