import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface QuestionModel {
  id: ID;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  timeOut: number;
  strikes: number;
  closedQuestion: boolean;
  active: boolean;
  allAnswers: string[];
}

export type QuestionState = EntityState<QuestionModel>

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'questions' })
export class TriviaQuestionsStore extends EntityStore<QuestionState> {
  constructor() {
    super();
  }

  updateAnswer(model: QuestionModel) {
    this.update(model.id, ({
      ...model,
    }));

  }

}
