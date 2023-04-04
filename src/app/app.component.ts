import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TrackerComponent } from './features/tracker/tracker.component';
import { TeamCardComponent } from './features/team-card/team-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppRoutingModule, TrackerComponent, TeamCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
