import BarHeaderWrapper from "@/components/bars/BarHeaderWrapper";

describe("BarHeaderWrapper", () => {
  it("renders correctly based on props", () => {
    cy.mount(<BarHeaderWrapper label="Colors" title="List18" />);

    cy.contains("list18", { matchCase: false });
    cy.contains("colors", { matchCase: false });
  });

  it("shows children when passed", () => {
    cy.mount(
      <BarHeaderWrapper label="Colors" title="List18">
        <button>Child</button>
      </BarHeaderWrapper>
    );

    cy.get("button").should("exist");
  });
});
