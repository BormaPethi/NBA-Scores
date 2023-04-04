import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/shared/models/pagination.type';
import { Team } from 'src/app/shared/models/team.type';
import { NBAAPIService } from '../nba-api/nba-api.service';

const TRACK_FIELD_NAME = 'trackedTeams';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private readonly api: NBAAPIService) {}

  public getAllTeams(): Observable<Pagination<Team>> {
    return this.api.get<Pagination<Team>>('teams');
  }

  public trackTeam(teamId: string): void {
    const storedTeams = localStorage.getItem(TRACK_FIELD_NAME);
    if (!storedTeams) localStorage.setItem(TRACK_FIELD_NAME, JSON.stringify([teamId]));
    else localStorage.setItem(TRACK_FIELD_NAME, JSON.stringify([teamId, ...JSON.parse(storedTeams)]));
  }

  public getTrackedTeams(): string[] {
    const storedTeams = localStorage.getItem(TRACK_FIELD_NAME);
    return storedTeams ? JSON.parse(storedTeams) : [];
  }
}
