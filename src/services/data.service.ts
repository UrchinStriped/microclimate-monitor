import { interval, Observable, of } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';

export class DataService {
  public getDataStream(minValue: number, maxValue: number, minDelay: number = 100, maxDelay: number = 2000): Observable<number> {
    const getDelayTime: () => number = () => this.getRandomValueInRange(minDelay, maxDelay);
    const getValue: () => number = () => this.getRandomValueInRange(minValue, maxValue);

    return interval()
      .pipe(
        concatMap(() =>
          of(getValue())
            .pipe(
              delay(getDelayTime()),
            )
        ),
      );
  }

  public getRandomValueInRange(min: number, max: number): number {
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
  }
}
