import FormInput from "@/components/forms/FormInput";

describe("FormInput", () => {
  it("renders correctly based on required props", () => {
    cy.mount(
      <FormInput
        label="Username"
        name="username"
        value="kevscript"
        errors={null}
        handleValue={cy.spy().as("onChangeSpy")}
      />
    );

    cy.get("label").should("exist").should("contain.text", "Username");

    cy.get("input")
      .should("exist")
      .should("not.be.focused")
      .should("contain.value", "kevscript")
      .should("have.attr", "name")
      .and("match", /username/);

    cy.get("input").type("a");
    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("is intialy focused if autoFocus is true", () => {
    cy.mount(
      <FormInput
        label="Username"
        name="username"
        value="kevscript"
        errors={null}
        handleValue={() => {}}
        autoFocus={true}
      />
    );

    cy.get("input").should("be.focused");
  });

  it("displays errors if they exists", () => {
    cy.mount(
      <FormInput
        label="Username"
        name="username"
        value="kevscript"
        errors={["Error1", "Error2"]}
        handleValue={() => {}}
      />
    );

    cy.get("p").then((err) => {
      expect(err[0]).to.contain.text("Error1");
      expect(err[1]).to.contain.text("Error2");
    });
  });
});
