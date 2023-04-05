import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScoresService } from '../../core/providers/scores/scores.service';
import { Team } from '../../shared/models/team.type';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="team">
      <img [src]="nba.getTeamImgSrc(team.abbreviation)" class="logo" />
      <h2>{{ team.full_name }} [{{ team.abbreviation }}]</h2>
      <p>{{ team.conference }}ern conference</p>
      <div class="flex-col-stretch">
        <ng-container *ngIf="scores">
          <div class="flex-row">
            <div
              class="tag"
              *ngFor="let score of scores"
              [style.background-color]="score.scored > score.conceded ? 'green' : 'red'">
              {{ score.scored > score.conceded ? 'W' : 'L' }}
            </div>
          </div>
        </ng-container>
        <div>Avg pts scored: {{ avg('scored') | number : '1.0-0' }}</div>
        <div>Avg pts conceded: {{ avg('conceded') | number : '1.0-0' }}</div>
      </div>
      <button id="results{{ team.abbreviation }}" class="btn selectable">See game results >></button>
      <a id="remove{{ team.abbreviation }}" (click)="delete()"><img src="/assets/fermer.png" class="delete" /></a>
    </ng-container>
  `,
})
export class TeamCardComponent implements OnInit, OnDestroy {
  @Input() teamId!: string;
  @Output() deleteEvent = new EventEmitter<string>();

  team: Team | undefined;
  scores: { scored: number; conceded: number }[] | undefined;
  subs: Subscription[] = [];

  constructor(public readonly nba: ScoresService) {}

  ngOnInit() {
    this.subs.push(this.nba.getTeamById(this.teamId).subscribe(result => (this.team = result)));
    this.subs.push(
      this.nba.getWLbyTeam(this.teamId).subscribe(result => {
        this.scores = result;
        console.log(result.reduce((a, b) => a + b.scored, 0) / result.length);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe);
  }

  avg(key: 'scored' | 'conceded') {
    return this.scores!.reduce((acc, elm) => acc + elm[key], 0) / this.scores!.length;
  }

  delete() {
    this.deleteEvent.emit(this.teamId);
  }
}
