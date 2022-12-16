import MoreIcon from "@/components/icons/More";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import GithubIcon from "@/components/icons/Github";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Link from "next/link";
import SettingsIcon from "../../icons/Settings";
import LogoutIcon from "../../icons/Logout";
import Loader from "@/components/shared/Loader";

const Authbox = () => {
  const { data, status } = useSession();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const clickContainerRef = useRef(null);

  useOutsideClick({
    action: () => setMenuIsOpen(false),
    ref: clickContainerRef,
  });

  if (status === "loading") {
    return <Loader />;
  }

  if (data && data.user && status === "authenticated") {
    return (
      <div
        className="flex items-center justify-between flex-shrink-0 w-full p-8 mt-auto cursor-pointer bg-carbon-600 flex-nowrap group hover:bg-carbon-700"
        onClick={() => setMenuIsOpen((x) => !x)}
        ref={clickContainerRef}
      >
        <div className="flex flex-nowrap">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-marine">
            <Image src={data.user.image!} layout="fill" alt="user avatar" />
          </div>
          <div className="flex flex-col justify-center ml-4">
            <span className="font-bold">{data.user.name}</span>
            <span className="text-xs text-carbon-300">{data.user.email}</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-6 h-full cursor-pointer">
          <MoreIcon
            className={`w-4 ${
              menuIsOpen ? "stroke-white" : "stroke-carbon-300"
            } group-hover:stroke-white `}
          />
        </div>
        {menuIsOpen && (
          <div className="absolute w-40 overflow-hidden rounded drop-shadow-[0_1px_4px_#0e0e0e] bottom-8 left-[300px] bg-carbon-700 border border-carbon-400">
            <ul className="flex flex-col w-full text-sm">
              <Link href="/settings">
                <li
                  className="flex items-center w-full h-10 px-4 transition-all border-b cursor-pointer hover:bg-carbon-600 gap-x-2 border-carbon-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuIsOpen((x) => !x);
                  }}
                >
                  <SettingsIcon className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </li>
              </Link>
              <li
                className="flex items-center justify-between w-full h-10 px-4 transition-all cursor-pointer hover:bg-carbon-600"
                onClick={() => signOut()}
              >
                <span>Sign out</span>
                <LogoutIcon className="w-3.5 h-3.5" />
              </li>
            </ul>
          </div>
        )}
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
