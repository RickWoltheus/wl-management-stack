import { authRouter } from "./router/auth";
import { employeeRouter } from "./router/employee";
import { postRouter } from "./router/post";
import { workTicketRouter } from "./router/workTicket";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  workTicket: workTicketRouter,
  employee: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
