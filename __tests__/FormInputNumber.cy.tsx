import FormInputNumber from "@/components/forms/FormInputNumber";

describe("FormInputNumber", () => {
  it("displays correctly with required props", () => {
    cy.mount(
      <FormInputNumber
        label="Age"
        name="age"
        value={21}
        errors={null}
        handleValue={() => {}}
      />
    );

    cy.get("input").should("exist").should("have.value", 21);
    cy.get("input")
      .should("have.attr", "type")
      .and("match", /number/);
    cy.get("input").should("have.attr", "name").and("match", /age/);
  });

  it("calls handleValue on input change", () => {
    cy.mount(
      <FormInputNumber
        label="Age"
        name="age"
        value={21}
        errors={null}
        handleValue={cy.spy().as("onChangeSpy")}
      />
    );

    cy.get("input").type("6");
    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("is intialy focused if autoFocus is true", () => {
    cy.mount(
      <FormInputNumber
        label="Age"
        name="age"
        value={8}
        errors={null}
        handleValue={() => {}}
        autoFocus={true}
      />
    );

    cy.get("input").should("be.focused");
  });

  it("displays errors if they exists", () => {
    cy.mount(
      <FormInputNumber
        label="Age"
        name="age"
        value={8}
        errors={["Error1", "Error2"]}
        handleValue={() => {}}
        autoFocus={true}
      />
    );

    cy.get("p").then((err) => {
      expect(err[0]).to.contain.text("Error1");
      expect(err[1]).to.contain.text("Error2");
    });
  });
});
