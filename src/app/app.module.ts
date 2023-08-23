import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { FormsModule } from '@angular/forms';
//import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';  
import { DobDirective } from './form-questions/mask';
import { CreateForm } from './shared/create-form.class';
import { DefineFormComponent, PopoverQuestionSelectorComponent } from './define-form/define-form.component';
import { TemplateFormService } from './shared/template-form.service';
import { FormStorageService } from './shared/form-storage.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FormQuestionsComponent } from './form-questions/form-questions.component';
import { LongPressDirective } from './shared/longPressDirective';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FormResultComponent, FormResultData } from './form-result/form-result.component';


@NgModule({
  declarations: [AppComponent, SurveyFormComponent, FormQuestionsComponent, FormQuestionComponent, 
    DobDirective, LongPressDirective, DefineFormComponent, PopoverQuestionSelectorComponent, BarChartComponent, FormResultComponent],
  //entryComponents: [],
  imports: [CommonModule,BrowserModule, FormsModule,// TextMaskModule,
    IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }}) ],
  providers: [FormStorageService,
    TemplateFormService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
