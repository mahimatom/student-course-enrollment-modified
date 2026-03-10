import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightLimited',
  standalone: true
})
export class HighlightLimitedPipe implements PipeTransform {
  transform(seats: number, threshold: number = 2): string {
    if (seats <= threshold) {
      return `${seats} (Limited!)`;
    }
    return seats.toString();
  }
}
