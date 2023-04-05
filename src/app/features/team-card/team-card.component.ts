import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScoresService } from '../../core/providers/scores/scores.service';
import { Team } from '../../shared/models/team.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="team; else loading">
      <img [src]="nba.getTeamImgSrc(team.abbreviation)" class="logo" />
      <h3>{{ team.full_name }} [{{ team.abbreviation }}]</h3>
      <p style="font-weight: 200; font-size: 12px;">{{ team.conference }}ern conference</p>
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
      <button id="results{{ team.abbreviation }}" class="btn selectable" [routerLink]="['results', team.abbreviation]">
        See game results >>
      </button>
      <a id="remove{{ team.abbreviation }}" (click)="delete()"><img src="/assets/fermer.png" class="delete" /></a>
    </ng-container>
    <ng-template #loading><div class="lds-dual-ring" style="margin-top: 10rem;"></div></ng-template>
  `,
  styles: ['h3, p { margin: 0; }', '.logo { height: 250px; width: 250px; }'],
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
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe);
  }

  avg(key: 'scored' | 'conceded') {
    if (this.scores) return this.scores.reduce((acc, elm) => acc + elm[key], 0) / this.scores!.length;
    return 0;
  }

  delete() {
    this.deleteEvent.emit(this.teamId);
  }
}
