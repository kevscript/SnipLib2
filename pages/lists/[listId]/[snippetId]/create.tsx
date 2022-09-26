import BarsWrapper from "@/components/layouts/BarsWrapper";
import { ReactElement } from "react";

const CreateSnippetPage = () => {
  return <h1>Create Snippet Page</h1>;
};

CreateSnippetPage.authRequired = true;
CreateSnippetPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="list">{page}</BarsWrapper>;
};

export default CreateSnippetPage;
