
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  description?: string;
}

const NotesInput = ({
  value,
  onChange,
  label = "Notes",
  placeholder = "Ajoutez des notes ou des détails supplémentaires...",
  description = "Ces informations seront incluses dans la documentation générée."
}: NotesInputProps) => {
  const form = useForm({
    defaultValues: {
      notes: value
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="notes">{label}</Label>
      <Textarea 
        id="notes"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="min-h-[120px] resize-y"
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default NotesInput;
