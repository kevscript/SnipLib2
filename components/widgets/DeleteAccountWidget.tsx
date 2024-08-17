import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import FormInput from "../forms/FormInput";
import CrossIcon from "../icons/Cross";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import Modal from "../shared/Modal";

type DeleteAccountWidgetProps = {
  userName: string;
  userId: string;
};

const DeleteAccountWidget = ({
  userName,
  userId,
}: DeleteAccountWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [confirmationInputValue, setConfirmationInputValue] = useState("");

  const { mutate: deleteUser, isLoading } = useMutation(
    ["deleteUser"],
    ({ userId }: { userId: string }) => {
      return fetch(`/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => signOut(),
    }
  );

  return (
    <>
      <div className="flex items-center p-8 border border-transparent rounded hover:border-red-900 bg-red-900/10 gap-x-8">
        <Button
          label="Delete Account"
          onClick={() => setIsOpen(true)}
          className="flex-shrink-0 bg-red-900 hover:bg-red-600"
        />
        <div>
          <p className="text-red-600">
            Deleting your account will permanently remove all your data from the
            application, including public snippets.
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-full" data-cy="delete-account-modal">
          <div className="w-full p-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold">Deleting Account</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-1 cursor-pointer group"
              >
                <CrossIcon className="w-5 h-5 stroke-gray-200 group-hover:stroke-white" />
              </button>
            </div>
            <div className="flex flex-col mt-8 gap-y-4">
              <p>
                Are you sure you want to delete your account? This action is{" "}
                <span className="font-bold">irreversible</span>.
              </p>
              <p>
                To proceed please confirm the action by entering your name :
              </p>
            </div>
            <FormInput
              autoFocus
              label=""
              name="confirmation"
              value={confirmationInputValue}
              handleValue={(e) => setConfirmationInputValue(e.target.value)}
              errors={null}
              placeholder={userName}
            />
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
                onClick={() => deleteUser({ userId: userId })}
                variety="primary"
                className="bg-red-600 hover:bg-red-700"
                disabled={userName === confirmationInputValue ? false : true}
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

export default DeleteAccountWidget;
