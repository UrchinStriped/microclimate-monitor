import React, { Component } from 'react';
import { map, repeat, takeUntil, throttle, timeoutWith } from 'rxjs/operators';
import { combineLatest, interval, Observable, of, Subject } from 'rxjs';

import { DataLoggerField } from '..';
import { DataService } from '../../services';

import './DataLogger.styles.scss';

interface DataLoggerProps {
 // Todo: implement props interface if needed
}

interface DataLoggerValues {
  temperature: number | null;
  humidity: number | null;
  airPressure: number| null;
}

interface DataLoggerState extends DataLoggerValues {
  unmount$: Subject<boolean>;
  dataService: DataService;
}

export class DataLogger extends Component<DataLoggerProps, DataLoggerState> {
  constructor(props: DataLoggerProps) {
    super(props);

    this.state = {
      dataService: new DataService(),
      unmount$: new Subject<boolean>(),
      temperature: null,
      humidity: null,
      airPressure: null,
    };
  }

  componentDidMount() {
    this.initDataStreams();
  }

  componentWillUnmount() {
    this.state.unmount$.next(true);
    this.state.unmount$.unsubscribe();
  }

  private initDataStreams(): void {
    const temperature$ = this.getDataStream(10, 40);
    const humidity$ = this.getDataStream(30, 80);
    const airPressure$ = this.getDataStream(600, 800);

    combineLatest([temperature$, humidity$, airPressure$])
      .pipe(
        throttle(() => interval(100)),
        map(([temperature, humidity, airPressure]) => ({temperature, humidity, airPressure})),
      )
      .subscribe({
        next: (values: DataLoggerValues) => this.setDataLoggerValues(values),
        error: (error: any) => console.error('Something went wrong', error),
      });
  }

  private getDataStream(minValue: number, maxValue: number): Observable<number | null> {
    const maxTimeout: number = 1000;
    const defaultValue: null = null;

    return this.state.dataService
      .getDataStream(minValue, maxValue)
      .pipe(
        timeoutWith(maxTimeout, of(defaultValue)),
        repeat(),
        takeUntil(this.state.unmount$),
      );
  }

  private setDataLoggerValues(values: DataLoggerValues): void {
    this.setState({ ...this.state, ...values });
  }

  render() {
    const { temperature, humidity, airPressure } = this.state;

    return (
      <div className="data-logger">
        <div className="data-logger__field">
          <DataLoggerField
            label="Temperature"
            value={temperature}
          />
        </div>
        <div className="data-logger__field">
          <DataLoggerField
            label="Humidity"
            value={humidity}
          />
        </div>
        <div className="data-logger__field">
          <DataLoggerField
            label="Air Pressure"
            value={airPressure}
          />
        </div>
      </div>
    );
  }
}
