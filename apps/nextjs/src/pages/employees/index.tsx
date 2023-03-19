import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

import { api } from "~/utils/api";
import { EmployeeCard } from "~/features/employees/components/cards/EmployeeCard";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";

const Screen: NextPage = () => {
  const workTicketsQuery = api.employee.all.useQuery();

  return (
    <>
      <Head>
        <title>wl management system: employees</title>
      </Head>
      <PageLayout>
        <PageHeader
          title="Employees"
          ActionComponents={
            <NextLink href={"employees/create"}>
              <Button variant="outline">Create employee</Button>
            </NextLink>
          }
        />

        {workTicketsQuery.data ? (
          <div className="w-full ">
            {workTicketsQuery.data?.length === 0 ? (
              <span>There are no posts!</span>
            ) : (
              <div className="flex h-[40vh] justify-center overflow-y-scroll text-2xl">
                <div className="flex w-full flex-col gap-4">
                  {workTicketsQuery.data?.map((p) => {
                    return <EmployeeCard key={p.id} {...p} />;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </PageLayout>
    </>
  );
};

export default Screen;
