import { z } from "zod";

const baseTeamSchema = {
  name: z.string().min(1, "Name is required").refine((val) => !/\d/.test(val), {
    message: "Title must not contain numbers.",
  }),
  position: z.string().min(1, "Position is required").refine((val) => !/\d/.test(val), {
    message: "Position must not contain numbers.",
  }),
  email: z.string().email("Must be a valid email"),
  description: z.string().min(1, "Description is required").refine((val) => !/\d/.test(val), {
    message: "Description must not contain numbers.",
  }),
};

// Schema for adding new team member (picture required)
export const MediaTeamAddSchema = z.object({
  ...baseTeamSchema,
  picture: z
    .any()
    .refine((file) => {
      if (!file || file.length === 0) return false;
      return file[0]?.type?.startsWith("image/");
    }, "Please select a valid image file"),
});

// Schema for editing team member (picture optional)
export const MediaTeamEditSchema = z.object({
  ...baseTeamSchema,
  picture: z
    .any()
    .refine((file) => {
      // If no file is provided, it's valid (keep existing picture)
      if (!file || file.length === 0) return true;
      // If a file is provided, it must be a valid image
      return file[0]?.type?.startsWith("image/");
    }, "Please select a valid image file")
    .optional(),
});

// Keep the original schema for backward compatibility
export const MediaTeamSchema = MediaTeamAddSchema;
