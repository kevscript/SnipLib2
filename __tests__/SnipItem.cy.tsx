import SnipItem from "@/components/bars/SnipItem";
import Snippet from "@/models/Snippet";
import { ObjectID } from "bson";

const testSnippet: Snippet = {
  _id: new ObjectID(),
  listId: new ObjectID(),
  title: "Color Formatter",
  description: "formatting a color",
  content: "console.log('magic')",
  tags: ["abc", "purple"],
  favorite: false,
  language: "javascript",
  public: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe("SnipItem", () => {
  it("shows correct snippet information", () => {
    cy.mount(
      <SnipItem
        isActive={false}
        path="/france"
        color="#B4D455"
        snippet={testSnippet}
      />
    );

    cy.contains("color formatter", { matchCase: false });
    cy.contains("javascript", { matchCase: false });

    cy.get("ul > li").then((tag) => {
      expect(tag[0]).to.contain.text("#abc");
      expect(tag[1]).to.contain.text("#purple");
    });
  });

  it("uses the right color for language", () => {
    const badassColor = /rgb\(180, 212, 85\)/;
    cy.mount(
      <SnipItem
        isActive={false}
        path="/france"
        color="#B4D455"
        snippet={testSnippet}
      />
    );

    cy.contains("javascript", { matchCase: false })
      .should("have.css", "color")
      .and("match", badassColor);
  });

  it("should render as a link if not active", () => {
    cy.mount(
      <SnipItem
        isActive={false}
        path="/france"
        color="#B4D455"
        snippet={testSnippet}
      />
    );

    cy.get('[href="/france"]').should("exist");
  });

  it("should not render as a link if already active", () => {
    cy.mount(
      <SnipItem
        isActive={true}
        path="/france"
        color="#B4D455"
        snippet={testSnippet}
      />
    );

    cy.get('[href="/france"]').should("not.exist");
  });
});
