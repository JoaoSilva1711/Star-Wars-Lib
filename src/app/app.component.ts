import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StarWarsLib';

  playHoverSound() {
    const audio = document.getElementById('hoverSound') as HTMLAudioElement;
    audio.play();
  }

  
}
