import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./app/features/tracker/tracker.component').then(m => m.TrackerComponent) },
  {
    path: 'results/:teamCode',
    loadComponent: () => import('./app/features/results/results.component').then(m => m.ResultsComponent),
  },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)],
}).catch(err => console.error(err));
