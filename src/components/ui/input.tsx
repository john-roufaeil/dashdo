import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={
                    `w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 focus:outline-none${className ? ` ${className}` : ""}`
                }
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
