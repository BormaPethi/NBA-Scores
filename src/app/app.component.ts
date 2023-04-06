import { Component } from '@angular/core';
import { TrackerComponent } from './features/tracker/tracker.component';
import { TeamListComponent } from './features/team-list/team-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrackerComponent, TeamListComponent],
  template: `<h1>NBA Scores</h1>
    <router-outlet></router-outlet>`,
})
export class AppComponent {}
