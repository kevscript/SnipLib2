import BarsWrapper from "@/components/layouts/BarsWrapper";
import { ReactElement } from "react";

const EditSnippetPage = () => {
  return <h1>Edit Snippet Page</h1>;
};

EditSnippetPage.authRequired = true;
EditSnippetPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="collection">{page}</BarsWrapper>;
};
export default EditSnippetPage;
