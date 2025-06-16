import { z } from "zod";

export const JobCreationSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  position: z.enum(["full-time", "part-time", "intern", "contract"], {
    message: "Position must be selected.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  jobType: z.enum(["remote", "hybrid", "onsite"]),
  domain: z.string(),  salary: z
    .string()
    .min(1, { message: "Salary is required." })
    .regex(/^[1-9]\d*$/, {
      message: "Salary must be a whole number without leading zeros or decimal points.",
    }),
  requirements: z
    .array(z.string().min(1))
    .min(1, "At least one requirement is required"),
});