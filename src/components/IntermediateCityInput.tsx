const IntermediateCityInput: React.FC<{
  city: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}> = ({ city, index, onChange, onRemove }) => {
  return (
    <div className="flex items-center mt-1">
      <input
        type="text"
        value={city}
        onChange={(e) => onChange(index, e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full"
      />
      {index > 0 && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="ml-2 px-3 py-1 rounded-lg bg-red-500 text-white"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default IntermediateCityInput;
