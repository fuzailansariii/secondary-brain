"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface CustomDialogProps {
  trigger: ReactNode; // Button or any element to open the dialog
  title: string;
  description?: string;
  children?: ReactNode; // Additional content (like forms, inputs)
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomDialog({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
