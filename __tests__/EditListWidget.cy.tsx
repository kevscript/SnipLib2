import EditListWidget from "@/components/widgets/EditListWidget";
import { mockList } from "./mocks/mockList";
import { MockWrapper } from "./mocks/mockWrapper";

describe("EditListWidget", () => {
  it("should initialy render the icon without modal", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    const iconButton = cy.get('[data-cy="edit-list"]');
    iconButton.should("exist");

    const modal = cy.get('[data-cy="edit-list-modal"]');
    modal.should("not.exist");
  });

  it("should open modal on Icon click", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    const iconButton = cy.get('[data-cy="edit-list"]');
    iconButton.click();

    const modal = cy.get('[data-cy="edit-list-modal"]');
    modal.should("exist");
  });

  it("should display correct modal content", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="edit-list"]').click();

    cy.get("input").should("exist");

    cy.get("button").contains("save", { matchCase: false }).should("exist");
    cy.get("button").contains("cancel", { matchCase: false }).should("exist");
  });

  it("has a modal input prefilled with current list label", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="edit-list"]').click();

    const labelInput = cy.get("input");
    labelInput.should("have.value", mockList.label);
  });

  it("should disable the Save button on error", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="edit-list"]').click();

    cy.get("button")
      .contains("save", { matchCase: false })
      .should("not.be.disabled");

    const labelInput = cy.get("input");
    labelInput.should("have.value", mockList.label);
    labelInput.clear();

    cy.get("button")
      .contains("save", { matchCase: false })
      .should("be.disabled");
  });

  it("should display the right error", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="edit-list"]').click();

    const labelInput = cy.get("input");
    labelInput.should("have.value", mockList.label);
    labelInput.clear();

    cy.get("span")
      .contains("32 characters", { matchCase: false })
      .should("not.exist");
    cy.get("span").contains("empty", { matchCase: false }).should("exist");

    labelInput.type("this is way to long to be a valid label");

    cy.get("span").contains("empty", { matchCase: false }).should("not.exist");
    cy.get("span")
      .contains("32 characters", { matchCase: false })
      .should("exist");
  });

  it("should close modal on Cancel button click", () => {
    cy.mount(
      <MockWrapper>
        <EditListWidget list={mockList} />
      </MockWrapper>
    );

    cy.get('[data-cy="edit-list"]').click();

    const modal = cy.get('[data-cy="edit-list-modal"]');
    modal.should("exist");

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });
    cancelButton.click();

    modal.should("not.exist");
  });
});
