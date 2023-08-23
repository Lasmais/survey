import { Component, Input, OnInit } from '@angular/core';
import { CreateForm, IQuestion, QuestionCheckboxGroup, QuestionNumber, QuestionPhone, QuestionRadioGroup, QuestionText } from '../shared/create-form.class';
import { LanguageEnum } from '../shared/Language.enum';
import { DisplayText } from '../shared/display-text';

@Component({
  selector: 'form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {
  @Input('question') public question: IQuestion;
  @Input('language') public language: LanguageEnum;
  @Input('isDisabled') public isDisabled: boolean;
  @Input('isEditable') public isEditable: boolean;
  protected questionNumber: QuestionNumber;
  protected questionText: QuestionText;
  protected questionPhone: QuestionPhone;
  protected questionCheckboxGroup: QuestionCheckboxGroup;
  protected questionRadioGroup: QuestionRadioGroup;

  constructor() { }

  ngOnInit() {
    this.questionText = null;
    this.questionPhone = null;
    this.questionCheckboxGroup = null;
    this.questionRadioGroup = null;
    this.questionNumber = null;

    if(this.question instanceof QuestionPhone){
      this.questionPhone = this.question as QuestionPhone;
    }    
    else if(this.question instanceof QuestionCheckboxGroup){
      this.questionCheckboxGroup = this.question as QuestionCheckboxGroup;
      for(let i = 0; i < this.questionCheckboxGroup.checkboxes.length; i++){
        var displayText = this.questionCheckboxGroup.checkboxes[i].answerText;
        this.questionCheckboxGroup.checkboxes[i].answerText =  new DisplayText(displayText.textPolish, displayText.textEnglish);
      }
    }    
    else if(this.question instanceof QuestionRadioGroup){
      this.questionRadioGroup = this.question as QuestionRadioGroup;
      for(let i = 0; i < this.questionRadioGroup.radiogroup.length; i++){
        var displayText = this.questionRadioGroup.radiogroup[i].answerText;
        this.questionRadioGroup.radiogroup[i].answerText =  new DisplayText(displayText.textPolish, displayText.textEnglish);
      }
    }
    else if(this.question instanceof QuestionText){
      this.questionText = this.question as QuestionText;
    }
    else if(this.question instanceof QuestionNumber){
      this.questionNumber = this.question as QuestionNumber;
    }
  }

  isText(obj): boolean{
    return obj instanceof QuestionText;
  }
  isNumberQuestion(obj): boolean{
    return obj instanceof QuestionNumber;
  }
  isPhone(obj): boolean{
    return obj instanceof QuestionPhone;
  }
  isCheckBox(obj): boolean{
    let result = obj instanceof QuestionCheckboxGroup;
    return result;
  }
  isRadioGroup(obj): boolean{
    let result = obj instanceof QuestionRadioGroup;
    return result;
  }
  isEditableForm(): boolean{
    return this.isEditable;
  }
}
