const { describe, it } = require("jest");
const { getAllArticles } = require("../controllers/articleController");

describe("getAllArticles", () => {
  it("should return all articles", async () => {
    const mockArticles = [{ title: "Article 1" }, { title: "Article 2" }];
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockFind = jest.fn().mockResolvedValue(mockArticles);
    const Article = { find: mockFind };

    await getAllArticles({}, mockResponse);

    expect(mockFind).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ articles: mockArticles });
  });

  it("should handle error when no articles found", async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockFind = jest.fn().mockResolvedValue(null);
    const Article = { find: mockFind };

    await getAllArticles({}, mockResponse);

    expect(mockFind).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Couldn't get articles",
    });
  });

  it("should handle error when an exception occurs", async () => {
    const mockError = new Error("Test error");
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockFind = jest.fn().mockRejectedValue(mockError);
    const Article = { find: mockFind };

    await getAllArticles({}, mockResponse);

    expect(mockFind).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Couldn't get articles",
    });
    expect(console.error).toHaveBeenCalledWith(
      "Couldn't get articles because",
      mockError.msg
    );
  });
});