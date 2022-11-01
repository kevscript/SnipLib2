import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useCreateSnippet } from "@/hooks/useCreateSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import SnippetForm from "@/components/forms/SnippetForm";

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
      {/* <div className="flex items-center justify-between flex-1">
        <div className="flex text-xs font-bold gap-x-2">
          <span className="uppercase text-carbon-300">Create</span>
          <span>/</span>
          <span>New Snippet</span>
        </div>
        <div className="flex flex-nowrap gap-x-4">
          <Button
            label="Create"
            variety="primary"
            form="create-snippet"
            type="submit"
          />
          <Button
            label="Cancel"
            variety="secondary"
            onClick={() => router.back()}
          />
        </div>
      </div> */}

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
