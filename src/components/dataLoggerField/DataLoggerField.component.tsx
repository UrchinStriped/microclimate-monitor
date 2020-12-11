import React, { FC } from 'react';

import './DataLoggerField.styles.scss'

interface DataLoggerFieldProps {
  label: string;
  value: number | null;
}

export const DataLoggerField: FC<DataLoggerFieldProps> = ({ label, value }) => {
  const displayedValue: string | number = value === null ? 'N/A' : value;

  return (
    <div className="data-logger-field">
      <div className="data-logger-field__label">
        { label }
      </div>
      <div className="data-logger-field__value">
        { displayedValue }
      </div>
    </div>
  );
}
