import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logo',
  standalone: true,
})
export class LogoPipe implements PipeTransform {
  transform(code: string): string {
    return `https://interstate21.com/nba-logos/${code}.png`;
  }
}
