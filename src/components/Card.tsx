interface CardProps {
  children: React.ReactNode;
  className?: string;
  bg?: "700" | "800";
}

const bgClasses: Record<"700" | "800", string> = {
  "700": "bg-neutral-700",
  "800": "bg-neutral-800",
};

const Card: React.FC<CardProps> = ({ children, className, bg = "800" }) => {
  return (
    <div className={`${bgClasses[bg]} outline outline-neutral-600 p-5 rounded-xl${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
};

export default Card;
