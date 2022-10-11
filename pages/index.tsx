import { useData } from "@/hooks/useUserData";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { isSuccess, initOriginalList } = useData();

  useEffect(() => {
    if (isSuccess && status === "authenticated" && router.isReady) {
      const { path } = initOriginalList();
      router.replace({ pathname: path });
    }
  }, [initOriginalList, router, status, isSuccess]);

  // useEffect(() => {
  //   if (status === "authenticated" && router.isReady) {
  //     router.replace(`/snippets`);
  //   }
  // }, [router, status]);

  if (status === "unauthenticated") {
    return (
      <div>
        <h1>Concieve, Believe, Achieve</h1>
        <button onClick={() => signIn("github")}>Login with Github</button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1>Loading...</h1>
    </div>
  );
};

export default Home;
