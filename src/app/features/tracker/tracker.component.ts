import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../../shared/models/team.type';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TeamsService } from '../../core/providers/teams/teams.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="flex-row">
    <select id="teamSelect" class="teamSelect selectable" [(ngModel)]="selectedTeam">
      <option value="-1">-- Select a team --</option>
      <option *ngFor="let team of teams" [value]="team.id">{{ team.full_name }}</option>
    </select>
    <button
      id="trackBtn"
      class="trackBtn selectable"
      (click)="nba.trackTeam(selectedTeam)"
      [disabled]="selectedTeam === '-1'">
      Track
    </button>
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
