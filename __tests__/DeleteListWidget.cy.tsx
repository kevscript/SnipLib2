import DeleteListWidget from "@/components/widgets/DeleteListWidget";
import { mockList } from "./mocks/mockList";
import { MockWrapper } from "./mocks/mockWrapper";

describe("DeleteListWidget", () => {
  it("should initialy render the Icon without modal", () => {
    cy.mount(
      <MockWrapper>
        <DeleteListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="delete-list"]').should("exist");
    cy.get('[data-cy="delete-list-modal"]').should("not.exist");
  });

  it("should open modal on Icon click", () => {
    cy.mount(
      <MockWrapper>
        <DeleteListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="delete-list-modal"]').should("not.exist");
    cy.get('[data-cy="delete-list"]').click();
    cy.get('[data-cy="delete-list-modal"]').should("exist");
  });

  it("should have correct modal content", () => {
    cy.mount(
      <MockWrapper>
        <DeleteListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="delete-list"]').click();

    const confirmMessage = cy
      .get("p")
      .contains("Are you sure", { matchCase: false });
    confirmMessage.should("exist");

    const deleteButton = cy
      .get("button")
      .contains("delete", { matchCase: false });
    deleteButton.should("exist");

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });
    cancelButton.should("exist");
  });

  it("should close modal on cancel button click", () => {
    cy.mount(
      <MockWrapper>
        <DeleteListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="delete-list"]').click();

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false })
      .should("exist");
    cancelButton.click();

    cy.get('[data-cy="delete-list-modal"]').should("not.exist");
  });
});
