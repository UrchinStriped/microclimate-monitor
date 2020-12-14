import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ReactNode } from 'react';

import { Layout } from './Layout.component';


describe('Layout Component', () => {
  const getWrapper = (children: ReactNode = null) => {
    return shallow(<Layout>{children}</Layout>);
  }

  it('should be rendered without errors', () => {
    const wrapper: ShallowWrapper = getWrapper();
    expect(wrapper).toBeDefined();
  });

  it('should render content correctly', () => {
    const content: ReactNode = <div className="test-content">Test content</div>;
    const wrapper: ShallowWrapper = getWrapper(content);
    expect(wrapper.find('.test-content')).toHaveLength(1);
  })
});
