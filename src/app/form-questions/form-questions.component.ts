import { Component, Input, OnInit } from '@angular/core';
import { CreateForm, QuestionCheckboxGroup, QuestionNumber, QuestionPhone, QuestionRadioGroup, QuestionText } from '../shared/create-form.class';
import { LanguageEnum } from '../shared/Language.enum';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.scss'],
   
})
export class FormQuestionsComponent implements OnInit {
  @Input('form') public form: CreateForm;
  @Input('isDisabled') public isDisabled: boolean;
  @Input('isEditable') public isEditable: boolean;

  isEditableForm(): boolean{
    return this.isEditable;
  }

  constructor() { 
  }

  ngOnInit() {
    if(this.form.language !== LanguageEnum.English && this.form.language !== LanguageEnum.Polski){
      this.form.language == LanguageEnum.Polski;
    }
  }

}
