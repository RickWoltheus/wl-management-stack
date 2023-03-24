import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { workTicketSchema } from "@acme/api/src/schemas/workTickets";

import { api } from "~/utils/api";
import { Button } from "~/features/shared/components/Button";
import { PageHeader } from "~/features/shared/components/PageHeader";
import { PageLayout } from "~/features/shared/components/PageLayout";
import { useToast } from "~/features/shared/hooks/useToast";
import { WorkTicketFields } from "~/features/worktickets/components/fields/WorkTicketFields";

export type WorkTicketValidationSchema = z.infer<typeof workTicketSchema>;
export const useWorkTicketFrom = useForm<WorkTicketValidationSchema>;

const Screen: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState } = useWorkTicketFrom({
    resolver: zodResolver(workTicketSchema),
  });
  const createWorkTicketMutation = api.workTicket.create.useMutation({
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
        <title>wl management system: Create workticket</title>
      </Head>
      <PageLayout>
        <PageHeader title="Create workticket" />
        <form
          onSubmit={() =>
            void handleSubmit((e) => {
              return createWorkTicketMutation.mutate(e);
            })
          }
        >
          <WorkTicketFields register={register} formState={formState} />

          <Button variant="default" type="submit">
            Create workticket
          </Button>
        </form>
      </PageLayout>
    </>
  );
};

export default Screen;
