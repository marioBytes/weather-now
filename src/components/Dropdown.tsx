import { useState, useRef, useEffect } from "react";

import DropdownItem from "./DropdownItem";
import IconDropdown from "../assets/iconDropdown";

interface Option {
  field: string;
  value: string;
  disabled?: boolean;
}

interface DropdownProps {
  buttonText: string;
  options: Option[];
  onChange: (value: string) => void;
  value: string | string[];
  multi?: boolean;
  showCheckmark?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  options,
  value,
  onChange,
  multi = false,
  showCheckmark = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOnChange = (value: string, isDisabled = false) => {
    if (isDisabled) return;

  const handleOnChange = (value: string) => {
    onChange(value);

    if (!multi) setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left mr-2">
      <button
        className="bg-neutral-700 rounded-lg py-3 px-4 hover:cursor-pointer hover:bg-neutral-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {buttonText} <IconDropdown />
        </span>
      </button>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 w-56 bg-neutral-800 outline outline-neutral-600 rounded-md py-1.5 px-2 z-50 mt-2"
          ref={dropdownRef}
        >
          {options.map((option) => {
            const isSelected = option.value === value || value.includes(option.value);

            return (
              <DropdownItem
                key={option.field}
                field={option.field}
                value={option.value}
                disabled={option.disabled}
                isSelected={isSelected}
                showCheckmark={showCheckmark}
                onClick={() => handleOnChange(option.value, option.disabled)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
