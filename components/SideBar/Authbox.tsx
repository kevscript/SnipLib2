import MoreIcon from "@/components/icons/More";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import GithubIcon from "@/components/icons/Github";

const Authbox = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <h3>Loading...</h3>;
  }

  if (data && data.user && status === "authenticated") {
    return (
      <div className="flex items-center justify-between w-full pt-12 mt-auto flex-nowrap">
        <div className="flex flex-nowrap">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-marine">
            <Image src={data.user.image!} layout="fill" alt="user avatar" />
          </div>
          <div className="flex flex-col justify-center ml-4">
            <span className="font-bold">{data.user.name}</span>
            <span className="text-xs">{data.user.email}</span>
          </div>
        </div>
        <div
          className="flex items-center justify-center w-6 h-full cursor-pointer group"
          onClick={() => signOut()}
        >
          <MoreIcon className="w-4 stroke-carbon-300 group-hover:stroke-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full pt-12 mt-auto flex-nowrap">
      <button
        onClick={() => signIn("github")}
        className="z-10 flex items-center h-10 px-8 rounded-sm bg-carbon-400 gap-x-2 drop-shadow "
      >
        <GithubIcon className="w-4 h-4" />
        Sign In with Github
      </button>
    </div>
  );
};

export default Authbox;
