import React from 'react';
import { configure, shallow } from 'enzyme';
import TopBar from './TopBar';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<TopBar />', () => {

  it('renders a `.top-bar` with correct title "TMDb Showcase"', () => {
    const wrapper = shallow(<TopBar />);
    const tags = wrapper.find('.top-bar');
    expect(tags.length).toBe(1);
    expect(tags.first().text()).toBe('TMDb Showcase');
  });
})
