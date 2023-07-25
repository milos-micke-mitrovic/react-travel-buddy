const InputDropdown: React.FC<{
  liItems: string[];
  onClick: (index: number, city: string) => void;
  index: number;
}> = ({ liItems, onClick, index }) => {
  return (
    <div className="absolute z-10 bg-white">
      <div
        className="w-0 h-0 
      border-l-[5px] border-l-transparent
      border-b-[5px] border-b-main-light
      border-r-[5px] border-r-transparent ml-5"
      ></div>

      <ul className="border border-main-light rounded-lg p-2">
        {liItems.map((city) => (
          <li
            key={city}
            className="p-1 cursor-pointer hover:bg-main-light rounded-lg"
            onClick={() => onClick(index, city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputDropdown;
