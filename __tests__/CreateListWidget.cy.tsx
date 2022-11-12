import CreateListWidget from "@/components/widgets/CreateListWidget";
import { MockWrapper } from "./mocks/mockWrapper";

describe("CreateListWidget", () => {
  it("should initialy render with Icon and without modal", () => {
    cy.mount(
      <MockWrapper>
        <CreateListWidget />
      </MockWrapper>
    );

    cy.get('[data-cy="create-list"]').should("exist");
    cy.get('[data-cy="create-list-modal"]').should("not.exist");
  });

  it("opens modal on Icon click", () => {
    cy.mount(
      <MockWrapper>
        <CreateListWidget />
      </MockWrapper>
    );

    cy.get('[data-cy="create-list-modal"]').should("not.exist");
    cy.get('[data-cy="create-list"]').click();
    cy.get('[data-cy="create-list-modal"]').should("exist");
  });

  it("display the correct modal content", () => {
    cy.mount(
      <MockWrapper>
        <CreateListWidget />
      </MockWrapper>
    );

    cy.get("input").should("not.exist");
    cy.get('[data-cy="create-list"]').click();
    cy.get("input").should("exist");

    const createButton = cy
      .get("button")
      .contains("create", { matchCase: false });
    createButton.should("exist");

    const cancelButton = cy
      .get("button")
      .contains("cancel", { matchCase: false });
    cancelButton.should("exist");
    cancelButton.click();
    cy.get("input").should("not.exist");
  });

  it("should disable the create button if input is empty", () => {
    cy.mount(
      <MockWrapper>
        <CreateListWidget />
      </MockWrapper>
    );

    cy.get('[data-cy="create-list"]').click();

    const textInput = cy.get("input");
    const createButton = cy
      .get("button")
      .contains("create", { matchCase: false });

    createButton.should("be.disabled");
    textInput.type("some value");
    createButton.should("not.be.disabled");
  });
});
