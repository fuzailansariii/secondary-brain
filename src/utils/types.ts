import z from "zod";

const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 character"),
  firstname: z.string().min(3, "Firstname must be at least 3 character"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "password must be at least 6 character"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "password must be at least 6 character"),
});

export { RegisterSchema, LoginSchema };
