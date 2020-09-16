import Tour from '.';

test('should instance Tour class', () => {
  expect(Tour).toBeDefined();
  expect(Tour.items).toEqual([]);
});
