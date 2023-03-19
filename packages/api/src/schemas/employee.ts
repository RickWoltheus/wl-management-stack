import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string(),
  firstname: z.string().min(1),
  insertion: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
});
