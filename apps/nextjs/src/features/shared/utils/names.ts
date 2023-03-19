import { type Employee } from "@acme/db";

export function formatEmployeeName(employee?: Partial<Employee> | null) {
  if (!employee) {
    return "";
  }
  const { firstname, insertion, lastname } = employee;

  if (insertion) {
    return `${firstname} ${insertion} ${lastname}`;
  }

  return `${firstname} ${lastname}`;
}
