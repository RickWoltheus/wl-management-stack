import NextLink from "next/link";
import { useRouter } from "next/router";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

import { Button } from "./Button";

interface PageHeaderProps {
  title: string;
  ActionComponents?: React.ReactNode;
  includeGoBack?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  ActionComponents,
  includeGoBack,
}) => {
  const router = useRouter();
  const finalSlashIndex = router.asPath.lastIndexOf("/");
  const previousPath = router.asPath.slice(0, finalSlashIndex);

  return (
    <div className="mb-8">
      <div className="flex w-full items-center justify-between bg-white">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {title}
        </h1>
        <div>{ActionComponents}</div>
      </div>
      {includeGoBack && (
        <NextLink href={previousPath}>
          <Button variant={"link"} className={" -ml-4"}>
            <ArrowLeft className={" mr-4"}></ArrowLeft> Go back
          </Button>
        </NextLink>
      )}
    </div>
  );
};
