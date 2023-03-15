const listHelper = require('../utils/list_helper');

describe('mostLikes', () => {
  const blogs = [
    {
      author: 'John Doe',
      likes: 5,
    },
    {
      author: 'Jane Smith',
      likes: 7,
    },
    {
      author: 'Paul Johnson',
      likes: 88,
    },
    {
      author: 'Andrew Davis',
      likes: 10,
    },
  ];

  test('returns the blog author name with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toBe('Paul Johnson ' + '88');
  });
});
