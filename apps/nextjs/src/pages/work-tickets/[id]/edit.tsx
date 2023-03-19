import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { workTicketSchema } from "@acme/api/src/schemas/workTickets";

import { api } from "~/utils/api";
import { useEmplyeeById } from "~/features/employees/hooks/useEmployeeById";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";
import { WorkTicketFields } from "~/features/worktickets/components/fields/WorkTicketFields";
import { useWorkTicketById } from "~/features/worktickets/hooks/useWorkTicketById";
import { type WorkTicketValidationSchema } from "../create";

const Screen: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState } =
    useForm<WorkTicketValidationSchema>({
      resolver: zodResolver(workTicketSchema),
    });
  const workticketByIdQuery = useWorkTicketById();
  const editWorkTicketMutation = api.workTicket.edit.useMutation({
    onSettled: async () => {
      await router.push("/worktickets");
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
        <title>wl management system: Edit workticket</title>
      </Head>
      <PageLayout>
        <PageHeader title="Edit workticket" />
        <form
          onSubmit={handleSubmit((e) => {
            return editWorkTicketMutation.mutate({
              ...e,
              id: router.query.id as string,
            });
          })}
        >
          <WorkTicketFields
            register={register}
            formState={formState}
            workticket={workticketByIdQuery.data}
          />

          <Button variant="default" type="submit">
            Edit workticket
          </Button>
        </form>
      </PageLayout>
    </>
  );
};

export default Screen;
