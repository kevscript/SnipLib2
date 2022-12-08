import Toast from "@/components/toasts/Toast";
import { mockToasts } from "./mocks/mockToast";

describe("Toast", () => {
  it("displays toast correctly", () => {
    cy.mount(<Toast toast={mockToasts[0]} handleRemove={() => {}} />);
    // check title
    cy.get("li").should("contain.text", "Toast 1");
    // check type
    const toastType = `toast-${mockToasts[0].type}`;
    cy.get(`[data-cy="${toastType}"]`).should("exist");
  });

  it("triggers the remove handler on btn click", () => {
    cy.mount(
      <Toast toast={mockToasts[0]} handleRemove={cy.spy().as("onRemove")} />
    );
    cy.get("button").should("exist").click();
    cy.get("@onRemove").should("have.been.called");
  });
});
