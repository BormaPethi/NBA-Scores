import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeamsService } from 'src/app/core/providers/teams/teams.service';
import { TeamCardComponent } from '../team-card/team-card.component';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, TeamCardComponent],
  template: `<ng-container *ngIf="nba.teams$ | async as trackedIds">
    <div *ngFor="let trackedId of trackedIds">
      <app-team-card
        [teamId]="trackedId"
        (deleteEvent)="nba.untrackTeam($event)"
        class="flex-col-stretch card"></app-team-card>
    </div>
  </ng-container>`,
})
export class TeamListComponent {
  constructor(public readonly nba: TeamsService) {}

  ngOnInit() {
    this.nba.teams$.subscribe(v => console.log(v));
    console.log(this.nba.getTrackedTeams());
  }
}
