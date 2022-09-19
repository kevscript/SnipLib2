import { useUserData } from "@/hooks/useUserData";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // const { collections, initializeApp, activeCollectionId, activeSnippetId } =
  //   useUserData();

  // useEffect(() => {
  //   if (collections && status === "authenticated") {
  //     initializeApp();
  //   }
  // }, [collections, initializeApp, status]);

  // useEffect(() => {
  //   if (activeCollectionId) {
  //     if (activeSnippetId) {
  //       router.push(`/collections/${activeCollectionId}/${activeSnippetId}`);
  //     } else {
  //       router.push(`/collections/${activeCollectionId}`);
  //     }
  //   }
  // }, [activeCollectionId, activeSnippetId, router]);

  if (status === "unauthenticated") {
    return (
      <div>
        <h1>Concieve, Believe, Achieve</h1>
        <button onClick={() => signIn("github")}>Login with Github</button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1>Loading collection...</h1>
    </div>
  );
};

export default Home;
