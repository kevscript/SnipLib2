import GithubIcon from "@/components/icons/Github";
import Loader from "@/components/shared/Loader";
import SnipLogo from "@/components/shared/SnipLogo";
import { useData } from "@/hooks/useUserData";
import { useScroll } from "framer-motion";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { isSuccess, initOriginalList } = useData();

  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const [isBlured, setIsBlured] = useState(false);

  useEffect(() => {
    const triggerBlur = (y: number) => {
      if (y >= 100 && !isBlured) {
        setIsBlured(true);
      }
      if (y < 100 && isBlured) {
        setIsBlured(false);
      }
    };
    return scrollY.onChange((y) => {
      triggerBlur(y);
    });
  }, [isBlured]);

  useEffect(() => {
    if (isSuccess && status === "authenticated" && router.isReady) {
      const { path } = initOriginalList();
      router.replace({ pathname: path });
    }
  }, [initOriginalList, router, status, isSuccess]);

  if (status === "unauthenticated") {
    return (
      <div className="h-screen overflow-auto bg-black" ref={scrollRef}>
        <div
          className={`sticky top-0 left-0 right-0 h-16 border-b-[1px] transition-all ${
            isBlured
              ? "bg-carbon-500 bg-opacity-50 backdrop-blur border-carbon-400"
              : "bg-transparent border-transparent"
          }`}
        >
          <div
            className={`flex justify-between items-center h-full w-[1492px] max-w-[90%] mx-auto`}
          >
            <SnipLogo stage={2} />
            <ul>
              <button onClick={() => signIn("github")}>Sign In</button>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center max-w-[90%] mx-auto py-48">
          <div className="flex flex-col items-center w-full text-center">
            <h1 className="text-3xl font-black lg:text-6xl">
              Your snippet library on the cloud.
            </h1>
            <h3 className="mt-4 lg:text-lg text-carbon-300">
              Free and simple solution for creating, storing and sharing your
              code snippets on the web.
            </h3>
            <h3 className="hidden md:inline-block lg:text-lg text-carbon-300">
              Designed for developers seeking a reliable tool to help them
              manage their coding assets.
            </h3>

            <div className="mt-12">
              <button
                className="flex items-center px-4 py-3 font-medium rounded gap-x-2 bg-marine-600 hover:bg-marine-500"
                onClick={() => signIn("github")}
              >
                <GithubIcon className="w-5 h-5" filled />
                <span>Sign in with GitHub</span>
              </button>
            </div>
          </div>

          <div className="w-[1280px] max-w-[90%] bg-carbon-700 mt-32 aspect-video shadow-2xl rounded shadow-carbon-500 ">
            <video autoPlay loop muted>
              <source src="/welcome.mp4" />
            </video>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
};

export default Home;
