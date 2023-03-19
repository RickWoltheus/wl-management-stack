import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import { Button } from "~/features/shared/components/Button";
import { Input } from "~/features/shared/components/Input";
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

export const placeholders = {
  firstname: "John",
  insertion: "van",
  lastname: "Doe",
  email: "JohnVanDoe@wl-management.nl",
  role: "Plumber",
};

export type ValidationSchema = z.infer<typeof employeeSchema>;

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
            Create employee
          </Button>
        </form>
      </PageLayout>
    </>
  );
};

export default Screen;
