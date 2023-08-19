const listHelper = require("../utils/list_helper");

describe("top blogger", () => {
  const blogs = [
    {
      author: "John Doe",
      blogs: 5,
    },
    {
      author: "Jane Smith",
      blogs: 7,
    },
    {
      author: "Paul Johnson",
      blogs: 2,
    },
    {
      author: "Andrew Davis",
      blogs: 10,
    },
  ];

  test("returns the blog author name with most blogs", () => {
    expect(listHelper.mostBlogs(blogs)).toBe("Andrew Davis");
  });
});
