import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import ArticleListItem from "./ArticleListItem";

const articleDetailMock = {
  id: "0517f083-0e15-4876-8d1f-6fa45900431c",
  name: "Leg",
  amountInStock: 12,
};

const articleMock = {
  amountRequired: 4,
  id: "0517f083-0e15-4876-8d1f-6fa45900431c",
};

describe("ArticleListItem", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(articleDetailMock),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });
  it("loads the article item detail on mount", async () => {
    render(<ArticleListItem article={articleMock} onStatusChange={() => {}} />);

    const articleName = await screen.findByTestId("articleName");
    const articleAmount = await screen.findByTestId("articleAmount");
    const articleRequired = await screen.findByTestId("articleRequired");

    expect(articleName).toHaveTextContent(articleDetailMock.name);
    expect(articleAmount).toHaveTextContent(articleDetailMock.amountInStock);
    expect(articleRequired).toHaveTextContent(articleMock.amountRequired);
  });

  describe("when api call fails", () => {
    beforeEach(() => {
      originalFetch = global.fetch;

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        })
      );
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it("shows error state", async () => {
      render(
        <ArticleListItem article={articleMock} onStatusChange={() => {}} />
      );

      const errorMessage = await screen.findByTestId("errorMessage");

      expect(errorMessage).toHaveTextContent(
        "Something went wrong getting the article, we are on it"
      );
    });

    //TODO: complete this test
    it("tries again when user clicks", async () => {
      // render(<ArticleListItem article={articleMock} onStatusChange={() => {}} />);
      // const tryAgainButton = await screen.findByTestId('tryAgainButton');
      // const onStatusChange = jest.fn();
      // fireEvent.click(tryAgainButton);
      // expect(onStatusChange).toHaveBeenCalled();
    });
  });
});
