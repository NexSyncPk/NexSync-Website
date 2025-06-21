import { z } from "zod";

  export const MediaTeamSchema = z.object({
    name: z.string().min(1, "Name is required"),
    position: z.string().min(1, "Position is required"),
    email: z.string().email("Must be a valid email"),
    description: z.string().min(1, "Description is required"),
    picture: z
      .any()
      .refine((file) => {
        if (!file || file.length === 0) return false;
        return file[0]?.type?.startsWith("image/");
      }, "Please select a valid image file")
      .optional(),
  });
