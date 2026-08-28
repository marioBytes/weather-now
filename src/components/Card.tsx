interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`bg-neutral-800 p-5 rounded-xl${className && " " + className}`}>{children}</div>;
};

export default Card;
