import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useCreateSnippet } from "@/hooks/useCreateSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { langList } from "@/utils/langList";
import { useRouter } from "next/router";
import SnippetCreater, {
  CreateSnippetFormErrors,
  CreateSnippetFormState,
} from "@/components/SnippetCreater";

const initFormValues: CreateSnippetFormState = {
  title: "",
  description: "",
  listId: "",
  tag: "",
  language: "javascript",
  content: "",
};

const initFormErrors: CreateSnippetFormErrors = {
  title: [],
  listId: [],
  description: [],
  tag: [],
  tags: [],
  language: [],
  content: [],
};

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
      {lists && langList && (
        <SnippetCreater
          activeListId={activeListId}
          initFormValues={initFormValues}
          initFormErrors={initFormErrors}
          langList={langList}
          lists={lists}
          createSnippet={createSnippet}
        />
      )}
    </>
  );
};

CreateSnippetPage.authRequired = true;
CreateSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default CreateSnippetPage;
