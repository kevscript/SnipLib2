import SnipLogo from "@/components/shared/SnipLogo";

describe("SnipLogo", () => {
  it("renders only the graphic logo by default", () => {
    cy.mount(<SnipLogo />);
    cy.get("svg").should("exist");
    cy.get("h5").should("not.exist");
    cy.get("h6").should("not.exist");
  });

  it("renders with title on stage 2", () => {
    cy.mount(<SnipLogo stage={2} />);
    cy.get("svg").should("exist");
    cy.get("h5").should("contain.text", "SnipLib");
    cy.get("h6").should("not.exist");
  });

  it("renders with subtitle on stage 3", () => {
    cy.mount(<SnipLogo stage={3} />);
    cy.get("svg").should("exist");
    cy.get("h5").should("contain.text", "SnipLib");
    cy.get("h6").should("contain.text", "Your");
  });
});
