import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TriviaQuestionApi } from '@api/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly queryUrl = 'https://opentdb.com/api.php?amount=1&encode=base64&type=multiple';

  constructor(private readonly httpService: HttpClient) {
  }

  getQuestion(): Observable<TriviaQuestionApi> {
    return this.httpService.get(this.queryUrl)
      .pipe(
        map((response: any) => {
          const { results } = response;
          return {
            question: atob(results[0].question),
            correctAnswer: atob(results[0].correct_answer),
            incorrectAnswers: results[0]
              .incorrect_answers
              .map((incorrect: string) => atob(incorrect))
          } as TriviaQuestionApi;
        })
      );
  }
}
