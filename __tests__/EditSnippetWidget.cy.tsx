import EditSnippetWidget from "@/components/widgets/EditSnippetWidget";
import { mockSnippet } from "./mocks/mockSnippet";
import { MockWrapper } from "./mocks/mockWrapper";

describe("EditSnippetWidget", () => {
  it("should initaly render with button and without modal", () => {
    cy.mount(
      <MockWrapper>
        <EditSnippetWidget
          snippet={mockSnippet}
          onConfirm={() => {}}
          isLoading={false}
        />
      </MockWrapper>
    );

    const saveButton = cy.get('[data-cy="edit-snippet"]');
    saveButton.should("exist");

    const modal = cy.get('[data-cy="edit-snippet-modal"]');
    modal.should("not.exist");
  });

  it("should open modal on Save button click", () => {
    cy.mount(
      <MockWrapper>
        <EditSnippetWidget
          snippet={mockSnippet}
          onConfirm={() => {}}
          isLoading={false}
        />
      </MockWrapper>
    );

    const saveButton = cy.get('[data-cy="edit-snippet"]');
    saveButton.click();

    const modal = cy.get('[data-cy="edit-snippet-modal"]');
    modal.should("exist");
  });

  it("should display correct modal content", () => {
    cy.mount(
      <MockWrapper>
        <EditSnippetWidget
          snippet={mockSnippet}
          onConfirm={() => {}}
          isLoading={false}
        />
      </MockWrapper>
    );

    const saveButton = cy.get('[data-cy="edit-snippet"]');
    saveButton.click();

    const confirmMessage = cy
      .get("p")
      .contains("Are you sure", { matchCase: false });
    confirmMessage.should("exist");

    const snippetName = cy.contains(mockSnippet.title, { matchCase: false });
    snippetName.should("exist");

    const confirButton = cy
      .get("button")
      .contains("confirm", { matchCase: false });
    confirButton.should("exist");

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });
    cancelButton.should("exist");
  });

  it("should close modal on Cancel button click", () => {
    cy.mount(
      <MockWrapper>
        <EditSnippetWidget
          snippet={mockSnippet}
          onConfirm={() => {}}
          isLoading={false}
        />
      </MockWrapper>
    );

    const saveButton = cy.get('[data-cy="edit-snippet"]');
    saveButton.click();

    const modal = cy.get('[data-cy="edit-snippet-modal"]');
    modal.should("exist");

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });

    cancelButton.click();

    modal.should("not.exist");
  });

  it("should call onConfirm on Confirm button click", () => {
    cy.mount(
      <MockWrapper>
        <EditSnippetWidget
          snippet={mockSnippet}
          onConfirm={cy.spy().as("onConfirmSpy")}
          isLoading={false}
        />
      </MockWrapper>
    );

    const saveButton = cy.get('[data-cy="edit-snippet"]');
    saveButton.click();

    const confirButton = cy
      .get("button")
      .contains("confirm", { matchCase: false });

    confirButton.click();
    cy.get("@onConfirmSpy").should("have.been.called");
  });
});
