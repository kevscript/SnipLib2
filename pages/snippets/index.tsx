import BarsWrapper from "@/components/layouts/BarsWrapper";

const SnippetsPage = () => {
  return <h1>Snippets Page</h1>;
};

SnippetsPage.authRequired = true;
SnippetsPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default SnippetsPage;
