import { render } from "@testing-library/react";
import ProductListItem from "./ProductListItem";

const productMock = {
  id: "a269a247-0d38-4b47-9630-79c9ae545b68",
  name: "Dining Chair",
  articles: [
    {
      id: "0517f083-0e15-4876-8d1f-6fa45900431c",
      amountRequired: 4,
    },
    {
      id: "831b92b8-677b-42cc-a585-335ea4ccccb6",
      amountRequired: 1,
    },
    {
      id: "addc65a8-c759-41d8-a18a-89fe446ad484",
      amountRequired: 8,
    },
  ],
};

jest.mock("./ArticleListItem", () => ({ article, onStatusChange }) => (
  <div>
    <p data-testid="articleName">name</p>
    <span>
      <span></span>
      In stock
      <span data-testid="articleAmount">(1)</span>
    </span>
    <span data-testid="articleRequired">
      {" "}
      Required: {article.amountRequired}
    </span>
  </div>
));

describe("ProductListItem", () => {
  it("loads the article item list on mount", async () => {
    const { container } = render(<ProductListItem product={productMock} />);

    expect(container).toMatchSnapshot();
  });

  //TODO: complete this test
  it("sets the create sale button enabled", () => {
    // const {container} = render(<ProductListItem product={productMock} />);
    // container.handleArticleStatus(true, {})
    // expect(container.state.articles).toBe(1)
  });
});
