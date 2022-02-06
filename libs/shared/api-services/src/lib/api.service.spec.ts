import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TriviaQuestionApi } from '@api/interfaces';
import DoneCallback = jest.DoneCallback;


const mockResponse = {
  'response_code': 0,
  'results': [
    {
      'category': 'RW50ZXJ0YWlubWVudDogVGVsZXZpc2lvbg==',
      'type': 'bXVsdGlwbGU=',
      'difficulty': 'ZWFzeQ==',
      'question': 'V2hhdCBOQkMgc2l0Y29tIG9uY2Ugc2F3IHR3byBvZiBpdHMgY2hhcmFjdGVycyB0cnkgdG8gcGl0Y2ggTkJDIG9uIGEgc2l0Y29tIGFib3V0IG5vdGhpbmc/',
      'correct_answer': 'U2VpbmZlbGQ=',
      'incorrect_answers': [
        'RnJhc2llcg==',
        'QmVja2Vy',
        'RnJpZW5kcw=='
      ]
    }
  ]
};


describe('ApiServiceService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return question', (done: DoneCallback) => {
    service.getQuestion().subscribe((res: TriviaQuestionApi) => {
      expect(res).not.toBe(null);
      expect(res.question).toEqual('What NBC sitcom once saw two of its characters try to pitch NBC on a sitcom about nothing?');
      done();
    });

    const req = httpTestingController
      .expectOne(`https://opentdb.com/api.php?amount=1&encode=base64&type=multiple`);
    req.flush(mockResponse);
  });

});
