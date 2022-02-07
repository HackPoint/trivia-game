import { TestBed } from '@angular/core/testing';

import { TriviaService } from './trivia.service';
import { ApiService } from '@api/services';
import { QuestionModel, TriviaQuestionsStore } from '../stores/trivia-questions.store';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QUESTIONS_STORE_DATA } from './mock';
import { of } from 'rxjs';
import DoneCallback = jest.DoneCallback;


describe('TriviaService', () => {
  let service: TriviaService;
  let store: TriviaQuestionsStore;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        ApiService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TriviaService);
    store = TestBed.inject(TriviaQuestionsStore);

    jest.spyOn(service, 'getQuestions')
      .mockReturnValue(of(QUESTIONS_STORE_DATA));
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('store should be defined', () => {
    expect(store).toBeTruthy();
  });

  it('should load all questions without duplicates', (done: DoneCallback) => {
    service.getQuestions().subscribe((questions: QuestionModel[]) => {
      expect(questions).not.toBe(null);
      expect(questions.length).toBe(2);
      done();
    });
  });

});
