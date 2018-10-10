import React from 'react';
import { configure, shallow } from 'enzyme';

import App from './App';
import TopBar from '../TopBar';
import MovieList from '../MovieList';
import Adapter from 'enzyme-adapter-react-16/build'

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders a <TopBar /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(TopBar).length).toBe(1);
  });

  it('renders a <MovieList /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(MovieList).length).toBe(1);
  });

  it('renders an `.app`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toBe(1);
  });
})
