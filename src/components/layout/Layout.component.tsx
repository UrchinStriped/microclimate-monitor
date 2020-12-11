import React, { FC } from 'react';

import './Layout.styles.scss';

export const Layout: FC = ({ children }) => (
  <div className="layout">
    <div className="layout__inner">
      { children }
    </div>
  </div>
);
