import FormError from "@/components/forms/FormError";

describe("FormError", () => {
  it("displays all error messages", () => {
    cy.mount(<FormError errors={["Error1", "Error2"]} />);
    cy.get("p").should("exist");
  });

  it("doesn't render any paragraph if no errors", () => {
    cy.mount(<FormError errors={null} />);
    cy.get("p").should("not.exist");
  });
});
