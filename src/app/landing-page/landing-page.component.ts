import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  playHoverSound() {
    const audio = document.getElementById('hoverSound') as HTMLAudioElement;
    audio.play();
  }
  
}
