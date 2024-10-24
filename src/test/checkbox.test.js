import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Checkbox from '../components/Checkbox';

// Rendering Tests

it('renders the checkbox', () => {
  const wrapper = shallow(<Checkbox id="checkbox-test" />);
  expect(wrapper.find('div.input-checkbox')).toHaveLength(1);
});

it('renders the checkbox value', () => {
  const wrapper = shallow(<Checkbox id="checkbox-test" checked />);
  expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
});

it('renders the label', () => {
  const wrapper = shallow(<Checkbox id="checkbox-test" label="test-checkbox" />);
  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('test-checkbox');
});

it('applies the prop className', () => {
  const wrapper = shallow(<Checkbox id="checkbox-test" className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Checkbox id="testCheckboxId" />);
  expect(wrapper.find('#testCheckboxId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<Checkbox id="checkbox-test" disabled />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('renders the round state', () => {
  const wrapper = shallow(<Checkbox id="checkbox-test" round />);
  expect(wrapper.find('label').hasClass('input-checkbox__label--round')).toBeTruthy();
});

// Event Tests

it('triggers onFocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Checkbox id="checkbox-test" onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when blurred', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Checkbox id="checkbox-test" onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('blur');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when changed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Checkbox id="checkbox-test" onChange={mockEvent} />);
  
  // Simulate a change event on the checkbox input
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(mockEvent).toHaveBeenCalledWith(true);
});

it('triggers onChange when pressing Enter key', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Checkbox id="checkbox-test" onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
  expect(mockEvent).toHaveBeenCalled();
  expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
});

it('triggers onBlur when blurring', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Checkbox id="checkbox-test" onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('blur', { key: 'Tab', keyCode: 9, which: 9 });
  expect(mockEvent).toHaveBeenCalled();
});

// Snapshot Test

it('renders the checkbox correctly when multiple props are set', () => {
  const wrapper = shallow(<Checkbox id="test-id" checked />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
