import Button from "@/components/shared/Button";

describe("Button", () => {
  it("exists", () => {
    cy.mount(<Button label="Hello" />);
    cy.get("button").should("exist");
  });

  it("shows the correct label", () => {
    cy.mount(<Button label="Hello" />);
    cy.get("button").should("contain.text", "Hello");
  });

  it("is styled as primary by default", () => {
    const primaryColor = /rgb\(23, 91, 205\)/i;
    cy.mount(<Button label="Hello" />);
    cy.get("button")
      .should("have.css", "background-color")
      .and("match", primaryColor);
  });

  it("is styled correctly if variety secondary", () => {
    const secondaryColor = /rgb\(32, 34, 39\)/i;
    cy.mount(<Button label="Hello" variety="secondary" />);
    cy.get("button")
      .should("have.css", "background-color")
      .and("match", secondaryColor);
  });

  it("is styled correctly if variety ternary", () => {
    const ternaryColor = /rgba\(0, 0, 0, 0\)/i;
    cy.mount(<Button label="Hello" variety="ternary" />);
    cy.get("button")
      .should("have.css", "background-color")
      .and("match", ternaryColor);
  });

  it("has correct type", () => {
    cy.mount(<Button label="Hello" type="submit" />);
    cy.get("button").type("submit");
  });

  it("triggers onClick on click", () => {
    cy.mount(<Button label="Hello" onClick={cy.spy().as("onClickSpy")} />);
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.called");
  });
});
