import React from 'react';
import { configure, shallow } from 'enzyme';
import { MovieList } from './MovieList';
import { ApiError, Genre, Movie } from '../../models';
import Adapter from 'enzyme-adapter-react-16';
import MovieCell from '../MovieCell';
import MovieListFilter from '../MovieListFilter';

configure({ adapter: new Adapter() });

describe('<MovieList />', () => {

  it('renders one `.container`', () => {
    const wrapper = shallow(<MovieList fetchGenres={() =>{}} fetchMovies={() =>{}} />);
    expect(wrapper.find('.container').length).toBe(1);
  });

  it('does not call fetchMovies and fetchGenres when there is an error', () => {
    const fetchMovies = jest.fn(() => { });
    const fetchGenres = jest.fn(() => { });

    shallow(<MovieList error={new ApiError({})} fetchGenres={fetchGenres} fetchMovies={fetchMovies} />);

    expect(fetchMovies.mock.calls.length).toBe(0);
    expect(fetchGenres.mock.calls.length).toBe(0);
  });

  it('does not call fetchMovies and fetchGenres when isPending is true', () => {
    const fetchMovies = jest.fn(() => { });
    const fetchGenres = jest.fn(() => { });

    shallow(<MovieList isPending={true} fetchGenres={fetchGenres} fetchMovies={fetchMovies} />);

    expect(fetchMovies.mock.calls.length).toBe(0);
    expect(fetchGenres.mock.calls.length).toBe(0);
  });

  it('calls fetchMovies once, fetchGenres never', () => {
    const fetchMovies = jest.fn(() => { });
    const fetchGenres = jest.fn(() => { });

    shallow(<MovieList fetchGenres={fetchGenres} fetchMovies={fetchMovies} />);

    expect(fetchMovies.mock.calls.length).toBe(1);
    expect(fetchGenres.mock.calls.length).toBe(0);
  });

  it('calls fetchMovies never, fetchGenres once', () => {
    const fetchMovies = jest.fn(() => { });
    const fetchGenres = jest.fn(() => { });

    shallow(<MovieList fetchGenres={fetchGenres} fetchMovies={fetchMovies} movies={[]} />);

    expect(fetchMovies.mock.calls.length).toBe(0);
    expect(fetchGenres.mock.calls.length).toBe(1);
  });

  it('renders one `.progress` with text `Loading ...` when isPending', () => {
    const wrapper = shallow(<MovieList isPending={true} fetchGenres={() =>{}} fetchMovies={() =>{}} />);
    expect(wrapper.find('.progress').length).toBe(1);
    expect(wrapper.find('.progress').text()).toBe('Loading ...');
  });

  it('renders one `.error` with proper text when there is an error', () => {
    const wrapper = shallow(<MovieList error={new ApiError({})} fetchGenres={() =>{}} fetchMovies={() =>{}} />);
    expect(wrapper.find('.error').length).toBe(1);
    expect(wrapper.find('.error').text()).toBe('Movie list couldn\'t be fetched.');
  });

  it('renders one <MovieListFilter /> component', () => {
    const wrapper = shallow(<MovieList fetchGenres={() =>{}} fetchMovies={() =>{}} genres={[]} movies={[]} />);
    expect(wrapper.find(MovieListFilter).length).toBe(1);
  });

  it('renders two <MovieCell /> components', () => {
    const movies = [
      new Movie({
        id: '123',
        genre_ids: [1,2],
        poster_path: 'someImageUrl',
        title: 'Inception',
        vote_average: '9.2',
      }),
      new Movie({
        id: '456',
        genre_ids: [2],
        poster_path: 'someImageUrl',
        title: 'Lord Of The Rings',
        vote_average: '9.3',
      }),
    ]

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

    const wrapper = shallow(<MovieList fetchGenres={() =>{}} fetchMovies={() =>{}} genres={genres} movies={movies} />);

    const movieCells = wrapper.find(MovieCell);
    expect(movieCells.length).toBe(2);
    expect(movieCells.first().prop('movie')).toBe(movies[0])
    expect(movieCells.first().prop('genres')).toBe(genres)
    expect(movieCells.at(1).prop('movie')).toBe(movies[1])
    expect(movieCells.at(1).prop('genres')).toBe(genres)
  });
})
