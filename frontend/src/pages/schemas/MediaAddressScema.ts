import { z } from "zod";

export const MediaAddressSchema = z.object({
    address: z.string().min(1, "Address is required"),
  });