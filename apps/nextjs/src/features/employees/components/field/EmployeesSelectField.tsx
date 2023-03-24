import NextLink from "next/link";
import { Plus } from "lucide-react";

import { type Employee } from "@acme/db";

import { api } from "~/utils/api";
import { Button } from "~/features/shared/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/features/shared/components/Select";
import { formatEmployeeName } from "~/features/shared/utils/names";
import { type useWorkTicketFrom } from "~/pages/authenticated/work-tickets/create";

export const EmployeeSelectField: React.FC<{
  register?: ReturnType<typeof useWorkTicketFrom>["register"];
  formState?: ReturnType<typeof useWorkTicketFrom>["formState"];
  employee?: Employee | null;
  readOnly?: boolean;
}> = ({ register, formState, employee, readOnly }) => {
  const getAllEmployees = api.employee.all.useQuery();
  const key = "employeeId";

  if (readOnly || !register || !formState) {
    return (
      <div key={key} className={"w-full pb-2"}>
        <label htmlFor={key} className={"pb-1  font-bold"}>
          {key}
        </label>
        <p>{formatEmployeeName(employee)}</p>
      </div>
    );
  }

  const { errors } = formState;

  return (
    <div key={key} className={"pb-4"}>
      <label htmlFor={key} className={"pb-1"}>
        {key}
      </label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a employee" />
        </SelectTrigger>
        <SelectContent>
          {getAllEmployees.data?.map((listedEmployee) => (
            <SelectItem key={listedEmployee.id} value={listedEmployee.id}>
              {formatEmployeeName(listedEmployee)}
            </SelectItem>
          ))}
          <hr></hr>
          <div className="flex justify-center">
            <NextLink href="/authenticated/employees/create">
              <Button className=" mt-1" variant="link" size="sm">
                Create employee <Plus className="ml-1" size={16} />
              </Button>
            </NextLink>
          </div>
        </SelectContent>
      </Select>

      {errors[key] && (
        <p className=" text-red-500">{errors[key]?.message?.toString()}</p>
      )}
    </div>
  );
};
