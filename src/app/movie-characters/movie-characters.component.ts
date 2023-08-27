import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';

@Component({
  selector: 'app-movie-characters',
  templateUrl: './movie-characters.component.html',
  styleUrls: ['./movie-characters.component.scss']
})
export class MovieCharactersComponent{

  @ViewChild('characterCard') characterCardRef!: ElementRef;
  
  loading: boolean = true; // Loading state
  selectedCharacter: any | null = null;

  charactersImages = [
    { name: 'Luke Skywalker', image: '../../assets/images/Luke Skywalker.jpg' },
    { name: 'C-3PO', image: '../../assets/images/C-3PO.png' },
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
  

  get isInfoScrollable(): boolean {
    const infoContainer = document.getElementById('infoContainer');
    return infoContainer ? infoContainer.scrollHeight > infoContainer.clientHeight : false;
  }

  

  toggleCharacterInfo(character: any): void {
    character.showAdditionalInfo = !character.showAdditionalInfo;

    if (character.showAdditionalInfo) {
      this.selectedCharacter = character;
      this.scrollToCharacterCard();
    } else {
      this.selectedCharacter = null;
    }
  }

  // toggleCharacterInfo(character: any) {
  //   character.showAdditionalInfo = !character.showAdditionalInfo;
  //   // Toggle "show-info" class on expanded-character-card
  //   this.selectedCharacter.showInfo = character.showAdditionalInfo;
  // }


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

   // Method to toggle the visibility of additional info
  //  toggleAdditionalInfo(character: any): void {
  //   character.showAdditionalInfo = !character.showAdditionalInfo;
  // }


  // toggleCharacterInfo(character: any): void {
  //   character.showAdditionalInfo = !character.showAdditionalInfo;
  
  //   // Scroll the selected card into view when additional info is shown
  //   if (character.showAdditionalInfo) {
  //     this.scrollToCharacterCard();
  //   }
  // }
  
  scrollToCharacterCard(): void {
    if (this.characterCardRef && this.characterCardRef.nativeElement) {
      this.characterCardRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    }
  }



}
