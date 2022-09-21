import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const TagPage = () => {
  const router = useRouter();
  const { tagLabel } = router.query;

  const { snippets, activeSnippetId, activeTagLabel, tags, checkTag } =
    useData();

  useEffect(() => {
    if (tags && activeTagLabel !== tagLabel) {
      checkTag(tagLabel as string);
    }
  }, [checkTag, tagLabel, activeTagLabel, tags]);

  useEffect(() => {
    if (activeTagLabel && activeTagLabel === tagLabel) {
      if (activeSnippetId) {
        router.push(`/tags/${activeTagLabel}/${activeSnippetId}`);
      } else {
        router.push(`/tags/${activeTagLabel}`);
      }
    }
  }, [activeTagLabel, activeSnippetId, router, tagLabel]);

  if (activeTagLabel !== tagLabel) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      {tags && (
        <>
          <h1>
            Tag label :{" "}
            {tags.find((tag) => tag.label === activeTagLabel)!.label}
          </h1>
          <ul>
            {snippets &&
              snippets
                .filter((s) => s.tags?.includes(tagLabel))
                .map((s) => <li key={s._id.toString()}>{s.title}</li>)}
          </ul>
        </>
      )}
      {snippets && !snippets.some((s) => s.tags?.includes(activeTagLabel)) && (
        <h1>No snippet with this tag</h1>
      )}
    </div>
  );
};

TagPage.authRequired = true;
TagPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="tag">{page}</BarsWrapper>;
};
export default TagPage;
