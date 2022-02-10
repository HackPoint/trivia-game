import { TestBed } from '@angular/core/testing';

import { TriviaService } from './trivia.service';
import { ApiService } from '@api/services';
import { QuestionModel, TriviaQuestionsStore } from '../stores/trivia-questions.store';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import DoneCallback = jest.DoneCallback;


describe('TriviaService', () => {
  let service: TriviaService;
  let store: TriviaQuestionsStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        ApiService
       ]
    });
    service = TestBed.inject(TriviaService);
    store = TestBed.inject(TriviaQuestionsStore);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('store should be defined', () => {
    expect(store).toBeTruthy();
  });

  it('should load all questions without duplicates', (done: DoneCallback) => {
    httpMock = TestBed.inject(HttpTestingController);

    service.getQuestions().subscribe((questions: QuestionModel[]) => {
      expect(questions).not.toBe(null);
      expect(questions.length).toBe(10);
      done();
    });

    /*const req = httpMock
      .expectOne(`https://opentdb.com/api.php?amount=1&encode=base64&type=multiple`);
    req.flush(QUESTIONS_STORE_DATA[0]);
    done();*/
  });
});
