import React from 'react';
import { configure, shallow } from 'enzyme';
import Tag from './Tag';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Tag />', () => {

  it('renders a `.tag` with correct text', () => {
    const wrapper = shallow(<Tag text="Comedy" />);
    const tags = wrapper.find('.tag');
    expect(tags.length).toBe(1);
    expect(tags.first().text()).toBe('Comedy');
  });
})
