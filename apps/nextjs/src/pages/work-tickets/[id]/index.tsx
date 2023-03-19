import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Pen, Trash } from "lucide-react";

import { api } from "~/utils/api";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";
import { WorkTicketFields } from "~/features/worktickets/components/fields/WorkTicketFields";
import { useWorkTicketById } from "~/features/worktickets/hooks/useWorkTicketById";

const Screen: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const workticketByIdQuery = useWorkTicketById();

  const deletePostMutation = api.workTicket.delete.useMutation({
    onSuccess: () => router.push("/worktickets"),
    onError: () => toast({ title: "Error deleting workticket" }),
  });

  const Fields = () => {
    if (workticketByIdQuery.isLoading) {
      return <p>Loading...</p>;
    }

    if (workticketByIdQuery.isError) {
      return <p>An error occurred: {workticketByIdQuery.error.message}</p>;
    }

    return (
      <>
        <WorkTicketFields workticket={workticketByIdQuery.data} />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>
          wl management system: workticket {workticketByIdQuery.data?.title}
        </title>
      </Head>
      <PageLayout>
        <PageHeader
          title={workticketByIdQuery.data?.title ?? ""}
          includeGoBack={true}
          ActionComponents={
            <div className={"flex space-x-2"}>
              <NextLink href={`/worktickets/${router.query.id}/edit`}>
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
