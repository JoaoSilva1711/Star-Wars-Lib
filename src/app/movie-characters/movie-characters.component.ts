import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';

@Component({
  selector: 'app-movie-characters',
  templateUrl: './movie-characters.component.html',
  styleUrls: ['./movie-characters.component.scss']
})
export class MovieCharactersComponent {

  loading: boolean = true; // Loading state

  charactersImages = [
    { name: 'Luke Skywalker', image: '../../assets/images/Luke Skywalker.jpg' },
    { name: 'C-3PO', image: '../../assets/images/C-3PO.jpeg' },
    { name: 'R2-D2', image: '../../assets/images/R2-D2.jpg' },
    { name: 'Darth Vader', image: '../../assets/images/Darth Vader.png' },
    { name: 'R5-D4', image: '../../assets/images/R5-D4.jpg' },
    { name: 'Leia Organa', image: '../../assets/images/Leia Organa.jpg' },
    { name: 'Owen Lars', image: '../../assets/images/Owen Lars.jpg' },
    { name: 'Beru Whitesun lars', image: '../../assets/images/Beru Whitesun lars.jpg' },
    { name: 'Biggs Darklighter', image: '../../assets/images/Biggs Darklighter.jpg' },
    { name: 'Obi-Wan Kenobi', image: '../../assets/images/Obi-Wan Kenobi.jpeg' },
    // Add more image data for other characters
  ];
  characters$: Observable<any[]>; // Observable array of characters
  
  constructor(private http: HttpClient) {
    this.characters$ = this.http.get<any>('https://swapi.dev/api/people/').pipe(
      map(data => this.combineCharacterData(data.results)),
      finalize(() => this.loading = false) // Set loading to false when data is received
    );
  }
  
  getImageUrl(characterName: string): string {
    const matchingCharacter = this.charactersImages.find(character => character.name === characterName);
    return matchingCharacter ? matchingCharacter.image : '';
  }

  combineCharacterData(charactersData: any[]): any[] {
    return charactersData.map(character => {
      const imageUrl = this.getImageUrl(character.name);
      return { ...character, image: imageUrl };
    });
  }

  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.opacity = '1'; // Set the opacity to 1 when the image is loaded
  }



}
