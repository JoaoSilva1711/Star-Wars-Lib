import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCharactersComponent } from './movie-characters.component';

describe('MovieCharactersComponent', () => {
  let component: MovieCharactersComponent;
  let fixture: ComponentFixture<MovieCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCharactersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
