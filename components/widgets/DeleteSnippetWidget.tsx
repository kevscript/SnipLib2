import { useDeleteSnippet } from "@/hooks/useDeleteSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import CrossIcon from "../icons/Cross";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import IconButton from "../shared/IconButton";
import Loader from "../shared/Loader";

type DeleteSnippetWidgetProps = {
  snippet: Snippet;
};

const DeleteSnippetWidget = ({ snippet }: DeleteSnippetWidgetProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onSnippetDeletion = (snippetToDelete: Snippet, err: any) => {
    setIsOpen(false);
    if (!err) {
      router.replace(`/lists/${snippetToDelete.listId.toString()}`);
    }
  };

  const { mutate: deleteSnippet, isLoading } = useDeleteSnippet({
    onQuerySettled: onSnippetDeletion,
  });

  return (
    <>
      <IconButton
        icon={
          <CrossIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105" />
        }
        onClick={() => setIsOpen(true)}
        className="hover:bg-red-500"
        tooltipId="delete-snippet"
        tooltipText="Delete snippet"
        data-cy="delete-snippet"
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-full" data-cy="delete-snippet-modal">
          <div className="w-full p-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold">Deleting Snippet</h3>
              <div
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-1 cursor-pointer group"
              >
                <CrossIcon className="w-5 h-5 stroke-gray-200 group-hover:stroke-white" />
              </div>
            </div>
            <div className="mt-8">
              <p>
                Are you sure you want to delete snippet &apos;
                <span className="font-bold text-red-600">{snippet.title}</span>
                &apos; ?
              </p>
              <p>
                This action is <span className="font-bold">irreversible</span>.
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full p-8 pt-4 bg-carbon-600 gap-x-4">
            <div>
              {isLoading && (
                <Loader
                  color="#fff"
                  height={6}
                  margin={-9}
                  width={3}
                  speedMultiplier={2}
                  className="translate-x-2.5 translate-y-5"
                />
              )}
            </div>
            <div className="flex gap-x-4">
              <Button
                label="Delete"
                onClick={() => deleteSnippet(snippet)}
                variety="primary"
                className="bg-red-600 hover:bg-red-700"
              />
              <Button
                label="Cancel"
                onClick={() => setIsOpen(false)}
                variety="secondary"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteSnippetWidget;
