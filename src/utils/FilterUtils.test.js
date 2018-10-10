import { satisfiesGenreFilter, satisfiesRatingFilter } from './FilterUtils';
import { Movie } from '../models'

describe('FilterUtils', () => {

  it('should return true from satisfiesGenreFilter', () => {
    expect(satisfiesGenreFilter([1, 2], new Movie({ genre_ids: [1, 2] }))).toBeTruthy();
  });

  it('should return false from satisfiesGenreFilter', () => {
    expect(satisfiesGenreFilter([1, 2], new Movie({ genre_ids: [1] }))).toBeFalsy();
  });

  it('should return true from satisfiesRatingFilter', () => {
    // should satisfy when equals
    expect(satisfiesRatingFilter(5, new Movie({ vote_average: 5 }))).toBeTruthy();
    expect(satisfiesRatingFilter(5, new Movie({ vote_average: 6 }))).toBeTruthy();
  });

  it('should return false from satisfiesRatingFilter', () => {
    expect(satisfiesRatingFilter(5, new Movie({ vote_average: 4 }))).toBeFalsy();
  });
})
