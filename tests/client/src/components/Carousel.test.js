import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Carousel from '../../../../client/src/components/Carousel';


describe('Carousel', () => {
  it('Should contain div', () => {
    const wrapper = shallow(<Carousel />);
    expect(wrapper.find('div')).toExist();
  });
});
