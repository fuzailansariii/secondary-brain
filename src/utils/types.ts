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

const CreateContentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 character"),
  type: z.enum(["Tweet", "Youtube"]),
  link: z.string().url("Invalid link"),
  tags: z.array(z.string()).optional(),
});

export { RegisterSchema, LoginSchema, CreateContentSchema };
