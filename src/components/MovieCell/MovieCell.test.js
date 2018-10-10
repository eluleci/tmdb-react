import React from 'react';
import { configure, shallow } from 'enzyme';
import MovieCell from './MovieCell';
import { Genre, Movie } from '../../models'
import Adapter from 'enzyme-adapter-react-16';
import Tag from '../Tag'

configure({ adapter: new Adapter() });

const movie = new Movie({
  id: '123',
  genre_ids: [1,2],
  poster_path: 'someImageUrl',
  title: 'Inception',
  vote_average: '9.2',
});

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

describe('<MovieCell />', () => {

  it('renders a `.movie-cell`', () => {
    const wrapper = shallow(<MovieCell genres={genres} movie={movie} />);
    expect(wrapper.find('.movie-cell').length).toBe(1);
  });

  it('renders an img with correct className and poster path', () => {
    const wrapper = shallow(<MovieCell genres={genres} movie={movie} />);
    expect(wrapper.find('img').prop("src")).toBe('http://image.tmdb.org/t/p/w500//someImageUrl');
    expect(wrapper.find('img').prop("className")).toBe('poster');
  });

  it('renders an <h2> with correct title', () => {
    const wrapper = shallow(<MovieCell genres={genres} movie={movie} />);
    expect(wrapper.find('h2').text()).toBe('Inception');
  });

  it('renders an <h3> with correct rating', () => {
    const wrapper = shallow(<MovieCell genres={genres} movie={movie} />);
    expect(wrapper.find('h3').prop("children")).toContain("9.2");
  });

  it('renders two <Tag /> components', () => {
    const wrapper = shallow(<MovieCell genres={genres} movie={movie} />);
    expect(wrapper.find(Tag).length).toBe(2);
  });
})
