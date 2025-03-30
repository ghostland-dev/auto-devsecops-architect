
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface DocCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  linkText?: string;
  tags?: string[];
  footer?: React.ReactNode;
}

const DocCard = ({ 
  title, 
  description, 
  icon, 
  link, 
  linkText = "Voir plus", 
  tags, 
  footer 
}: DocCardProps) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        {icon && (
          <div className="mb-2 text-indigo-600">{icon}</div>
        )}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Card content can be added here */}
      </CardContent>
      <CardFooter className="pt-0">
        {link ? (
          <Button variant="outline" asChild className="gap-2 w-full">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {linkText}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : footer}
      </CardFooter>
    </Card>
  );
};

export default DocCard;
