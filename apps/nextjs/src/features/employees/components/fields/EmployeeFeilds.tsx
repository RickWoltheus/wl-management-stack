import { employeeSchema } from "@acme/api/src/schemas/employee";
import { type Employee } from "@acme/db";

import { Input } from "~/features/shared/components/Input";
import {
  type EmployeeValidationSchema,
  type useEmployeeFrom,
} from "~/pages/employees/create";

export const placeholders = {
  id: "id",
  firstname: "John",
  insertion: "van",
  lastname: "Doe",
  email: "JohnVanDoe@wl-management.nl",
  role: "Plumber",
};

export const EmployeeFields: React.FC<{
  register?: ReturnType<typeof useEmployeeFrom>["register"];
  formState?: ReturnType<typeof useEmployeeFrom>["formState"];
  employee?: Employee | null;
  readOnly?: boolean;
}> = ({ register, formState, employee, readOnly }) => {
  return (
    <>
      {Object.keys(employeeSchema.shape).map((v) => {
        const key = v as keyof EmployeeValidationSchema;

        if (readOnly || !register || !formState) {
          return (
            <div key={key} className={"w-full pb-2"}>
              <label htmlFor={key} className={"pb-1  font-bold"}>
                {key}
              </label>
              <p>{employee?.[key]}</p>
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
              defaultValue={employee?.[key] ?? undefined}
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
