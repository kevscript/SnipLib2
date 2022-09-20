import { useData } from "@/hooks/useData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CollectionsPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const { activeCollectionId, activeSnippetId } = useData();

  useEffect(() => {
    if (activeCollectionId && status === "authenticated") {
      router.push(`/collections/${activeCollectionId}/${activeSnippetId}`);
    }
  }, [activeCollectionId, activeSnippetId, router, status]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1>Loading from /collections/...</h1>
    </div>
  );
};

export default CollectionsPage;
