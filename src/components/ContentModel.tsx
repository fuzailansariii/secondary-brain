"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

// Define prop types
interface ContentModelProps {
  inputFields: {
    name: string;
    placeholder: string;
    type: string;
  }[];
  selectTitle: string;
  selectOptions: string[];
}

export default function ContentModel({
  inputFields,
  selectTitle,
  selectOptions,
}: ContentModelProps) {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="pt-4 gap-4 flex flex-col">
      {inputFields.map((field) => (
        <Input
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
        />
      ))}

      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={selectTitle} />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="default">Submit</Button>
    </div>
  );
}
