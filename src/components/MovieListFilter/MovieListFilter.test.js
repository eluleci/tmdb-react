import React from 'react';
import { configure, shallow } from 'enzyme';
import { Genre } from '../../models'
import Adapter from 'enzyme-adapter-react-16';
import { MovieListFilter } from './MovieListFilter'

configure({ adapter: new Adapter() });

const genres = {
  1: new Genre({
    id: 1,
    name: 'Thriller',
  }),
  2: new Genre({
    id: 2,
    name: 'Science Fiction',
  }),
  3: new Genre({
    id: 3,
    name: 'Comedy',
  }),
}

describe('<MovieListFilter />', () => {

  const simpleWrapper = shallow(<MovieListFilter
    availableGenreIds={[2, 3]}
    genres={genres}
    movieFilter={{ genres: [], rating: 3 }}
    setGenreFilter={() => {}}
    setRatingFilter={() => {}}
  />);

  it('renders a `.movie-list-filter`', () => {
    expect(simpleWrapper.find('.movie-list-filter').length).toBe(1);
  });

  it('renders two `.filter-container`', () => {
    expect(simpleWrapper.find('.filter-container').length).toBe(2);
  });

  it('renders "Filter by genre" title in first `.filter-container`', () => {
    expect(simpleWrapper.find('.filter-container').first().find('h3').text()).toBe('Filter by genre');
  });

  it('renders "Filter by genre" title in second `.filter-container`', () => {
    expect(simpleWrapper.find('.filter-container').at(1).find('h3').text()).toBe('Filter by rating');
  });

  it('renders two checkbox for genre filter', () => {
    expect(simpleWrapper.find('.checkbox-container').length).toBe(2);
  });

  it('renders valid name for the checkbox labels', () => {
    expect(simpleWrapper.find('.checkbox-container').first().find('label').text()).toBe('Science Fiction');
    expect(simpleWrapper.find('.checkbox-container').at(1).find('label').text()).toBe('Comedy');
  });

  it('calls setGenreFilter with new genres', () => {

    const setGenreFilter = jest.fn(() => { });

    const wrapper = shallow(<MovieListFilter
      availableGenreIds={[2, 3]}
      genres={genres}
      movieFilter={{ genres: [], rating: 3 }}
      setGenreFilter={setGenreFilter}
      setRatingFilter={() => {}}
    />);

    // simulate click on the checkbox that contains the genre id '2'
    wrapper.find('.checkbox-container').first().find('input').simulate('change', { target: { checked: true } });

    const setGenreFilterCalls = setGenreFilter.mock.calls;

    // check the 'setGenreFilter' called once
    expect(setGenreFilterCalls.length).toBe(1);

    // check that 'setGenreFilter' is called with only one argument
    expect(setGenreFilterCalls[0].length).toEqual(1);
  });

  it('calls setGenreFilter by adding new selected genre', () => {

    const setGenreFilter = jest.fn(() => { });

    const wrapper = shallow(<MovieListFilter
      availableGenreIds={[2, 3]}
      genres={genres}
      movieFilter={{ genres: [], rating: 3 }}
      setGenreFilter={setGenreFilter}
      setRatingFilter={() => {}}
    />);

    // simulate click on the checkbox that contains the genre id '2', so that the id will be added to the genres
    wrapper.find('.checkbox-container').first().find('input').simulate('change', { target: { checked: true } });

    const setGenreFilterCalls = setGenreFilter.mock.calls;

    // check that the first argument passed to the 'setGenreFilter' is '[2]'
    expect(setGenreFilterCalls[0][0]).toEqual([2]);
  });

  it('calls setGenreFilter by removing the already selected genre', () => {

    const setGenreFilter = jest.fn(() => { });

    const wrapper = shallow(<MovieListFilter
      availableGenreIds={[2, 3]}
      genres={genres}
      movieFilter={{ genres: [2, 3], rating: 3 }}
      setGenreFilter={setGenreFilter}
      setRatingFilter={() => {}}
    />);

    // simulate click on the checkbox that contains the genre id '2', so that the id will be removed from the genres
    wrapper.find('.checkbox-container').first().find('input').simulate('change', { target: { checked: true } });

    const setGenreFilterCalls = setGenreFilter.mock.calls;

    // check that the first argument passed to the 'setGenreFilter' is '[3]'
    expect(setGenreFilterCalls[0][0]).toEqual([3]);
  });

  it('calls setRatingFilter when number select changes', () => {

    const setRatingFilter = jest.fn(() => { });

    const wrapper = shallow(<MovieListFilter
      availableGenreIds={[]}
      genres={genres}
      movieFilter={{ genres: [], rating: 3 }}
      setGenreFilter={() => {}}
      setRatingFilter={setRatingFilter}
    />);

    // simulate change on the number input
    wrapper.find('[type="number"]').first().simulate('change', { target: { value: 3.5 } });

    const setRatingFilterCalls = setRatingFilter.mock.calls;

    // check that the first argument passed to the 'setGenreFilter' is '[3]'
    expect(setRatingFilterCalls[0][0]).toEqual(3.5);
  });

  it('does not call setRatingFilter when number select changes to something greater than 10', () => {

    const setRatingFilter = jest.fn(() => { });

    const wrapper = shallow(<MovieListFilter
      availableGenreIds={[]}
      genres={genres}
      movieFilter={{ genres: [], rating: 3 }}
      setGenreFilter={() => {}}
      setRatingFilter={setRatingFilter}
    />);

    // simulate change on the number input
    wrapper.find('[type="number"]').first().simulate('change', { target: { value: 11 } });

    const setRatingFilterCalls = setRatingFilter.mock.calls;

    // check the 'setRatingFilter' called never
    expect(setRatingFilterCalls.length).toBe(0);
  });

  it('does not call setRatingFilter when number select changes to something less than -1', () => {

    const setRatingFilter = jest.fn(() => { });

    const wrapper = shallow(<MovieListFilter
      availableGenreIds={[]}
      genres={genres}
      movieFilter={{ genres: [], rating: 3 }}
      setGenreFilter={() => {}}
      setRatingFilter={setRatingFilter}
    />);

    // simulate change on the number input
    wrapper.find('[type="number"]').first().simulate('change', { target: { value: -1 } });

    const setRatingFilterCalls = setRatingFilter.mock.calls;

    // check the 'setRatingFilter' called never
    expect(setRatingFilterCalls.length).toBe(0);
  });
})
