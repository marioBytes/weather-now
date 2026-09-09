interface DropdownItemContainerProps {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
  width?: "full" | "56";
}

const DropdownItemContainer: React.FC<DropdownItemContainerProps> = ({ children, ref, width = "56" }) => {
  return (
    <div
      ref={ref}
      className={`
        origin-top-right absolute right-0 w-${width}
        bg-neutral-800 outline outline-neutral-600
        rounded-md py-1.5 px-2 z-50 mt-2`}
    >
      {children}
    </div>
  );
};

export default DropdownItemContainer;
