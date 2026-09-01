import { useState } from "react";
import IconDropdown from "../assets/iconDropdown";

interface DropdownProps {
  buttonText: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        className="bg-neutral-800 rounded-lg py-3 px-4 hover:cursor-pointer hover:bg-neutral-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {buttonText} <IconDropdown />
        </span>
      </button>
      {isOpen && <div className="bg-neutral-800 rounded-md py-1.5 px-2 fixed z-50 mt-2">{children}</div>}
    </>
  );
};

export default Dropdown;
