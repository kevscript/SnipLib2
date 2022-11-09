import FormArea from "@/components/forms/FormArea";

describe("FormArea", () => {
  it("renders correctly based on required props", () => {
    cy.mount(
      <FormArea
        label="Description"
        name="description"
        value="This is some text"
        errors={null}
        handleValue={cy.spy().as("onChangeSpy")}
      />
    );

    cy.get("label").should("exist").should("contain.text", "Description");

    cy.get("textarea")
      .should("exist")
      .should("not.be.focused")
      .should("contain.value", "This is some text")
      .should("have.attr", "name")
      .and("match", /description/);
  });

  it("calls handleValue on input change", () => {
    cy.mount(
      <FormArea
        label="Description"
        name="description"
        value="This is some text"
        errors={null}
        handleValue={cy.spy().as("onChangeSpy")}
      />
    );

    cy.get("textarea").type("a");
    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("displays errors if they exists", () => {
    cy.mount(
      <FormArea
        label="Description"
        name="description"
        value="This is some text"
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
