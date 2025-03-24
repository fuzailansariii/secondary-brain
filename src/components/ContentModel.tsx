"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { z } from "zod";
import { CreateContentSchema } from "@/utils/types";
import axios from "axios";

type FormValue = z.infer<typeof CreateContentSchema>;

export default function ContentModel() {
  const selectOptions: ["Youtube", "Tweet"] = ["Youtube", "Tweet"];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>({
    resolver: zodResolver(CreateContentSchema),
    defaultValues: {
      title: "",
      link: "",
      type: undefined,
    },
  });

  // TODO: add toast message
  const onSubmit = async (data: FormValue) => {
    try {
      console.log("Form Data: ", data);
      const response = await axios.post("/api/create-content", data);
      console.log(response);
      reset();
    } catch (error) {
      console.error("API Error:", error);
      if (axios.isAxiosError(error)) {
        console.log(error.message || "Something went wrong");
      } else {
        console.log("Unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 gap-4 flex flex-col"
    >
      <Input {...register("title")} type="text" placeholder="Enter Title" />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <Input
        {...register("link")}
        type="url"
        placeholder="Enter YouTube or Twitter Link"
      />
      {errors.link && (
        <p className="text-red-500 text-sm">{errors.link.message}</p>
      )}

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.type && (
        <p className="text-red-500 text-sm">{errors.type.message}</p>
      )}

      <Button variant="default" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
