import * as React from 'react';
import { shallow } from 'enzyme';

import { Content } from './content';

const defaultProps = {
  children: <span />,
};

describe('Content', () => {
  it('should have correct styles align is right', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="right"
        showGroupingControls
      />
    ));
    expect(tree.prop('style'))
      .toMatchObject({
        justifyContent: 'flex-end',
      });
  });

  it('should have correct styles align is center', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="center"
        showGroupingControls
      />
    ));
    expect(tree.prop('style'))
      .toMatchObject({
        justifyContent: 'center',
      });
  });

  it('should apply custom styles', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));
    expect(tree.prop('style'))
      .toMatchObject({
        justifyContent: 'flex-start',
      });
  });

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.prop('data'))
      .toMatchObject({
        a: 1,
      });
  });
});
