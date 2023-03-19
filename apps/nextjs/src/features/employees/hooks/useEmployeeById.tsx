import { useRouter } from "next/router";

import { api } from "~/utils/api";

export function useEmplyeeById() {
  const router = useRouter();

  const employeeByIdQuery = api.employee.byId.useQuery({
    id: router.query.id as string,
  });

  return employeeByIdQuery;
}
