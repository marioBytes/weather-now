interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
}

const Input: React.FC<InputProps> = ({ onChange, placeholder, value, icon }) => {
  return (
    <label className="flex items-center gap-4 py-4 px-6 bg-neutral-800 rounded-xl text-lg w-full focus-within:outline-1 outline-white outline-offset-4">
      {icon && icon}
      <input
        className="placeholder:text-white w-full focus:outline-none"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
