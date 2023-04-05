import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TrackerComponent } from './features/tracker/tracker.component';
import { TeamListComponent } from './features/team-list/team-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppRoutingModule, TrackerComponent, TeamListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
