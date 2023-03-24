import NextLink from "next/link";

import { type Employee } from "@acme/db";

import { formatEmployeeName } from "~/features/shared/utils/names";

export const EmployeeCard: React.FC<Employee> = ({
  firstname,
  insertion,
  lastname,
  role,
  email,
  id,
}) => {
  return (
    <li className=" list-none">
      <NextLink
        href={`/authenticated/employees/${id}`}
        className="block  rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {formatEmployeeName({ firstname, insertion, lastname })}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{email}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{role}</p>
      </NextLink>
    </li>
  );
};
