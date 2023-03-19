import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import { EmployeeFields } from "~/features/employees/components/fields/EmployeeFeilds";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";

export const employeeSchema = z.object({
  firstname: z.string().min(1),
  insertion: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
});

export type EmployeeValidationSchema = z.infer<typeof employeeSchema>;
export const useEmployeeFrom = useForm<EmployeeValidationSchema>;

const Screen: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState } = useEmployeeFrom({
    resolver: zodResolver(employeeSchema),
  });
  const createEmployeeMutation = api.employee.create.useMutation({
    onSettled: async () => {
      await router.push("/employees");
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
        <title>wl management system: Create employee</title>
      </Head>
      <PageLayout>
        <PageHeader title="Create employee" />
        <form
          onSubmit={handleSubmit((e) => {
            return createEmployeeMutation.mutate(e);
          })}
        >
          <EmployeeFields register={register} formState={formState} />

          <Button variant="default" type="submit">
            Create employee
          </Button>
        </form>
      </PageLayout>
    </>
  );
};

export default Screen;
