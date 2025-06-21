import { z } from "zod";

export const  MediaHeroSchema = z.object({
    id: z.number(), // Optional for new entries, required for updates
    heroImage: z
      .instanceof(File)
      .refine((file) => file.size > 0, { message: "Image is required" })
      .refine(
        (file) => {
          const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
          ];
          return validTypes.includes(file.type);
        },
        { message: "Only image files (JPEG, PNG, GIF, WebP) are allowed" }
      )
      .optional(), // Make it optional for updates
    noOfProjects: z.number().min(0, "Must be at least 0"),
    noOfClients: z.number().min(0, "Must be at least 0"),
    satisfactionPercentage: z
      .number()
      .min(0, "Must be at least 0")
      .max(100, "Cannot exceed 100"),
  });