"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 character"),
});
export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    // console.log("FormData: ", data);
    try {
      const response = await signIn("credentail", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      //   console.log("Response data: ",response)
      if (response?.ok) {
        console.log("Login successfull");
      } else {
        console.log("Login failed");
      }
      router.push("/");
      reset();
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
