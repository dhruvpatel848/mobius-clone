import { cn } from "@/lib/utils";

interface BorderedContainerProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function BorderedContainer({ children, className, delay = 0 }: BorderedContainerProps) {
    return (
        <div className={cn("border-b border-r border-border-color bg-background relative", className)}>
            {/* Optional: Add inner padding or specific structure if needed, 
           but currently keeping it raw for flexibility as a grid cell wrapper */}
            {children}
        </div>
    );
}
