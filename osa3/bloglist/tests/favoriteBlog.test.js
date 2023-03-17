const listHelper = require('../utils/list_helper');

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 14,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 24,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 34,
    },
  ];

  test('returns blog with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});
