export interface TriviaQuestionApi {
  readonly question: string;
  readonly correctAnswer: string;
  readonly incorrectAnswers: string[];
}
