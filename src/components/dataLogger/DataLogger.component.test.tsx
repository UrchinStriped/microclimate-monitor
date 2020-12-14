import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { DataLogger } from './DataLogger.component';

describe('DataLogger component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<DataLogger />);
  });

  it('should be rendered without errors', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render three DataLoggerField components', () => {
    expect(wrapper.find('DataLoggerField')).toHaveLength(3);
  });

  it('should call initDataStreams on componentDidMount', () => {
    const instance: any = wrapper.instance();
    const spyInitDataStreams = jest.spyOn(instance, 'initDataStreams');

    instance.componentDidMount();

    expect(spyInitDataStreams).toHaveBeenCalled();
  });
});
