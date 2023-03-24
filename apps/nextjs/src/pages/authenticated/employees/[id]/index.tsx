import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Pen, Trash } from "lucide-react";

import { api } from "~/utils/api";
import { EmployeeFields } from "~/features/employees/components/fields/EmployeeFeilds";
import { useEmplyeeById } from "~/features/employees/hooks/useEmployeeById";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";
import { formatEmployeeName } from "~/features/shared/utils/names";

const Screen: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const employeeByIdQuery = useEmplyeeById();

  const deletePostMutation = api.employee.delete.useMutation({
    onSuccess: () => router.push("/authenticated/employees"),
    onError: () => toast({ title: "Error deleting employee" }),
  });

  const Fields = () => {
    if (employeeByIdQuery.isLoading) {
      return <p>Loading...</p>;
    }

    if (employeeByIdQuery.isError) {
      return <p>An error occurred: {employeeByIdQuery.error.message}</p>;
    }

    return (
      <>
        <EmployeeFields employee={employeeByIdQuery.data} />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>
          wl management system: employee{" "}
          {formatEmployeeName(employeeByIdQuery.data)}
        </title>
      </Head>
      <PageLayout>
        <PageHeader
          title={formatEmployeeName(employeeByIdQuery.data)}
          includeGoBack={true}
          ActionComponents={
            <div className={"flex space-x-2"}>
              <NextLink
                href={`/authenticated/employees/${router.query.id}/edit`}
              >
                <Button variant={"ghost"}>
                  <Pen size={16} className="mr-2" />
                  Edit
                </Button>
              </NextLink>
              <Button
                variant={"destructive"}
                onClick={() => {
                  deletePostMutation.mutate(router.query.id as string);
                }}
              >
                <Trash size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          }
        />
        <Fields />
      </PageLayout>
    </>
  );
};

export default Screen;
