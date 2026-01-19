import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
