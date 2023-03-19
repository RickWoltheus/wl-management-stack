import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const workTicketRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    const test = ctx.prisma.workTicket.findMany({ orderBy: { id: "desc" } });

    return test;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workTicket.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        status: z.string().min(1),
        userId: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workTicket.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.workTicket.delete({ where: { id: input } });
  }),
});
