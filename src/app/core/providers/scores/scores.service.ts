import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Team } from 'src/app/shared/models/team.type';
import { NBAAPIService } from '../nba-api/nba-api.service';
import { Pagination } from 'src/app/shared/models/pagination.type';
import { Score } from 'src/app/shared/models/score.type';
import { HttpParams } from '@angular/common/http';
import { format, sub } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private readonly api: NBAAPIService) {}

  public getTeamById(id: string): Observable<Team> {
    return this.api.get<Team>(`teams/${id}`);
  }

  public getTeamImgSrc(abbreviation: string) {
    return `https://interstate21.com/nba-logos/${abbreviation}.png`;
  }

  private getLastGamesByTeam(teamId: string): Observable<Score[]> {
    let params = new HttpParams();
    params = params.appendAll({
      'dates[]': Array.from(Array(12).keys()).map(e => format(sub(new Date(), { days: e }), 'yyyy-MM-dd')),
    });
    params = params.append('team_ids[]', teamId);

    return this.api
      .get<Pagination<Score>>('games', params)
      .pipe(map(result => result.data.filter(game => game.status === 'Final').sort((a, b) => b.id - a.id)));
  }

  public getWLbyTeam(teamId: string) {
    return this.getLastGamesByTeam(teamId).pipe(
      map((result: Score[]) =>
        result.map(game => {
          return {
            scored: game.home_team.id.toString() === teamId ? game.home_team_score : game.visitor_team_score,
            conceded: game.home_team.id.toString() !== teamId ? game.home_team_score : game.visitor_team_score,
          };
        })
      )
    );
  }

  public getScoresByTeam(teamId: string) {
    return this.getLastGamesByTeam(teamId).pipe(
      map((result: Score[]) =>
        result.map(game => {
          return {
            home_team: game.home_team.abbreviation,
            home_score: game.home_team_score,
            visitor_team: game.visitor_team.abbreviation,
            visitor_score: game.visitor_team_score,
          };
        })
      )
    );
  }
}
