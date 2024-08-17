import FavBar from "@/components/bars/FavBar";
import { mockSnippets } from "./mocks/mockSnippet";
import { MockWrapper } from "./mocks/mockWrapper";

describe("FavBar", () => {
  const activeSnippetId = mockSnippets[0]._id.toString();
  const favSnippets = [...mockSnippets].map((s) => ({ ...s, favorite: true }));

  it("displays all the snippets in active list", () => {
    cy.mount(
      <MockWrapper>
        <FavBar activeSnippetId={activeSnippetId} favSnippets={favSnippets} />
      </MockWrapper>
    );

    // check if all favorite snippets are rendered
    cy.get('[data-cy="active-list"] > a').then((items) => {
      Array.from(items).forEach((item, i) => {
        expect(item).to.contain.text(mockSnippets[i].title);
      });
    });
  });

  it("displays correct message when active list has no snippets", () => {
    cy.mount(
      <MockWrapper>
        <FavBar activeSnippetId={activeSnippetId} favSnippets={[]} />
      </MockWrapper>
    );

    cy.contains("No favorite", { matchCase: false });
  });
});
