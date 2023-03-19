import { z } from "zod";

export const workTicketSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  clientId: z.string(),
  locationId: z.string(),
  employeeId: z.string(),
});
