import CreateSnippetForm, {
  CreateSnippetFormErrors,
  CreateSnippetFormState,
} from "@/components/forms/CreateSnippetForm";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { langList } from "@/utils/langList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

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
  tags: [],
  language: [],
  content: [],
};

const CreateSnippetPage = () => {
  const router = useRouter();
  const { lists, activeListId, activateSnippet } = useData();

  const queryClient = useQueryClient();
  const { mutate: createSnippet } = useMutation(
    (newSnippet: Snippet) => {
      return fetch("/api/snippet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSnippet),
      });
    },
    {
      onMutate: async (newSnippet) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };
          // add new snippet
          newData.snippets.push(newSnippet);
          // add snippet id to list
          const newSnippetListIdIndex = newData.lists.findIndex(
            (l) => l._id.toString() === newSnippet.listId.toString()
          );
          if (newSnippetListIdIndex) {
            newData.lists[newSnippetListIdIndex].snippetIds.push(
              newSnippet._id
            );
          }

          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, newSnippet, ctx) => console.log("error", error),
      onSettled: (data, error, newSnippet, ctx) => {
        queryClient.invalidateQueries(["userData"]);

        if (!error) {
          console.log("no Error wit snippet creation");
          activateSnippet(newSnippet._id.toString());
          router.push({
            pathname: "/snippets/[snippetId]",
            query: { snippetId: newSnippet._id.toString() },
          });
        }
      },
    }
  );

  return (
    <div className="flex-1 p-16">
      {lists && langList && activeListId && (
        <CreateSnippetForm
          activeListId={activeListId}
          initFormValues={initFormValues}
          initFormErrors={initFormErrors}
          langList={langList}
          lists={lists}
          createSnippet={createSnippet}
        />
      )}
    </div>
  );
};

CreateSnippetPage.authRequired = true;
CreateSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default CreateSnippetPage;
