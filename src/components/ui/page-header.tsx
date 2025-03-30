
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  subheading?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ heading, subheading, children, className, ...props }: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8", className)} {...props}>
      <div>
        <h1 className="text-3xl font-bold mb-1">{heading}</h1>
        {subheading && <p className="text-muted-foreground">{subheading}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};

export { PageHeader };
