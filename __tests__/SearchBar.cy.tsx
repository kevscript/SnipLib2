import SearchBar from "@/components/bars/SearchBar";
import { mockSnippets } from "./mocks/mockSnippet";
import { MockWrapper } from "./mocks/mockWrapper";

describe("SearchBar", () => {
  const activeSnippetId = mockSnippets[0]._id.toString();

  it("displays all the snippets that match the search value", () => {
    cy.mount(
      <MockWrapper>
        <SearchBar
          activeSearchValue="Color"
          activeSnippetId={activeSnippetId}
          snippets={mockSnippets}
        />
      </MockWrapper>
    );

    // check if all matching snippets are rendered
    cy.get('[data-cy="active-list"] > a').then((items) => {
      Array.from(items).forEach((item, i) => {
        expect(item).to.contain.text(mockSnippets[i].title);
      });
    });
  });

  it("displays correct message when no snippet matches the search value", () => {
    const snippetsWithoutMatch = [...mockSnippets].map((s) => ({
      ...s,
      content: "a",
      description: "a",
      tags: [],
      title: "a",
    }));
    cy.mount(
      <MockWrapper>
        <SearchBar
          activeSearchValue="Color"
          activeSnippetId={activeSnippetId}
          snippets={snippetsWithoutMatch}
        />
      </MockWrapper>
    );

    cy.contains("No snippet matching", { matchCase: false });
  });
});
