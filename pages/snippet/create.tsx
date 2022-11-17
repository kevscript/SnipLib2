import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useCreateSnippet } from "@/hooks/useCreateSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import SnippetForm from "@/components/forms/SnippetForm";
import Head from "next/head";

const CreateSnippetPage = () => {
  const router = useRouter();
  const { activeListId, lists, activateSnippet } = useData();

  const onSnippetCreation = (newSnippet: Snippet, err: any) => {
    if (!err) {
      activateSnippet(newSnippet._id.toString());
      router.push({
        pathname: "/lists/[listId]/[snippetId]",
        query: {
          listId: newSnippet.listId.toString(),
          snippetId: newSnippet._id.toString(),
        },
      });
    }
  };

  const { mutate: createSnippet } = useCreateSnippet({
    onQuerySettled: onSnippetCreation,
  });

  return (
    <>
      <Head>
        <title>New Snippet - Sniplib</title>
        <meta name="description" content="Creating a new snippet." />
      </Head>

      <SnippetForm
        activeListId={activeListId}
        lists={lists || []}
        onSubmit={createSnippet}
        onCancel={() => router.back()}
      />
    </>
  );
};

CreateSnippetPage.authRequired = true;
CreateSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default CreateSnippetPage;
