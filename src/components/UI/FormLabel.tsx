const FormLabel: React.FC<{ htmlFor?: string; label: string }> = ({
  htmlFor,
  label,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
  );
};

export default FormLabel;
