import { QueryEntity } from '@datorama/akita';
import { QuestionState, TriviaQuestionsStore } from '../stores/trivia-questions.store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsQuery extends QueryEntity<QuestionState> {
  constructor(protected override readonly store: TriviaQuestionsStore) {
    super(store);
  }



}
