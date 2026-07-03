import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}

export function GameButton({
  children,
  className = "",
  fullWidth = false,
  style,
  variant = "ghost",
  ...props
}: GameButtonProps) {
  const baseClassName = variant === "primary" ? "game-button game-button--primary" : "game-button game-button--ghost";
  const finalClassName = `${baseClassName} ${className}`.trim();
  const mergedStyle: CSSProperties = {
    width: fullWidth ? "100%" : undefined,
    ...style,
  };

  return (
    <button type="button" className={finalClassName} style={mergedStyle} {...props}>
      {children}
    </button>
  );
}
