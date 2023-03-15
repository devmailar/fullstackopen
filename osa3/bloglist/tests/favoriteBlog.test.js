const listHelper = require('../utils/list_helper');

describe('favoriteBlog', () => {
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

  test('returns the blog with most likes of blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});
