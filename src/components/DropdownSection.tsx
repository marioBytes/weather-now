interface DropdownSectionProps {
  children: React.ReactNode;
  title: string;
}

const DropdownSection: React.FC<DropdownSectionProps> = ({ children, title }) => {
  return (
    <div>
      <div className="pt-2.5 pb-2 px-2">
        <p className="text-neutral-300">{title}</p>
      </div>
      <div className="flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
};

export default DropdownSection;
