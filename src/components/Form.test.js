import React from 'react';
import renderer from 'react-test-renderer';
import Form from './Form';

describe('Counter', () => {
  let component = null;

  // it이 가장 작은 단위. expect를 통해 예상하는 값 확인
  // describe > it
  it('renders correctly', () => {
    component = renderer.create(<Form />);
  });

  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
