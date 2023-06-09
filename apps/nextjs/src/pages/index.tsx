import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut } from "next-auth/react";

import { api } from "~/utils/api";
import { Button } from "~/features/shared/components/Button";
import { PageLayout } from "~/features/shared/components/PageLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          wl-management-stack
        </h1>
        <AuthShowcase />
      </PageLayout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: session } = api.auth.getSession.useQuery();

  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: !!session?.user },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl">
          {session && <span>Logged in as {session?.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      )}

      <Button onClick={session ? () => void signOut() : () => void signIn()}>
        {session ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};
