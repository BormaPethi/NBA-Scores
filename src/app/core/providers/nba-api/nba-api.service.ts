import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const NBA_API_PATH = 'https://free-nba.p.rapidapi.com';

@Injectable({
  providedIn: 'root',
})
export class NBAAPIService {
  apiRequiredHeaders = new HttpHeaders({
    'X-RapidAPI-Key': '996876646bmsh6c517681dfb68aap13b155jsn4c5747923a8b',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  });

  constructor(private readonly http: HttpClient) {}

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${NBA_API_PATH}/${path}`, { headers: this.apiRequiredHeaders, params: params });
  }
}
