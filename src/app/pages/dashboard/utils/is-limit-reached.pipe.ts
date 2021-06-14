import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLimitReached'
})

export class IsLimitReachedPipe implements PipeTransform {

  transform(items: any[] | null, limit: number): boolean {
    if (!items) {
      return false
    }

    const [firstValue, secondValue] = items
    const total = [...firstValue, ...secondValue]

    return total.length > limit
  }
}