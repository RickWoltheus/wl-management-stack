import { useRouter } from "next/router";

import { api } from "~/utils/api";

export function useWorkTicketById() {
  const router = useRouter();

  const workticketByIdQuery = api.workTicket.byId.useQuery({
    id: router.query.id as string,
  });

  return workticketByIdQuery;
}
