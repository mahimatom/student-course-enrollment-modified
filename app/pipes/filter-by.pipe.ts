import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {
  transform<T extends { name?: string; title?: string }>(items: T[], searchText: string, field: 'name' | 'title' = 'name'): T[] {
    if (!searchText || !items) {
      return items;
    }
    
    return items.filter(item => {
      const value = field === 'name' ? item.name : item.title;
      return value && value.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
