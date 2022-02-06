import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedUiModule } from '@trivia-game/shared/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedDataServicesModule } from '@trivia-game/shared/data-services';
import { SharedApiServicesModule } from '@api/services';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { TriviaService } from './state/services/trivia.service';


export function questionsProviderFactory(triviaService: TriviaService) {
  return () => triviaService.getQuestions();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedUiModule,
    SharedDataServicesModule,
    SharedApiServicesModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    TriviaService,
    { provide: APP_INITIALIZER, useFactory: questionsProviderFactory, deps: [TriviaService], multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
