import { workTicketSchema } from "@acme/api/src/schemas/workTickets";

import { EmployeeSelectField } from "~/features/employees/components/field/EmployeesSelectField";
import { Input } from "~/features/shared/components/Input";
import {
  type WorkTicketValidationSchema,
  type useWorkTicketFrom,
} from "~/pages/work-tickets/create";
import { type useWorkTicketById } from "../../hooks/useWorkTicketById";

export const placeholders = {
  id: "",
  title: 'example: "Fix toilet"',
  description: 'example: "Fix toilet in the bathroom"',
  status: 'example: "open"',
  createdAt: "example: 2021-01-01T00:00:00.000Z",
  updatedAt: "example: 2021-01-01T00:00:00.000Z",
  userId: "",
  // client: prismaToZodClient,
  clientId: "",
  // location: prismaToZodLocation,
  locationId: "",
  // workticket: prismaToZodWorkTicket,
  employeeId: "",
};

export const WorkTicketFields: React.FC<{
  register?: ReturnType<typeof useWorkTicketFrom>["register"];
  formState?: ReturnType<typeof useWorkTicketFrom>["formState"];
  workticket?: ReturnType<typeof useWorkTicketById>["data"] | null;
  readOnly?: boolean;
}> = ({ register, formState, workticket, readOnly }) => {
  return (
    <>
      <EmployeeSelectField
        employee={workticket?.employee}
        register={register}
        formState={formState}
      />
      {Object.keys(
        workTicketSchema.omit({
          clientId: true,
          userId: true,
          employeeId: true,
          locationId: true,
        }).shape,
      ).map((v) => {
        const key = v as keyof WorkTicketValidationSchema;

        if (readOnly || !register || !formState) {
          return (
            <div key={key} className={"w-full pb-2"}>
              <label htmlFor={key} className={"pb-1  font-bold"}>
                {key}
              </label>
              <p>{workticket?.[key].toString()}</p>
            </div>
          );
        }

        const { errors } = formState;
        return (
          <div key={key} className={"pb-4"}>
            <label htmlFor={key} className={"pb-1"}>
              {key}
            </label>
            <Input
              type="text"
              defaultValue={workticket?.[key].toString() ?? undefined}
              id={key}
              {...register(key)}
              placeholder={placeholders[key]}
            />
            {errors[key] && (
              <p className=" text-red-500">
                {errors[key]?.message?.toString()}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};
