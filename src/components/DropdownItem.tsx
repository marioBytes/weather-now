import Checkmark from "../assets/iconCheckmark";

interface DropdownItemProps {
  field: string;
  value?: string;
  onClick: () => void;
  isSelected?: boolean;
  showCheckmark?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  field,
  onClick,
  isSelected = false,
  showCheckmark = false,
  disabled = false,
  icon,
}) => {
  return (
    <div
      className={`
          rounded-xl px-2 my-1 flex items-center
          ${icon ? " gap-2" : " justify-between"}
          ${disabled ? " text-neutral-300 py-1" : " hover:bg-neutral-700 hover:cursor-pointer py-2.5 "}
          ${isSelected ? "bg-neutral-700" : "bg-neutral-800"}
      `}
      onClick={() => onClick()}
    >
      {icon && icon} {field} {isSelected && showCheckmark && <Checkmark />}
    </div>
  );
};

export default DropdownItem;
