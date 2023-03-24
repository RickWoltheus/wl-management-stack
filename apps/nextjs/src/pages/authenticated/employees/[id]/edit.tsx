import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { employeeSchema } from "@acme/api/src/schemas/employee";

import { api } from "~/utils/api";
import { EmployeeFields } from "~/features/employees/components/fields/EmployeeFeilds";
import { useEmplyeeById } from "~/features/employees/hooks/useEmployeeById";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";
import { type EmployeeValidationSchema } from "../create";

const Screen: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState } =
    useForm<EmployeeValidationSchema>({
      resolver: zodResolver(employeeSchema),
    });
  const employeeByIdQuery = useEmplyeeById();
  const editEmployeeMutation = api.employee.edit.useMutation({
    onSettled: async () => {
      await router.push("/authenticated/employees");
    },

    onError: (error) => {
      toast({
        title: "An error accured",
        description: error.message,
      });
    },
  });

  return (
    <>
      <Head>
        <title>wl management system: Edit employee</title>
      </Head>
      <PageLayout>
        <PageHeader title="Edit employee" />
        <form
          onSubmit={() =>
            void handleSubmit((e) => {
              return editEmployeeMutation.mutate({
                ...e,
                id: router.query.id as string,
              });
            })
          }
        >
          <EmployeeFields
            register={register}
            formState={formState}
            employee={employeeByIdQuery.data}
          />

          <Button variant="default" type="submit">
            Edit employee
          </Button>
        </form>
      </PageLayout>
    </>
  );
};

export default Screen;
