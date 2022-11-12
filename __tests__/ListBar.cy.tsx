import ListBar from "@/components/bars/ListBar";
import { mockLists } from "./mocks/mockList";
import { mockSnippets } from "./mocks/mockSnippet";
import { MockWrapper } from "./mocks/mockWrapper";

describe("ListBar", () => {
  const activeListId = mockLists[0]._id.toString();
  const activeSnippetId = mockSnippets[0]._id.toString();

  it("displays all the snippets in active list", () => {
    cy.mount(
      <MockWrapper>
        <ListBar
          activeListId={activeListId}
          activeSnippetId={activeSnippetId}
          lists={mockLists}
          snippets={mockSnippets}
        />
      </MockWrapper>
    );

    // check if all snippets of active list are rendered
    cy.get('[data-cy="active-list"] > li').then((items) => {
      Array.from(items).forEach((item, i) => {
        expect(item).to.contain.text(mockSnippets[i].title);
      });
    });
  });

  it("displays correct message when active list has no snippets", () => {
    cy.mount(
      <MockWrapper>
        <ListBar
          activeListId={activeListId}
          activeSnippetId={activeSnippetId}
          lists={mockLists}
          snippets={[]}
        />
      </MockWrapper>
    );

    // check if all snippets of active list are rendered
    cy.contains("no snippet yet", { matchCase: false });
  });

  it("displays all the CTA on none original list", () => {
    cy.mount(
      <MockWrapper>
        <ListBar
          activeListId={activeListId}
          activeSnippetId={activeSnippetId}
          lists={mockLists}
          snippets={[]}
        />
      </MockWrapper>
    );

    cy.get('[href="/snippet/create"]').should("exist");
    cy.get('[data-cy="create-snippet"]').should("exist");
    cy.get('[data-cy="edit-list"]').should("exist");
    cy.get('[data-cy="delete-list"]').should("exist");
  });

  it("hides the delete-list CTA on original list", () => {
    let originalizedLists = [...mockLists];
    originalizedLists[0].original = true;

    cy.mount(
      <MockWrapper>
        <ListBar
          activeListId={activeListId}
          activeSnippetId={activeSnippetId}
          lists={originalizedLists}
          snippets={[]}
        />
      </MockWrapper>
    );

    cy.get('[href="/snippet/create"]').should("exist");
    cy.get('[data-cy="create-snippet"]').should("exist");
    cy.get('[data-cy="edit-list"]').should("exist");
    cy.get('[data-cy="delete-list"]').should("not.exist");
  });
});
