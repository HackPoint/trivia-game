import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

const questions = [
  {
    'question': 'In Black Hammer, what dimension does Colonel Weird travel through?',
    'correctAnswer': 'Para-Zone',
    'incorrectAnswers': [
      'Hyperspace',
      'Mirror Universe',
      'Phantom Zone'
    ]
  },
  {
    'question': 'Which of these Roman gods doesn\'t have a counterpart in Greek mythology?',
    'correctAnswer': 'Janus',
    'incorrectAnswers': [
      'Vulcan',
      'Juno',
      'Mars'
    ]
  },
  {
    'question': 'America\'s Strategic Defense System during the Cold War was nicknamed after this famous movie.',
    'correctAnswer': 'Star Wars',
    'incorrectAnswers': [
      'Jaws',
      'Blade Runner',
      'Alien'
    ]
  }
];
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NxWelcomeComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'trivia'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('trivia');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome trivia'
    );
  });
});
