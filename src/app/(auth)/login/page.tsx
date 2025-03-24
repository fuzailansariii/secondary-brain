"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/utils/types";
import { toast } from "sonner";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (response?.error) {
        const errorMessage = response.error || "An error occured";
        if (errorMessage.includes("Incorrect Email")) {
          toast.error("Incorrect Email");
        } else if (errorMessage.includes("Incorrect Password")) {
          toast.error("Incorrect Password");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.success("Login Successfull");
        reset();
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <fieldset disabled={isSubmitting} className="space-y-4">
              {/* Email */}
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </fieldset>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="w-full">
            If you are new?{" "}
            <Link href={"/register"} className="text-blue-600 underline">
              register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
