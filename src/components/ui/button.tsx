import * as React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        return (
            <button
                className={clsx(
                    "rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-orange-500 text-white hover:bg-orange-600": variant === "default",
                        "border border-gray-300 hover:bg-gray-100": variant === "outline",
                        "bg-transparent hover:bg-gray-100": variant === "ghost",
                        "bg-red-500 text-white hover:bg-red-600": variant === "danger",
                    },
                    {
                        "px-3 py-1 text-sm": size === "sm",
                        "px-4 py-2 text-base": size === "md",
                        "px-6 py-3 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
                ref={ref}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
