interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

const Input: React.FC<InputProps> = ({ onChange, placeholder, value }) => {
  return (
    <input
      className="bg-neutral-800 py-4 px-6 rounded-xl text-lg active:outline-1 outline-white outline-offset-4 w-full"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
