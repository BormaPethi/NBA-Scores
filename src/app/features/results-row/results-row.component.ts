import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LogoPipe } from 'src/app/shared/pipes/logo.pipe';

@Component({
  selector: 'app-results-row',
  standalone: true,
  imports: [CommonModule, LogoPipe],
  template: `<ng-container *ngIf="results">
    <img [src]="results.home_team | logo" class="logo" />
    <span class="bold">{{ results.home_team }}</span>
    {{ results.home_score }} - {{ results.visitor_score }}
    <span class="bold">{{ results.visitor_team }}</span>
    <img [src]="results.visitor_team | logo" class="logo" />
  </ng-container> `,
  styles: ['.logo { height: 50px; width: 50px }', '.bold { font-weight: 700; }'],
})
export class ResultsRowComponent {
  @Input() results!: { home_team: string; home_score: number; visitor_team: string; visitor_score: number };

  constructor() {}
}
