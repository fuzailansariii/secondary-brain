"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterSchema = z.object({
  username: z.string().min(3, "username must be at least 3 character"),
  firstname: z.string().min(3, "firstname must be at least 3 character"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 character"),
});
export default function Register() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    // console.log("FormData: ", data);
    try {
      const response = await axios.post("/api/sign-up", data);
      //   console.log("Response data: ",response)
      if (response?.status) {
        if (response.status === 201) {
          console.log("Signup successfull");
        } else if (response.status === 409) {
          console.log("username already exist");
        }
      } else {
        console.log("Signup failed");
      }
      router.push("/");
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="username"
          placeholder="Username"
          {...register("username")}
        />
        <Input
          type="firstname"
          placeholder="Firstname"
          {...register("firstname")}
        />
        <Input
          type="lastname"
          placeholder="Lastname"
          {...register("lastname")}
        />
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button variant={"default"} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
