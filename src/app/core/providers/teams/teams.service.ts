import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pagination } from 'src/app/shared/models/pagination.type';
import { Team } from 'src/app/shared/models/team.type';
import { NBAAPIService } from '../nba-api/nba-api.service';

const TRACK_FIELD_NAME = 'trackedTeams';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  teams$ = new BehaviorSubject(this.getTrackedTeams());

  constructor(private readonly api: NBAAPIService) {}

  public getAllTeams(): Observable<Pagination<Team>> {
    return this.api.get<Pagination<Team>>('teams');
  }

  public trackTeam(teamId: string): void {
    const storage = localStorage.getItem(TRACK_FIELD_NAME);
    const storedTeams: string[] = storage ? JSON.parse(storage) : [];

    storedTeams.push(teamId);
    localStorage.setItem(TRACK_FIELD_NAME, JSON.stringify(storedTeams));
    this.teams$.next(storedTeams);
  }

  public getTrackedTeams(): string[] {
    const storedTeams = localStorage.getItem(TRACK_FIELD_NAME);
    return storedTeams ? JSON.parse(storedTeams) : [];
  }

  public untrackTeam(teamId: string) {
    const storedTeams = this.getTrackedTeams().filter(t => t !== teamId);

    localStorage.setItem(TRACK_FIELD_NAME, JSON.stringify(storedTeams));
    this.teams$.next(storedTeams);
  }
}
