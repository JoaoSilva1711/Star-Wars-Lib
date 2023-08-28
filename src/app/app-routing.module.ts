import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCharactersComponent } from './movie-characters/movie-characters.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to landing-page
  { path: 'home', component: LandingPageComponent },
  { path: 'movie-characters', component: MovieCharactersComponent },
  // Define other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
