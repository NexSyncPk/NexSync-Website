import { z } from "zod";

export const testimonialSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .refine((val) => !/\d/.test(val), {
      message: "Name must not contain numbers.",
    }),
  feedback: z
    .string()
    .min(1, "Testimonial is required")
    .refine((val) => !/\d/.test(val), {
      message: "Testimonial must not contain numbers.",
    }),
  designation: z
    .string()
    .min(1, "Designation is required")
    .refine((val) => !/\d/.test(val), {
      message: "Designation must not contain numbers.",
    }),
  company: z
    .string()
    .min(1, "Company is required")
    .refine((val) => !/\d/.test(val), {
      message: "Company must not contain numbers.",
    }),
});
