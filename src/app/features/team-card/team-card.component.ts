import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoPipe } from 'src/app/shared/pipes/logo.pipe';
import { ScoresService } from '../../core/providers/scores/scores.service';
import { Team } from '../../shared/models/team.type';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoPipe],
  template: `
    <ng-container *ngIf="team; else loading">
      <img [src]="team.abbreviation | logo" class="logo" />
      <h3>{{ team.full_name }} [{{ team.abbreviation }}]</h3>
      <p style="font-weight: 200; font-size: 12px;">{{ team.conference }}ern conference</p>
      <ng-container *ngIf="scores && scores.played.length > 0; else noPlayed">
        <div class="flex-col-stretch">
          <div class="flex-row">
            <div
              class="tag"
              *ngFor="let played of scores.played"
              [style.background-color]="played === 'W' ? 'green' : 'red'">
              {{ played }}
            </div>
          </div>
          <div>Avg pts scored: {{ scores.scored / scores.played.length | number : '1.0-0' }}</div>
          <div>Avg pts conceded: {{ scores.conceded / scores.played.length | number : '1.0-0' }}</div>
        </div>
      </ng-container>
      <ng-template #noPlayed>No game to show.</ng-template>
      <button id="results{{ team.abbreviation }}" class="btn selectable" [routerLink]="['results', team.abbreviation]">
        See game results >>
      </button>
      <a id="remove{{ team.abbreviation }}" class="remove" (click)="deleteEvent.emit(this.teamId)"
        ><img src="/assets/close.svg"
      /></a>
    </ng-container>
    <ng-template #loading><div class="lds-dual-ring" style="margin-top: 10rem;"></div></ng-template>
  `,
  styles: [
    'h3, p { margin: 0; }',
    '.logo { height: 250px; width: 250px; }',
    '.remove { position: absolute; top: 5px; right: 5px; cursor: pointer; }',
  ],
})
export class TeamCardComponent implements OnInit, OnDestroy {
  @Input() teamId!: string;
  @Output() deleteEvent = new EventEmitter<string>();

  team: Team | undefined;
  scores: { scored: number; conceded: number; played: ('W' | 'L')[] } | undefined;
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
}
