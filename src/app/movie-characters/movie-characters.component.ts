import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-characters',
  templateUrl: './movie-characters.component.html',
  styleUrls: ['./movie-characters.component.scss']
})
export class MovieCharactersComponent implements AfterViewInit{

  @ViewChild('characterCard') characterCardRef!: ElementRef;
  
  loading: boolean = true;
  selectedCharacter: any | null = null;
  characterProperties: string[] = ['height','mass', 'hair_color',
           'skin_color', 'eye_color', 'birth_year', 'gender'];
          //  'homeworld', 'films', 'species', 'vehicles', 'starships'];
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
    { name: 'Anakin Skywalker', image: '../../assets/images/Anakin Skywalker.jpg' },
    { name: 'Wilhuff Tarkin', image: '../../assets/images/Wilhuff Tarkin.jpg' }, //**** */
    { name: 'Chewbacca', image: '../../assets/images/Chewbacca.jpg' },
    { name: 'Han Solo', image: '../../assets/images/Han Solo.jpg' },
    { name: 'Greedo', image: '../../assets/images/Greedo.jpg' },
    { name: 'Jabba Desilijic Tiure', image: '../../assets/images/Jabba Desilijic Tiure.jpg' },
    { name: 'Wedge Antilles', image: '../../assets/images/Wedge Antilles.jpg' },
    { name: 'Jek Tono Porkins', image: '../../assets/images/Jek Tono Porkins.jpg' },
    { name: 'Yoda', image: '../../assets/images/Yoda.jpg' },
    { name: 'Palpatine', image: '../../assets/images/Palpatine.jpg' },
    { name: 'Boba Fett', image: '../../assets/images/Boba Fett.jpg' },
    { name: 'IG-88', image: '../../assets/images/IG-88.jpg' },
    { name: 'Bossk', image: '../../assets/images/Bossk.jpg' },
    { name: 'Lando Calrissian', image: '../../assets/images/Lando Calrissian.jpg' },
    { name: 'Lobot', image: '../../assets/images/Lobot.jpg' },
    { name: 'Ackbar', image: '../../assets/images/Ackbar.jpg' },
    { name: 'Mon Mothma', image: '../../assets/images/Mon Mothma.jpeg' },
    { name: 'Arvel Crynyd', image: '../../assets/images/Arvel Crynyd.jpeg' },
    { name: 'Wicket Systri Warrick', image: '../../assets/images/Wicket Systri Warrick.jpeg' },
    { name: 'Nien Nunb', image: '../../assets/images/Nien Nunb.jpeg' },
    { name: 'Qui-Gon Jinn', image: '../../assets/images/Qui-Gon Jinn.jpg' },
    { name: 'Nute Gunray', image: '../../assets/images/Nute Gunray.jpg' },
    { name: 'Roos Tarpals', image: '../../assets/images/Roos Tarpals.jpeg' },
    { name: 'Finis Valorum', image: '../../assets/images/Finis Valorum.jpeg' },
    { name: 'Padmé Amidala', image: '../../assets/images/Padmé Amidala.jpg' },
    { name: 'Jar Jar Binks', image: '../../assets/images/Jar Jar Binks.jpg' },
    { name: 'Rugor Nass', image: '../../assets/images/Rugor Nass.jpeg' },
    { name: 'Ric Olié', image: '../../assets/images/Ric Olié.jpeg' },
    { name: 'Watto', image: '../../assets/images/Watto.jpg' },
    { name: 'Sebulba', image: '../../assets/images/Sebulba.jpg' },
    { name: 'Quarsh Panaka', image: '../../assets/images/Quarsh Panaka.jpg' },

    { name: 'Shmi Skywalker', image: '../../assets/images/Default.jpg' },
  ];
 

  currentPage: number = 1;
  charactersPerPage: number = 10;
  totalCharacters: number = 0;
  characters: any[] = [];

  constructor(private http: HttpClient) {
    this.loadCharacters(1);
  }

  ngAfterViewInit() {
    this.loadCharacters(this.currentPage);
  }
  
  loadCharacters(page: number): void {
    this.http.get<any>(`https://swapi.dev/api/people/?page=${page}`)
      .subscribe(data => {
        if (page === 1) {
          this.totalCharacters = data.count;
          this.characters = this.combineCharacterData(data.results);
        } else {
          const charactersData = this.combineCharacterData(data.results);
          this.characters = this.characters.concat(charactersData);
        }
        this.currentPage = page;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.totalCharacters / this.charactersPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1);
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadCharacters(this.currentPage + 1);
    }
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


  getImageUrl(characterName: string): string {
    const matchingCharacter = this.charactersImages.find(character => character.name === characterName);
    if (matchingCharacter && matchingCharacter.image) {
      return matchingCharacter.image;
    } else {
      return '../../assets/images/Default.jpg'; // Return the default image URL
    }
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

  scrollToCharacterCard(): void {
    if (this.characterCardRef && this.characterCardRef.nativeElement) {
      this.characterCardRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    }
  }
}
