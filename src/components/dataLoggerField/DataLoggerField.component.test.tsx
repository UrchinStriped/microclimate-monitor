import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { DataLoggerField, DataLoggerFieldProps } from '..';

describe('DataLoggerField Component', () => {
  const getWrapper = (props: DataLoggerFieldProps) => {
    return shallow(<DataLoggerField {...props} />);
  }

  it('should be rendered without errors', () => {
    const wrapper: ShallowWrapper = getWrapper({ label: 'test', value: 1 });
    expect(wrapper).toBeDefined();
  });

  it('should render label correctly', () => {
    const label: string = 'test label';
    const wrapper: ShallowWrapper = getWrapper({ label, value: 1 });
    expect(wrapper.find('.data-logger-field__label').text()).toEqual(label);
  });

  it('should render value if it is a number', () => {
    const value: number = 100;
    const wrapper: ShallowWrapper = getWrapper({ label: 'test', value });
    const valueFromComponent: number = parseInt(wrapper.find('.data-logger-field__value').text(), 10);
    expect(valueFromComponent).toEqual(value);
  });

  it('should render "N/A" if value === null', () => {
    const wrapper: ShallowWrapper = getWrapper({ label: 'test', value: null });
    const valueFromComponent: string = wrapper.find('.data-logger-field__value').text();
    expect(valueFromComponent).toEqual('N/A');
  });
});
