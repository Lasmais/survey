import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IQuestion, QuestionCheckboxGroup, QuestionMail, QuestionNumber, QuestionPhone, QuestionRadioGroup, QuestionText } from '../shared/create-form.class';
import { TemplateGroup } from '../shared/template-group';
import { Template } from '../shared/template.class';
import { LanguageEnum } from '../shared/Language.enum';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss'],
})
export class FormResultComponent implements OnInit {

  @Input('templateGroup') public templateGroup: TemplateGroup;
  public formResults: Array<FormResultData> = new Array<FormResultData>();

  constructor(public modalController: ModalController) { 
    
  }

  ngOnInit() {
    this.formResults = new Array<FormResultData>();
    for (let form of this.templateGroup.forms) {
      for (let question of form.templateForm.questions) {
        let temp = this.formResults.find(r => r.questionText == question.questionText.displayText(LanguageEnum.Polski));
        if(temp == null){
          temp = new FormResultData(question);
          this.formResults.push(temp);
        }
        temp.addAnswer(question);
      }
    }
  }
  dismissModal(){
    this.modalController.dismiss();
  }
}

export class FormResultData {
  constructor(question: IQuestion){
    this.answers = new Array<string>();
    this.answersCount = new Array<number>();
    this.questionText = question.questionText.displayText(LanguageEnum.Polski);
    if(question instanceof QuestionPhone || question instanceof QuestionText || question instanceof QuestionMail){
      this.hasCustomAnswer = true;
    }
    else if(question instanceof QuestionCheckboxGroup) {
      for(let i = 0; i < question.checkboxes.length; i++){
        this.answers.push(question.checkboxes[i].answerText.displayText(LanguageEnum.Polski));
        this.answersCount.push(0);
      }
    }
    else if(question instanceof QuestionRadioGroup) {
      for(let i = 0; i < question.radiogroup.length; i++){
        this.answers.push(question.radiogroup[i].answerText.displayText(LanguageEnum.Polski));
        this.answersCount.push(0);
      }
    }

  }

  public addAnswer(question: IQuestion){
    if(question instanceof QuestionPhone || question instanceof QuestionNumber || question instanceof QuestionText || question instanceof QuestionMail){
      this.answers.push(question.answerText);
    }
    else if(question instanceof QuestionCheckboxGroup){
      for (let checkboxAnswer of question.checkboxes) {
        if(checkboxAnswer.isChecked){
          for(let i = 0; i < this.answers.length; i++){
            if(checkboxAnswer.answerText.displayText(LanguageEnum.Polski) == this.answers[i]){
              this.answersCount[i] += 1;
            }
          }
        }
      }
    }
    else if(question instanceof QuestionRadioGroup)
    {
      for(let i = 0; i < this.answers.length; i++){
        if(question.answerText == this.answers[i]){
          this.answersCount[i] += 1;
        }
      }
    }
  }

  hasCustomAnswer: boolean;
  questionText: string;
  questionId: number;
  answers: Array<string>;
  answersCount: Array<number>;
}

