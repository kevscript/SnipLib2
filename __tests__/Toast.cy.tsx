import Toast from "@/components/Toast";
import React from "react";

describe("Toast", () => {
  it("displays correctly success message", () => {
    const ref = React.createRef<any>();
    cy.mount(<Toast ref={ref} />).then(() => {
      ref.current.showToast({
        type: "success",
        title: "Hello World",
        duration: 10000,
      });
      cy.get('[data-cy="toast"]').should("exist");
      cy.get("p").should("contain.text", "Hello World");
    });
  });

  it("displays correctly fail message", () => {
    const ref = React.createRef<any>();
    cy.mount(<Toast ref={ref} />).then(() => {
      ref.current.showToast({
        type: "fail",
        title: "Error happened",
        duration: 10000,
      });
      cy.get('[data-cy="toast"]').should("exist");
      cy.get("p").should("contain.text", "Error happened");
    });
  });

  it("displays correctly neutral message", () => {
    const ref = React.createRef<any>();
    cy.mount(<Toast ref={ref} />).then(() => {
      ref.current.showToast({
        type: "neutral",
        title: "This is fine",
        duration: 10000,
      });
      cy.get('[data-cy="toast"]').should("exist");
      cy.get("p").should("contain.text", "This is fine");
    });
  });

  it("closes early when clicking the close button", () => {
    const ref = React.createRef<any>();
    cy.mount(<Toast ref={ref} />).then(() => {
      ref.current.showToast({
        type: "neutral",
        title: "This is fine",
        duration: 10000,
      });
      cy.get('[data-cy="toast"]').should("exist");
      cy.get("p").should("contain.text", "This is fine");

      cy.get("button").click();
      cy.get('[data-cy="toast"]').should("not.exist");
    });
  });
});
