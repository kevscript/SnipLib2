import TagIcon from "@/components/icons/Tag";
import IconButton from "@/components/shared/IconButton";

describe("IconButton", () => {
  it("exists", () => {
    cy.mount(<IconButton icon={<TagIcon />} />);
    cy.get("button").should("exist");
  });

  it("styled correctly for small size", () => {
    cy.mount(<IconButton icon={<TagIcon />} scale="small" />);
    cy.get("button").should("have.css", "width").and("match", /24px/);
  });

  it("has correct type", () => {
    cy.mount(<IconButton icon={<TagIcon />} type="submit" />);
    cy.get("button").type("submit");
  });

  it("renders with tooltip", () => {
    cy.mount(
      <IconButton
        icon={<TagIcon className="fill-white" />}
        tooltipText="Favorite"
      />
    );

    cy.contains("span", "Favorite");
  });

  it("renders without tooltip", () => {
    cy.mount(<IconButton icon={<TagIcon />} />);
    cy.contains("span", "Favorite").should("not.exist");
  });

  it("triggers onClick on click", () => {
    cy.mount(
      <IconButton icon={<TagIcon />} onClick={cy.spy().as("onClickSpy")} />
    );
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.called");
  });
});
