import { Injectable } from '@angular/core';
import { ApiService } from '@api/services';
import { QuestionModel, TriviaQuestionsStore } from '../stores/trivia-questions.store';
import { finalize, interval, map, mergeMap, Observable, takeWhile, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  constructor(
    private readonly api: ApiService,
    private readonly triviaStore: TriviaQuestionsStore
  ) {
  }

  getQuestions(): Observable<QuestionModel[]> {
    const questions: QuestionModel[] = [];
    return interval(300)
      .pipe(
        mergeMap(() => this.api.getQuestion()),
        map(res => {
          if (questions.findIndex(value => value.question === res.question) === -1) {
            questions.push({
              id: questions.length,
              question: res.question,
              correctAnswer: res.correctAnswer,
              incorrectAnswers: res.incorrectAnswers,
              timeOut: 20,
              strikes: 3,
              closedQuestion: false,
              active: false,
              allAnswers: [
                res.correctAnswer,
                ...res.incorrectAnswers
              ].map(value => ({ value, sort: Math.random() }))
                .sort((
                  a,
                  b) => a.sort - b.sort)
                .map(({ value }) => value)
            });
          }
          return res as QuestionModel;
        }),
        takeWhile(() => questions.length < 10),
        toArray(),
        finalize(() => {
          this.triviaStore.set(questions);
          this.triviaStore.setLoading(false);
        })
      );
  }

  updateState(model: QuestionModel): void {
    this.triviaStore.updateAnswer(model);
  }

}
