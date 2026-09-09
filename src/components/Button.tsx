interface ComponentNameProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

const ComponentName: React.FC<ComponentNameProps> = ({ children, disabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-4 px-6 rounded-xl text-lg bg-blue-500 hover:bg-blue-700 active:bg-blue-500 active:outline outline-offset-4 outline-blue-500 transition"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ComponentName;
