import { date, z } from "zod";

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
    .input(
      z.object({
        firstname: z.string().min(1),
        insertion: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().email(),
        role: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.employee.delete({ where: { id: input } });
  }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstname: z.string().min(1),
        insertion: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().email(),
        role: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.update({
        where: { id: input.id },
        data: input,
      });
    }),
});
