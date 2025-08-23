// src/components/ui/Card.tsx
import * as React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={clsx(
                    "rounded-lg  border-2 border-slate-100 bg-card text-card-foreground shadow-sm",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={clsx("flex flex-col space-y-1.5 p-6", className)}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <h3
                className={clsx(
                    "text-2xl font-semibold leading-none tracking-tight",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </h3>
        );
    }
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={clsx("p-6 pt-0", className)}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
