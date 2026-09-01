import Checkmark from "../assets/iconCheckmark";

interface DropdownItemProps {
  field: string;
  value: string;
  isSelected?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ field, value, isSelected = false }) => {
  console.log(value);

  return (
    <div
      className={`rounded-xl py-2.5 px-2 flex items-center justify-between hover:bg-neutral-700 hover:cursor-pointer${isSelected ? " bg-neutral-700" : " bg-neutral-800"}`}
    >
      {field} {isSelected && <Checkmark />}
    </div>
  );
};

export default DropdownItem;
