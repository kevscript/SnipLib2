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
      <>
        <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black">
          <svg
            width="100%"
            height="100%"
            className="fill-transparent stroke-[#050505]"
          >
            <pattern
              id="pattern-cubes"
              x="0"
              y="126"
              patternUnits="userSpaceOnUse"
              width="126"
              height="200"
              // eslint-disable-next-line react/no-unknown-property
              viewBox="0 0 10 16"
            >
              <g id="cube">
                <path className="left-shade" d="M0 0l5 3v5l-5 -3z"></path>
                <path className="right-shade" d="M10 0l-5 3v5l5 -3"></path>
              </g>

              <use x="5" y="8" xlinkHref="#cube"></use>
              <use x="-5" y="8" xlinkHref="#cube"></use>
            </pattern>

            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-cubes)"
            ></rect>
          </svg>
        </div>
        <div
          className="relative w-screen h-screen overflow-auto"
          ref={scrollRef}
        >
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
              <h3 className="mt-4 text-gray-300 lg:text-lg">
                Free and simple solution for creating, storing and sharing your
                code snippets on the web.
              </h3>
              <h3 className="hidden text-gray-300 md:inline-block lg:text-lg">
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

            <div className="w-[1280px] max-w-[90%] bg-carbon-700 mt-32 aspect-video shadow-2xl rounded shadow-black">
              <video autoPlay loop muted poster="/poster.jpg">
                <source src="/welcome.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
};

export default Home;
