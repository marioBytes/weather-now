import { useState, useRef, useEffect } from "react";

import DropdownItem from "./DropdownItem";
import IconDropdown from "../assets/iconDropdown";
import useClickOutside from "../hooks/useClickOutside";
import DropdownItemContainer from "./DropdownItemContainer";

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
  disabled?: boolean;
  showCheckmark?: boolean;
  withIcon?: boolean;
  icon?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  options,
  value,
  onChange,
  multi = false,
  showCheckmark = false,
  disabled = false,
  withIcon = false,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleOnChange = (value: string, isDisabled = false) => {
    if (isDisabled) return;

    onChange(value);

    if (!multi) setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left mr-2">
      <button
        className="bg-neutral-700 rounded-lg py-3 px-4 hover:cursor-pointer hover:bg-neutral-600"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="flex items-center gap-2">
          {withIcon && icon} {buttonText} <IconDropdown />
        </span>
      </button>
      {isOpen && (
        <DropdownItemContainer
          ref={dropdownRef}
          width="56"
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
        </DropdownItemContainer>
      )}
    </div>
  );
};

export default Dropdown;
