import { getPublicSnippet } from "@/utils/getPublicSnippet";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const PublicSnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;

  const { data, isSuccess, isError, isLoading } = useQuery(
    ["publicSnippet"],
    () => getPublicSnippet({ snippetId: snippetId as string }),
    {
      enabled: snippetId ? true : false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <h1>{snippetId}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default PublicSnippetPage;
