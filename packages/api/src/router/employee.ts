import { z } from "zod";

import { employeeSchema } from "../schemas/employee";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const employeeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.employee.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.employee.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .input(employeeSchema.omit({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.create({ data: input });
    }),
  delete: publicProcedure
    .input(z.string().min(1))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.delete({ where: { id: input } });
    }),
  edit: publicProcedure.input(employeeSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.employee.update({
      where: { id: input.id },
      data: input,
    });
  }),
});
