import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { ScoresService } from 'src/app/core/providers/scores/scores.service';
import { TeamsService } from 'src/app/core/providers/teams/teams.service';
import { Pagination } from 'src/app/shared/models/pagination.type';
import { Team } from 'src/app/shared/models/team.type';
import { ScorePipe } from 'src/app/shared/pipes/score.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink, ScorePipe],
  template: `<div class="card flex-col-stretch">
      <div class="flex-col-stretch" *ngIf="teamScores; else loading">
        <div *ngFor="let teamScore of teamScores">{{ teamScore | score }}</div>
      </div>
      <button id="backBtn" class="btn selectable" style="margin-bottom: 1rem;" [routerLink]="['/']">
        << Back to team tracker
      </button>
    </div>
    <ng-template #loading><div class="lds-dual-ring" style="margin-top: 10rem;"></div></ng-template>`,
})
export class ResultsComponent implements OnInit, OnDestroy {
  teamScores:
    | {
        home_team: string;
        home_score: number;
        visitor_team: string;
        visitor_score: number;
      }[]
    | undefined;
  constructor(
    private readonly teams: TeamsService,
    private readonly scores: ScoresService,
    private readonly route: ActivatedRoute
  ) {}

  subs: Subscription[] = [];

  ngOnInit() {
    this.subs.push(
      this.route.paramMap
        .pipe(
          map((params: ParamMap) => params.get('teamCode')),
          mergeMap((teamCode: string | null) => {
            if (!teamCode) throw new Error('Team code not found :|');
            return this.teams
              .getAllTeams()
              .pipe(
                map(
                  (result: Pagination<Team>) =>
                    result.data.find(team => team.abbreviation === teamCode) as Team | undefined
                )
              );
          }),
          mergeMap(team => {
            if (!team) throw new Error('Team not found :|');
            return this.scores.getScoresByTeam(team.id.toString());
          })
        )
        .subscribe(scores => (this.teamScores = scores))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
