import { z } from "zod";

export const MediaBusinessHoursSchema = z.object({
    startDay: z.string().min(1, "Start day is required"),
    endDay: z.string().min(1, "End day is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  });