import { z } from "zod";

export const JobApplicationSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),

  phoneNumber: z.string().regex(/^03\d{2}-\d{7}$/, {
    message: "Phone number must be in format 03xx-xxxxxxx",
  }),

  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters.",
    })
    .optional(),

  lastEducation: z.enum(["intermediate", "bachelors", "masters", "diploma"], {
    message: "Please select your last education level.",
  }),

  yearOfPassing: z
    .string()
    .regex(/^\d{4}$/, {
      message: "Year of passing must be a valid 4-digit year.",
    })
    .refine(
      (val) => {
        const year = Number(val);
        const currentYear = new Date().getFullYear();
        return year > 1980 && year < currentYear;
      },      {
        message: "Year of passing must be greater than 1980 and less than the current year.",
      }
    ),

  expectedSalary: z
    .string()
    .min(1, { message: "Expected salary is required." })
    .regex(/^[1-9]\d*$/, {
      message: "Expected salary must be a whole number without leading zeros or decimal points.",
    }),

  availability: z.enum(["remote", "hybrid", "onsite"], {
    message: "Please select your availability.",
  }),
  resume: z.instanceof(File, {
    message: "Please upload a valid resume file.",
  }),
  jobPostingsId: z.number().int().positive({
    message: "Job posting ID must be a positive integer.",
  })
});
