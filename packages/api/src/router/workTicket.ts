import { z } from "zod";

import { workTicketSchema } from "../schemas/workTickets";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workTicketRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    const test = ctx.prisma.workTicket.findMany({ orderBy: { id: "desc" } });

    return test;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workTicket.findFirst({
        where: { id: input.id },
        include: { employee: true },
      });
    }),
  create: publicProcedure
    .input(workTicketSchema.omit({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workTicket.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.workTicket.delete({ where: { id: input } });
  }),
  edit: publicProcedure.input(workTicketSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.workTicket.update({
      where: { id: input.id },
      data: input,
    });
  }),
});
