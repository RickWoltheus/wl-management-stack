import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "~/utils/api";
import { Button } from "~/features/shared/components/Button";
import { Input } from "~/features/shared/components/Input";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";
import { useEmplyeeById } from ".";
import { employeeSchema, placeholders, type ValidationSchema } from "../create";

const Screen: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(employeeSchema),
  });
  const employeeByIdQuery = useEmplyeeById();
  const editEmployeeMutation = api.employee.edit.useMutation({
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
        <title>wl management system: Edit employee</title>
      </Head>
      <PageLayout>
        <PageHeader title="Edit employee" />
        <form
          onSubmit={handleSubmit((e) => {
            return editEmployeeMutation.mutate({
              id: router.query.id as string,
              ...e,
            });
          })}
        >
          {Object.keys(employeeSchema.shape).map((v) => {
            const key = v as keyof ValidationSchema;

            return (
              <div key={key} className={"pb-4"}>
                <label htmlFor={key} className={"pb-1"}>
                  {key}
                </label>
                <Input
                  type="text"
                  id={key}
                  defaultValue={employeeByIdQuery.data?.[key] ?? ""}
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

          <Button variant="default" type="submit">
            Edit employee
          </Button>
        </form>
      </PageLayout>
    </>
  );
};

export default Screen;
