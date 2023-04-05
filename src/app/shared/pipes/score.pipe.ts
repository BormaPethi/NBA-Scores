import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score',
  standalone: true,
})
export class ScorePipe implements PipeTransform {
  transform(score: { home_team: string; home_score: number; visitor_team: string; visitor_score: number }): string {
    return `${score.home_team} ${score.home_score} - ${score.visitor_score} ${score.visitor_team}`;
  }
}
