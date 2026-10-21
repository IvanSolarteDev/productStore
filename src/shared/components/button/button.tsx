type ButtonProps = {
  title?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export const Button = ({
  title = "Iniciar sesión",
  variant = "primary",
  onClick,
}: ButtonProps) => {
  const styles =
    variant === "primary"
      ? "text-white bg-primary hover:bg-blue-500"
      : "text-blue-600 bg-blue-100 hover:bg-blue-200";

  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className={`
                     border
                     hover:border-blue-900
                     w-full
                     py-2.5
                     px-4
                     rounded-lg
                     focus:ring-4
                     ${styles}
                    `}
      >
        {title}
      </button>
    </div>
  );
};
