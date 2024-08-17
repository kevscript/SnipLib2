import TagBar from "@/components/bars/TagBar";
import { mockSnippets } from "./mocks/mockSnippet";
import { mockTag } from "./mocks/mockTag";
import { MockWrapper } from "./mocks/mockWrapper";

describe("TagBar", () => {
  const activeSnippetId = mockSnippets[0]._id.toString();
  const favSnippets = [...mockSnippets].map((s) => ({ ...s, favorite: true }));

  it("displays all the snippets with current active tag label", () => {
    cy.mount(
      <MockWrapper>
        <TagBar
          activeSnippetId={activeSnippetId}
          activeTagLabel="abc"
          tags={[mockTag]}
          snippets={mockSnippets}
        />
      </MockWrapper>
    );

    // check if all snippets with current active tag label are rendered
    cy.get('[data-cy="active-list"] > a').then((items) => {
      Array.from(items).forEach((item, i) => {
        expect(item).to.contain.text(mockSnippets[i].title);
      });
    });
  });

  it("displays correct message when no snippet has current active tag label", () => {
    const snippetsWithoutTags = [...mockSnippets].map((s) => ({
      ...s,
      tags: [],
    }));
    cy.mount(
      <MockWrapper>
        <TagBar
          activeSnippetId={activeSnippetId}
          activeTagLabel="abc"
          tags={[mockTag]}
          snippets={snippetsWithoutTags}
        />
      </MockWrapper>
    );

    cy.contains("No snippet", { matchCase: false });
  });
});
