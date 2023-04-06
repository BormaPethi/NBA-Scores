import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../../shared/models/team.type';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TeamsService } from '../../core/providers/teams/teams.service';
import { TeamListComponent } from '../team-list/team-list.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, TeamListComponent],
  template: `<div class="flex-col">
    <div class="flex-row">
      <select id="teamSelect" class="slct selectable" [(ngModel)]="selectedTeam">
        <option value="-1">-- Select a team --</option>
        <option *ngFor="let team of teams" [value]="team.id">{{ team.full_name }}</option>
      </select>
      <button
        id="trackBtn"
        class="btn selectable"
        (click)="nba.trackTeam(selectedTeam)"
        [disabled]="selectedTeam === '-1'">
        Track
      </button>
    </div>
    <app-team-list class="flex-list"></app-team-list>
  </div> `,
})
export class TrackerComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  subs: Subscription[] = [];
  selectedTeam = '-1';

  constructor(public readonly nba: TeamsService) {}

  ngOnInit() {
    this.subs.push(this.nba.getAllTeams().subscribe(result => (this.teams = result.data)));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe);
  }
}
