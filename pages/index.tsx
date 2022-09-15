import { useUserData } from "@/hooks/useUserData";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { collections, initializeApp } = useUserData();

  useEffect(() => {
    if (collections && status === "authenticated") {
      initializeApp();
      router.push("collections/");
    }
  }, [collections, initializeApp, router, status]);

  return (
    <div>
      <h1>Concieve, Believe, Achieve</h1>
      <button onClick={() => signIn("github")}>Login with Github</button>
    </div>
  );
};

export default Home;
