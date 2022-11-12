import DeleteSnippetWidget from "@/components/widgets/DeleteSnippetWidget";
import { mockSnippet } from "./mocks/mockSnippet";
import { MockWrapper } from "./mocks/mockWrapper";

describe("DeleteSnippetWidget", () => {
  it("should initaly render the icon without modal", () => {
    cy.mount(
      <MockWrapper>
        <DeleteSnippetWidget snippet={mockSnippet} />
      </MockWrapper>
    );

    const iconButton = cy.get('[data-cy="delete-snippet"]');
    iconButton.should("exist");

    cy.get('[data-cy="delete-snippet-modal"]').should("not.exist");
  });

  it("should open modal on Icon click", () => {
    cy.mount(
      <MockWrapper>
        <DeleteSnippetWidget snippet={mockSnippet} />
      </MockWrapper>
    );

    const iconButton = cy.get('[data-cy="delete-snippet"]');
    iconButton.click();

    cy.get('[data-cy="delete-snippet-modal"]').should("exist");
  });

  it("should display correct modal content", () => {
    cy.mount(
      <MockWrapper>
        <DeleteSnippetWidget snippet={mockSnippet} />
      </MockWrapper>
    );

    const iconButton = cy.get('[data-cy="delete-snippet"]');
    iconButton.click();

    const confirmMessage = cy
      .get("p")
      .contains("Are you sure", { matchCase: false });
    confirmMessage.should("exist");
    const snippetName = cy.contains(mockSnippet.title, { matchCase: false });
    snippetName.should("exist");

    const deleteButton = cy
      .get("button")
      .contains("delete", { matchCase: false });
    deleteButton.should("exist");
    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });
    cancelButton.should("exist");
  });

  it("should close the modal on cancel button click", () => {
    cy.mount(
      <MockWrapper>
        <DeleteSnippetWidget snippet={mockSnippet} />
      </MockWrapper>
    );

    const iconButton = cy.get('[data-cy="delete-snippet"]');
    iconButton.click();

    const modal = cy.get('[data-cy="delete-snippet-modal"]');
    modal.should("exist");

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });
    cancelButton.click();

    modal.should("not.exist");
  });
});
