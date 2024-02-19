const { sortByComments, sortByPoints } = require('../components/reports');

describe('sortByComments', () => {
  test('Should return an empty array if there are no inputs', () => {
    const input = [];
    const output = sortByComments(input);
    expect(output).toEqual([]);
  });

  test('Should sort items by number of comments in descending order', () => {
    const input = [
      { id: '1', title: 'Example of title with more than five worlds', comments: '10 comments', points: '10 points'},
      { id: '2', title: 'Example 2 of title with more than five worlds', comments: '5 comments', points: '5 points'},
      { id: '3', title: 'Example 3 of title with more than five worlds', comments: '8 comments', points: '8 points'}
    ];

    const output = sortByComments(input);

    // The first element in output should have more comments than the second
    expect(parseInt(output[0].comments.split(" ")[0])).toBeGreaterThanOrEqual(parseInt(output[1].comments.split(" ")[0]));
  });
});

describe('sortByPoints', () => {
  test('Should return an empty array if there are no inputs', () => {
    const input = [];
    const output = sortByPoints(input);
    expect(output).toEqual([]);
  });

  test('Should sort items by number of points in descending order', () => {
    const input = [
      { id: '1', title: 'Example of short title', comments: '10 comments', points: '5 points'},
      { id: '2', title: 'Example 2 of short title', comments: '10 comments', points: '5 points'},
      { id: '3', title: 'Example 3 short title', comments: '8 comments', points: '8 points'}
    ];

    const output = sortByPoints(input);

    // The first element in output should have more points than the second
    expect(parseInt(output[0].points.split(" ")[0])).toBeGreaterThanOrEqual(parseInt(output[1].points.split(" ")[0]));
  });
});