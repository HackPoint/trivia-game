import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
  takeWhile,
  timer
} from 'rxjs';
import { QuestionModel } from './state/stores/trivia-questions.store';
import { QuestionsQuery } from './state/queries/questions.query';
import { Carousel } from 'primeng/carousel';
import { TriviaService } from './state/services/trivia.service';

const COUNTER_TIMEOUT = 20;

@Component({
  selector: 'tg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private answer!: string;

  private readonly questionsSubject = new BehaviorSubject<QuestionModel[]>([]);
  private readonly updateCountDownState$ = new BehaviorSubject<number>(COUNTER_TIMEOUT);
  private readonly destroyed$: Subject<void> = new Subject();
  private timer$: Subscription = new Subscription();

  title = 'trivia';
  active = false;
  timeout!: number;

  @ViewChild('carousel') carousel!: Carousel;

  get questions$(): Observable<QuestionModel[]> {
    return this.questionsSubject.asObservable();
  }

  constructor(private readonly questionsQuery: QuestionsQuery,
              private readonly triviaService: TriviaService) {
  }

  ngAfterViewInit(): void {
    this.runTimer(COUNTER_TIMEOUT);

    this.updateCountDownState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((currentTimeout: number) => {
        const currentQuestion = this.getCurrentQuestion();
        currentQuestion.timeOut = currentTimeout;
        if (currentTimeout === 0) {
          currentQuestion.closedQuestion = true;
          currentQuestion.timeOut = 0;
          this.nextPage();
        }
        this.triviaService.updateState(currentQuestion);
      });
  }

  ngOnInit(): void {
    this.questionsQuery.selectAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((questions) => {
        this.questionsSubject.next(questions);
      });

  }

  handleAnswer(answer: string, question: QuestionModel) {
    this.answer = answer;
    const currentQuestion: QuestionModel
      = {
      ...question
    };
    this.triviaService.updateState(currentQuestion);
  }

  onPage($event: { readonly page: number }) {
    // reset timer or load it if the user passed on question
    // on each page transition update timer to it's initial state...
    this.clearTimeout();
    const question$ = this.questionsQuery.selectEntity($event.page);
    question$
      .pipe(
        takeUntil(this.destroyed$),
        take(1)
      )
      .subscribe((question?: QuestionModel | undefined) => {
        if (question && !question.closedQuestion) {
          this.timeout = question.timeOut;
          if (!question.closedQuestion) {
            // spin up the countdown timer
            this.runTimer(question.timeOut);
          }
        } else if (question?.closedQuestion) {
          this.timeout = 0;
        }
      });
  }

  validateAnswer() {
    const current = this.carousel.page;
    const last = this.carousel.value.length;
    const currentQuestion = this.getCurrentQuestion();

    if (this.answer === currentQuestion.correctAnswer
      && (currentQuestion.strikes > 0 && currentQuestion.strikes <= 3)) {
      // update state
      currentQuestion.closedQuestion = true;
      // go to next question
      if (current < last) {
        this.answer = '';
        this.nextPage();
      }
    } else {
      currentQuestion.strikes--;
      if (currentQuestion.strikes === 0) {
        this.nextPage();
      }
    }
    this.triviaService.updateState(currentQuestion);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private runTimer(counter: number) {
    this.timer$ = timer(0, 1000)
      .pipe(
        takeUntil(this.destroyed$),
        delay(1000),
        take(counter + 1),
        map(t => counter - t),
        takeWhile(() => counter > 0)
      )
      .subscribe((value => {
        this.timeout = value;
        this.updateCountDownState$.next(value);
      }));
  }

  private getCurrentQuestion(): QuestionModel {
    const current = this.carousel.page;
    return {
      ...this.carousel.value[current]
    };
  }

  private nextPage() {
    const current = this.carousel.page;
    this.carousel.navForward(current + 1);
  }

  private clearTimeout() {
    if (this.timer$) {
      this.timer$.unsubscribe();
      this.timer$ = new Subscription();
    }
  }
}
