import FormSelect from "@/components/forms/FormSelect";

describe("FormSelect", () => {
  it("renders correctly based on required props", () => {
    cy.mount(
      <FormSelect
        label="Country"
        name="country"
        value="Poland"
        handleValue={() => {}}
        errors={null}
      >
        <option value={"France"}>France</option>
        <option value={"Poland"}>Poland</option>
      </FormSelect>
    );

    cy.get("label").should("exist").should("contain.text", "Country");

    cy.get("select")
      .should("exist")
      .should("not.be.focused")
      .should("contain.value", "Poland")
      .should("have.attr", "name")
      .and("match", /country/);
  });

  it("calls handleValue on input change", () => {
    cy.mount(
      <FormSelect
        label="Country"
        name="country"
        value="Poland"
        handleValue={cy.spy().as("onChangeSpy")}
        errors={null}
      >
        <option value={"France"}>France</option>
        <option value={"Poland"}>Poland</option>
      </FormSelect>
    );
    cy.get("select").select("France");
    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("displays errors if they exists", () => {
    cy.mount(
      <FormSelect
        label="Country"
        name="country"
        value="Poland"
        handleValue={cy.spy().as("onChangeSpy")}
        errors={["Error1", "Error2"]}
      >
        <option value={"France"}>France</option>
        <option value={"Poland"}>Poland</option>
      </FormSelect>
    );

    cy.get("p").then((err) => {
      expect(err[0]).to.contain.text("Error1");
      expect(err[1]).to.contain.text("Error2");
    });
  });
});
