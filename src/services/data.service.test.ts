import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { first, timeInterval } from 'rxjs/operators';
import { TimeInterval } from 'rxjs/src/internal/operators/timeInterval';

describe('Data Service', () => {
  const dataService: DataService = new DataService();

  describe('getRandomValueInRange', () => {
    const getListOfNumbers = (min: number, max: number, size: number = 100) => {
      return Array(size).fill(true).map(() => dataService.getRandomValueInRange(min, max));
    }

    it('should return a list of numbers', () => {
      const numbers: number[] = getListOfNumbers(1, 10);
      const isOnlyNumbers: boolean = numbers.every(number => Number.isInteger(number));

      expect(isOnlyNumbers).toBeTruthy();
    });

    it('should not create a value less than min', () => {
      const numbers: number[] = getListOfNumbers(10, 20);
      const isMinLimitCorrect: boolean = numbers.every(number => number >= 10);

      expect(isMinLimitCorrect).toBeTruthy();
    });

    it('should not create a value bigger than max', () => {
      const numbers: number[] = getListOfNumbers(10, 20);
      const isMaxLimitCorrect: boolean = numbers.every(number => number <= 20);

      expect(isMaxLimitCorrect).toBeTruthy();
    });

    it('should generate min value', () => {
      const numbers: number[] = getListOfNumbers(10, 20, 1000);

      expect(numbers.includes(10)).toBeTruthy();
    });

    it('should generate max value', () => {
      const numbers: number[] = getListOfNumbers(10, 20, 1000);

      expect(numbers.includes(20)).toBeTruthy();
    });

    it('should return random values', () => {
      const numbers: number[] = getListOfNumbers(1, 3);
      /**
       * According to the theory of probability, when filling an array with random numbers from 1 to 3,
       * each of them will not occur more often than 33%. Due to the small length of the array,
       * we will accept for comparison half the length.
       */
      const halfLengthOfNumbers: number = numbers.length / 2;
      const countOccurrences = (array: number[], value: number) => {
        return array.reduce((acc: number, currentValue: number) => (currentValue === value ? acc + 1 : acc), 0);
      }

      expect(countOccurrences(numbers, 1)).toBeLessThan(halfLengthOfNumbers);
      expect(countOccurrences(numbers, 2)).toBeLessThan(halfLengthOfNumbers);
      expect(countOccurrences(numbers, 3)).toBeLessThan(halfLengthOfNumbers);
    });
  });

  describe('getDataStream', () => {
    it('should return Observable', () => {
      const source$ = dataService.getDataStream(10, 100);

      expect(source$ instanceof Observable).toBeTruthy();
    });

    it('observable should emit numeric value', (done) => {
      const source$ = dataService.getDataStream(10, 100);

      source$
        .pipe(
          first(),
        )
        .subscribe((value: number) => {
          expect(Number.isInteger(value)).toBeTruthy();
          done();
        });
    });

    it('delay should be in the given range', (done) => {
      const source$: Observable<number> = dataService.getDataStream(10, 100, 100, 200);

      source$
        .pipe(
          timeInterval(),
        )
        .subscribe((timer: TimeInterval<number>) => {
          expect(timer.interval).toBeGreaterThanOrEqual(100);
          expect(timer.interval).toBeLessThanOrEqual(200);
          done();
        });
    });
  });
});
